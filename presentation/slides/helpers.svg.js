define(function(){

  return {

    // Get x and y coordinates for point along a circle
    pointOnCircumfrence: function(options) {

      var radians = (options.angle/180) * Math.PI;

      if(options.offsetAngle){
        radians -= (options.offsetAngle/180) * Math.PI;
      }

      var x = options.cx + Math.cos(radians) * options.radius;
      var y = options.cy + Math.sin(radians) * options.radius;

      return { x: x, y: y };

    },

    // Creates SVG arc string
    createArcPath: function(options){

      _.defaults(options, {
        xAxisRotation: 0, // Pointless?!
        largeArcFlag: 0, // More than 180 degrees set to true
        sweepFlag: 1, // 1 - Clockwise, 0 - Anticlockwise
        absolute: true, 
      });

      // Start arc path
      var arc = options.absolute ? "A" : "a";

      // Set radiuds as rx and ry
      arc += options.radius + "," + options.radius + " ";

      // Set options
      arc += options.xAxisRotation + " " + options.largeArcFlag + "," + options.sweepFlag + " ";

      // Set destination of arc
      arc += options.x + "," + options.y + " ";

      return arc;

    },

    createSegment: function(options){

      // Get total angle of segment
      var totalAngle = options.endAngle - options.startAngle;

      // Calculate large arc flag option based on total angle
      var largeArcFlag = +(totalAngle > 180);

      if(totalAngle >= 360){
        // If total angle of segment is 360 degrees or more, dont drag caps/close path to fix visual errors
        var drawCaps = false;
        // Also clamp value to a total of 360
        options.endAngle -= (totalAngle - 360);
        // Minus 0.001 (to display correctly as SVG wont draw 360 degree arcs)
        options.endAngle -= 0.0001;
      } else {
        var drawCaps = true;
      }

      // If a stroke width is passed, modify values to make segment full width after stroke
      if(options.strokeWidth){
        options.radius -= options.strokeWidth/2;
        options.width += options.strokeWidth;
      }

      // Calculate start points
      var start = {
        inner: this.pointOnCircumfrence({ cx: options.cx, cy: options.cy, radius: options.radius - options.width, angle: options.startAngle }),
        outer: this.pointOnCircumfrence({ cx: options.cx, cy: options.cy, radius: options.radius, angle: options.startAngle })
      };

      // Calculate end points
      var end = {
        inner: this.pointOnCircumfrence({ cx: options.cx, cy: options.cy, radius: options.radius - options.width, angle: options.endAngle }),
        outer: this.pointOnCircumfrence({ cx: options.cx, cy: options.cy, radius: options.radius, angle: options.endAngle })
      };

      // Calculate arcs
      var arc = {
        inner: this.createArcPath({ x: start.inner.x, y: start.inner.y, radius: options.radius - options.width, sweepFlag: 0, largeArcFlag: largeArcFlag }),
        outer: this.createArcPath({ x: end.outer.x, y: end.outer.y, radius: options.radius, largeArcFlag: largeArcFlag })
      };

      // Move to start of path
      var path = "M" + start.inner.x + "," + start.inner.y + " ";

      // Draw start cap line (if drawing caps)
      path += (drawCaps ? "L" : "M") + start.outer.x + "," + start.outer.y + " ";

      // Create outer curve
      path += arc.outer + " ";

      // Draw end cap line (if drawing caps)
      path += (drawCaps ? "L" : "M") + end.inner.x + "," + end.inner.y + " ";

      // Create inner curve
      path += arc.inner + " z";

      return path;

    }

  };

});