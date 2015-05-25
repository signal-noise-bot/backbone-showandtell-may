define([
  './../master/modules.master.view',
  'text!./modules.counter.template.html',
], function(Master, template){

  return Master.extend({

    className: "counter",

    templates: {
      digit: template
    },

    setDefaults: function(){

      this._super();

      _.extend(this.defaults, { 
        name: 'counter',
        path: 'counter',
        height: 50,
        digitWidth: 23,
        items: [",", ".", "£", "k", "m", "b", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        seperatorItems: [".", ","],
        symbols: ["k", "m", "b"]
      });

    },

    initialize: function(options){

      this._super(options);

      this.$el.css({
        "height": options.height + "px", 
        "line-height": options.height + "px",
        "font-size": options.height + "px"
      });

    },

    updateDigits: function(digits){

      var $digits = this.$('.digit');
      var width = $digits.width();
      var difference = digits.length - $digits.length;

      // _.each(digits, function(digit, i){

      //   var seperator = _.indexOf(this.options.seperatorItems, digit) != -1;
      //   var index = ($digits.length - 1) - i;
      //   var width = seperator ? this.options.digitWidth/2 : this.options.digitWidth;

      //   $($digits[index]).velocity({ width: width }, 400);

      // }, this);

      if(difference > 0){

        var newDigits = digits.slice(digits.length - difference);

        _.each(newDigits, function(digit){

          var seperator = _.indexOf(this.options.seperatorItems, digit) != -1;
          var width = seperator ? this.options.digitWidth/2 : this.options.digitWidth;

          if(_.indexOf(this.options.symbols, digit) != -1){
            width += this.options.digitWidth/3;
          }

          // Initial attributes to apply to widget
          var attrs = {
            top: -this.options.height * (this.options.items.length),
            value: digit,
            width: width,
            items: this.options.items
          };

          // Animation attributes to be applied to digit
          var animation = { opacity: [1, 0] };

          if(width){
            attrs.width = 0;
            animation.width = [width, 0];
          }

          this.$el.prepend(this.templates.digit(attrs));

          // Select digit and apply default css style
          this.$('.digit:first-child').velocity(animation, 400);

        }, this);

      } else if(difference < 0){

        // Animation attributes to be applied to digits
        var animation = {opacity: [0, 1], width: 0};

        // Slice digits to be removed from digits array
        var $extraDigits = $digits.slice(0, Math.abs(difference));

        // Animate digits and remove on 'complete'
        $extraDigits.velocity(animation, {
          duration: 400,
          complete: function(){
            $extraDigits.remove();
          }
        });

      }

    },

    spinDigits: function(values){

      _.each(values, function(value, i){

        var index = _.indexOf(this.options.items, value);

        if(index == -1) value = -this.options.height * this.options.items.length;

        var $digit = this.$('.digit').eq(-(i+1));

        var seperator = _.indexOf(this.options.seperatorItems, value) != -1;
        var width = seperator ? this.options.digitWidth/2 : this.options.digitWidth;

        if(_.indexOf(this.options.symbols, value) != -1){
          width += this.options.digitWidth/3;
        }

        var animation = {
          top: -index * this.options.height,
          width: width
        };

        $digit.velocity(animation, {
          duration: 1000,
          delay: 75 * (values.length - i),
          easing: "easeInOutQuart",
          queue: false
        });

      }, this);

    },

    update: function(value){

      if(this.value == value) return;

      this.value = value;

      var string = value.toString();
      string = string.split('');

      // Reverse as numbers are added/animated backwards
      string.reverse();

      this.updateDigits(string);

      this.spinDigits(string);

    }

  });

});
