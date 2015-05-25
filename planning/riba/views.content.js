define([
  'globals',
  'views/views.master',
  'views/views.header',
  'views/views.section',
  'text!templates/content.html'
], function(Globals, Master, Header, Section, template) {

  return Master.extend({

    isAnimating: false,

    templates: {
      'main': template
    },

    events: {},

    initialize: function(options) {
      this._super();
      this.page = Globals.Router.page;
      this.section = Globals.Router.section;

      this.options = options;

      this.addEvents();

      return this;
    },

    addEvents: function() {
      this.listenTo(Globals.Router, 'route', this.scrollTo);
      this.listenTo(Globals.Controls, 'change', this.onControlsChange, this);
    },

    render: function() {

      var self = this;

      this.options.allData = Globals.Questions.All.findWhere({
        "slug": this.options.page
      });

      this._super();

      _.bindAll(this, "handleScroll");

      this.$sections = this.$el.find(".sections");
      this.sectionsDataAll = this.options.allData.get("sections");
      // this.sectionsDataYours = this.options.yourData.get("sections");

      this.renderHeader();
      this.renderSections();

      this.$section = this.$sections.children(".section");

      // Fire scroll event constantly...
      this.$sections.on("scroll",
        _.debounce(function(e) {
          self.scrolling = true;
          self.handleScroll(e);
        }, 1, {
          'leading': true,
          'trailing': false
        })
      );

      // Set scrolling to false when scrolling has stopped...
      this.$sections.on("scroll",
        _.debounce(function() {
          self.scrolling = false;
        }, 150)
      );

      setTimeout(function() {
        self.getOffsets();
      }, 100);
    },

    renderHeader: function() {
      this.header = new Header({
        title: this.options.allData.get("title")
      });

      this.$el.prepend(this.header.el);
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

    handleScroll: function(e) {
      this.scrolling = true;
      this.toggleHeader(e);
      this.scrollRoute();
    },

    toggleHeader: function(e) {
      if (e.currentTarget.scrollTop > 0 && !this.scrolled) {
        this.$el.addClass("scrolled");
        this.scrolled = true;
      } else if (e.currentTarget.scrollTop === 0) {
        this.$el.removeClass("scrolled");
        this.scrolled = false;
      }
    },

    scrollRoute: function() {


      var scrollHeight = this.$sections[0].scrollHeight - this.$sections.height();
      var percent = this.$sections.scrollTop() / scrollHeight;
      var trigger = percent * this.$sections[0].scrollHeight;

      _.each(this.offsets, function(offset, i) {
        var topPadding = (i == 0) ? 100 : 0;
        var bottomPadding = (i == this.offsets.length - 1) ? 100 : 0;

        if (trigger > (offset.top - topPadding) && trigger < (offset.bottom + bottomPadding)) {
          newSection = this.sectionsDataAll[i].slug;

          if (newSection == this.section || this.isAnimating) return;

          Globals.Router.navigate(this.page + "/" + newSection);
          this.section = newSection;
        }
      }, this);
    },

    getOffsets: function() {
      var sectionOffsets = [];
      this.sectionsHeight = this.$sections.height();

      _.each(this.$section, function(section, i) {
        sectionOffsets[i] = {};
        sectionOffsets[i].top = section.offsetTop;
        sectionOffsets[i].bottom = section.offsetTop + $(section).height();
        sectionOffsets[i].middle = sectionOffsets[i].bottom - ($(section).height() / 2);
      });

      this.offsets = sectionOffsets;

      // Transition all if the content is smaller than the viewport
      if (_.last(this.offsets).bottom < this.sectionsHeight) {
        _.each(this.sections, function(section, slug) {
          section.transitionGraphs(slug);
        }, this)
      }
    },

    scrollTo: function(main, route) {
      var $section = $(".group-" + route[1]);

      var scrollHeight = this.$sections[0].scrollHeight;
      var percent = $section ? ($section.offset().top + this.$sections.scrollTop()) / scrollHeight : 0;

      var complete = function() {
        this.isAnimating = false;
      };

      if (this.scrolling) return;

      this.isAnimating = true;

      if ($section.index() == 0) {
        this.$sections.animate({
          scrollTop: 0
        }, {
          complete: _.bind(complete, this)
        });
      } else {
        this.$sections.animate({
          scrollTop: percent * (this.$sections[0].scrollHeight - this.$sections.height())
        }, {
          duration: 300,
          complete: _.bind(complete, this)
        });
      }
    },

    remove: function() {
      this._super();

      this.$sections.off('scroll');
      this.stopListening();

      return this;
    }

  });

});