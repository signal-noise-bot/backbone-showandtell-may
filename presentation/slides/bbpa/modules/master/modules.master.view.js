define([
  'backbone',
], function(Backbone){

  return Backbone.View.extend({

    activeTemplate : 'main',

    setDefaults: function(){

     this.defaults = {
        style: "default",
        name: "master",
        path: "master"
      };

    },

    initialize: function(options){

      this.setDefaults();

      this.options = _.extend(this.defaults, options);

      this.addStyle();

      this._super();

      this._defaults();

    },

    render: function(options){

      options = _.extend({}, options);

      if(this.templates && this.templates[this.activeTemplate]){
        this.$el.html(this.templates[this.activeTemplate]({ data: options}));
      }

      return this;

    },

    addStyle: function(){

      var path = "slides/bbpa/modules/" + this.options.path + "/styles/" + this.options.style + "/css/";
      path += "modules." + this.options.path.replace('/', '.') + "." + this.options.style + ".css";

      var existingLink = $('head link[href="' + path + '"]');
      if(existingLink.length) return;

      var link = document.createElement('link');
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = path;

      $('head').append(link);

    },

    _defaults: function(){

      this._extendHelper('templates');
      this._extendHelper('events');
      this._cacheTemplates();

      this.delegateEvents();

    },


    _extendHelper: function(item){

      var proto = this, result = {};

      do {
        result = _.extend({}, proto[item], result);
        proto = proto.constructor.__super__;
      } while (proto[item]);

      if(result) this[item] = _.extend({}, result, this[item]);

    },

    _cacheTemplates: function(){

      if(!this.templates || _.isEmpty(this.templates)) return;

      for (var template in this.templates){
        if(_.isString(this.templates[template])){
          this.templates[template] = _.template(this.templates[template]);
        }
      }

    },

    _applyMobileEvents: function(){

      var self = this, events = {};

      _.each(this.events, function(value, key){

        var newKey = key.replace('click', 'tap')
        .replace('mousedown', 'tapstart')
        .replace('mouseup', 'tapend');

        events[newKey] = value;

      });

      this.events = events;

    },

  });

});

