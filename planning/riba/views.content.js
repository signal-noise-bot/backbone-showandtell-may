define([
  'globals',
  'views/views.master',
  'views/views.header',
  'views/views.section',
  'text!templates/content.html'
], function(Globals, Master, Header, Section, template) {

  return Master.extend({

    isAnimating: false,

    templates: {...
    },

    initialize: function(options) {...
    },

    addEvents: function() {...
    },

    render: function() {...
    },

    renderHeader: function() {...
    },

    renderSections: function() {

      _.each(this.sectionsData, function(data) {

        var section = new Section({
          data: data,
          page: this.page
        });

        this.$sections.append(section.el);

        section.render();
      }, this);
    },

    handleScroll: function(e) {...
    },

    toggleHeader: function(e) {...
    },

    scrollRoute: function() {...
    },

    getOffsets: function() {...
    },

    scrollTo: function(main, route) {...
    },

    remove: function() {...
    }

  });

});