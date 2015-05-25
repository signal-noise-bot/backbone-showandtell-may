define([
  'globals',
  'views/views.sidebar',
  'views/views.control',
  'views/views.alert',
  'text!templates/sidebar.controls.html',
], function(Globals, Master, Control, Alert, template){

  return Master.extend({

    className: 'sidebar',
    classModifier: 'controls',

    templates: {
      'main' : template,
    },

    events: {...
    },

    initialize: function(){...
    },

    render: function(){...
    },

    addEvents: function() {...
    },

    onControlChange: function() {...
    },

    onControlInvalid: function(model) {...
    },

    onBackClick: function() {...
    },

    createControls: function(){

      Globals.Controls.each(function (model){

        var key = model.get('key');

        var control = new Control({
          el: "[data-control='" + key + "']",
          model: model
        });
        
      }, this);

    },

    toggleToggles: function(e){;

      // Only one toggle can be on at a time. If all are off, turn the first one on
      var $ct = $(e.currentTarget);

      if ( e.currentTarget.checked ){
        this.$toggles.not($ct).removeAttr("checked").trigger('change');
      } else {
        this.$toggles.eq(0).prop("checked", true).trigger('change');
      }
    },

    showValidationError: function(message) {
      this.alert.show({
        message: message
      });
    },

    hideValidationError: function() {...
    }

  });
});