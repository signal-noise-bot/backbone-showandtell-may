define([
  'globals',
  'views/views.master',
  'modules/bar-graph/modules.bar-graph.index',
  'modules/curved-line-graph/modules.curved-line-graph.index',
  'modules/tab-bar/modules.tab-bar.index',
  'modules/selector/modules.selector.index',
  'modules/legend/modules.legend.index',
  'views/views.table',
  'modules/info/modules.info.index',
  'text!templates/section.html',
], function(Globals, Master, BarGraph, CurvedLineGraph, TabBar, Selector, Legend, TableView, Info, template) {

  return Master.extend({

    templates: {
      'main': template,
    },

    className: 'section',

    events: {},

    messages: {
      tick: {
        copy: 'The tick indicates that you answered yes to this question',
        icon: 'tick-icon.svg'
      }
    },

    visuals: {
      'bar-graph': BarGraph,
      'curved-line': CurvedLineGraph
    },

    controls: {
      'tabbar': {
        module: TabBar,
        selector: '.js-tab-bars',
        container: 'section-menu__item section-menu__item--stack'
      },
      'selector': {
        module: Selector,
        selector: '.js-selectors'
      },
      'legend': {
        module: Legend,
        selector: '.js-legends',
        container: 'section-menu__item'
      },
      'info': {
        module: Info,
        selector: '.js-info',
        container: 'section-menu__item'
      }
    },

    initialize: function(options) {

      this._super();

      this.options = options;
      this.data = options.data;
      this.section = this.data.slug;

      this.addEvents();

      return this;
    },

    render: function() {
      var self = this;
      
      this._super({...
      });

      ...
      
      this.renderGraphs();

      this.listenTo(Globals.Router, 'route', function(main, route) {
        
        var section = route[1];

        this.transitionGraphs(section);

      }, this);

      return this;
    },

    renderGraphs: function() {
      var type = this.data['graph-type'];
      var subSections = this.data['sub-sections'];
      var self = this;

      this.graphs = [];
      this.legendViews = [];

      if (!this.visuals[type]) return;

      var graph = new this.visuals[type]({
        data: this.data
      });

      this.graphs.push(graph);

      this.$visualContainer.html(graph.el);

      if (subSections) {...
      }

      this.addControls();
    },

    addEvents: function() {...
    },

    onResize: function(e) {...
    },

    updateGraphs: function() {...
    },

    addControls: function() {...
    },

    doExport: function(e){...
    },

    onControlChange: function(e) {...
    },

    transitionGraphs: function(section) {...
    },

    isShowControls: function() {...
    },

    remove: function() {...
    }

  });

});