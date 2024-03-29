define([
  'globals',
  'views/views.sidebar',
  'text!templates/sidebar.navigation.html',
], function(Globals, Master, template){

  return Master.extend({

    instant: true,

    className: 'sidebar',
    classModifier: 'navigation',

    templates: {
      'main' : template,
    },

    events: {...
    },

    initialize: function() {...
    },

    addEvents: function() {

      this.listenTo(Globals.Router, 'route', this.onRouteChange, this);

    },

    render: function() {

      // Pass all data to the template
      this._super({
        pages: Globals.Questions.All.getPages()
      });

      return this;
    },

    onToggleCompare: function(bool) {
      this.$('.js-compare-results').toggleClass('js-active', bool);
    },

    onCompareClick: function() {...
    },

    onCloseClick: function(e) {...
    },

    onDownloadClick: function(e) {...
    },

    downloadPracticeReport: function(e){...
    },

    onRouteChange: function(e, fragments) {
      var $parent = this.$('.js-parent-' + fragments[0]);
      var $child = this.$('.js-child-' + fragments[1]);
      var $children = $parent.next('.js-children');

      this.$items.removeClass('js-active');

      $parent.addClass('js-active');
      $child.addClass('js-active');

      this.slideUp();

      if (this.instant)
        $children.show();
      else
        $children.slideDown('fast');
        
      this.instant = false;
    },

    slideUp: function() {...
    }

  });

});