define([
  './../../master/modules.master.view',
  'text!./modules.charts.donut.template.html',
  'svg',
  'slides/helpers.svg'
], function(Master, template, SVG, SVGHelpers){

  return Master.extend({

    className: "donut",

    templates: {
      "main": template
    },

    setDefaults: function(){

      this._super();

      _.extend(this.defaults, {
        name: "donut",
        path: "charts/donut",
        radius: 60,
        shadow: {x: 0, y: 4}, // Position of shadow relative to donut
        spacing: 2,
        width: 16,
        duration: 600,
        segmentColor: "#098C67",
        strokeWidth: 0
      });

    },

    initialize: function(options){

      this._super(options);

      this.render();

    }, 

    update: function(data){

      this.updateSegments(data);

    },

    render: function(){

      var width = this.options.radius * 2 + this.options.shadow.x,
      height = this.options.radius * 2 + this.options.shadow.y;

      this.svg = SVG(this.el).size(width, height);

      this.groups = {
        shadows: this.svg.group().translate(this.options.shadow.x, this.options.shadow.y),
        segments: this.svg.group()
      };

      this.segments = [];

    },

    createSegment: function(data){

      // Empty path
      var path = SVGHelpers.createSegment({
        cx: this.options.radius,
        cy: this.options.radius,
        radius: this.options.radius,
        width: this.options.width,
        startAngle: 0,
        endAngle: 0
      });

      // Create segment and fill with color if provided or default
      var segment = this.svg.path(path).attr({ fill: data.color || this.options.segment });

      if(data.stroke){
        segment.attr({ 
          stroke: data.stroke,
          'stroke-width': this.options.strokeWidth
        });
      }

      // Clone segment for shadow
      var shadow = segment.clone();
      shadow.attr({ fill: "#000", "fill-opacity": 0.15 });

      // Add paths to groups
      this.groups.segments.add(segment);
      this.groups.shadows.add(shadow);

      // Return object to be added to segments array
      return { 
        segment: segment,
        shadow: shadow,
        start: 0, 
        end: 0 
      };

    },

    updateSegments: function(data){

      var self = this;

      var currentAngle = 0;

      _.each(data, function(item, i){

        // If segment doesnt exist for this set of data, create a segment
        if(!this.segments[i]) this.segments[i] = this.createSegment(item);

        var segment = this.segments[i];

        var angles = {};

        // Size of segment
        var segmentAngle = 360 * (item.percentage/100);

        if(segmentAngle == 360) this.options.spacing = 0;

        // Start and emd angle differences between new position and current position
        var offsetAngle = {
          start: currentAngle - segment.start,
          end: (currentAngle + segmentAngle) - segment.end
        };

        console.log("this", this);

        // Animate to new angles
        $({alpha: 0}).animate({alpha: 1}, {
          duration: 600,
          easing: "swing",
          step: function(alpha){

            // Interpolate values between current and new angle
            angles.start = segment.start + (offsetAngle.start * alpha);
            angles.end = segment.end + (offsetAngle.end * alpha);

            // Generate a new path string with interpolated angles
            var path = SVGHelpers.createSegment({
              cx: self.options.radius,
              cy: self.options.radius,
              radius: self.options.radius,
              width: self.options.width,
              startAngle: angles.start,
              endAngle: angles.end - self.options.spacing,
              strokeWidth: self.options.strokeWidth
            });

            // Update paths
            self.segments[i].segment.plot(path);
            self.segments[i].shadow.plot(path);
            
          },
          complete: function(){

            // Update segments current position (start/end) to be the new position
            _.extend(segment, angles);

          }
        });

        currentAngle += segmentAngle;

      }, this);

    },

  });


});