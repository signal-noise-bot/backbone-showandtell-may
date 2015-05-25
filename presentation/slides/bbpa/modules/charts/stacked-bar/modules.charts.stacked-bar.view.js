define([
  './../../master/modules.master.view',
  'text!./modules.charts.stacked-bar.template.html',
], function(Master, template){

  return Master.extend({

    className: "stacked-bar vertical-align",

    templates: {
      "main": template
    },

    setDefaults: function(){

      this._super();

      this.defaults.name = "stacked-bar";
      this.defaults.path = "charts/stacked-bar";

      this.defaults.duration = 600;

    },

    update: function(data){

      this.$segments = this.$('.segment');

      // If enough segments do not exist, re-render
      if(data.length != this.$segments.length){
        this.render({ segments: data });
      }

      this.animateSegments(data);

    },

    animateSegments: function(data){

      var self = this;

      _.each(data, function(segment, i){

        var $segment = this.$(".segment").eq(i);
        var $span = $segment.find('span');

        $segment.velocity({ width: segment.percentage + "%" }, { duration: self.options.duration, display: "block" });

        $span.velocity("transition.fadeOut", {
          duration: this.options.duration/2,
          complete: function(){
            $span.html(segment.percentage >= 5 ? segment.percentage + "%" : "");
            // $span.html(segment.percentage + "%");
            $span.velocity("transition.fadeIn", { duration: self.options.duration/2 });
          }
        });

      }, this); 

    },

  });


});