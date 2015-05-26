define([
  'backbone',
  './modules.master.view'
  ], function(Backbone, View){

    var module = function(){
      _.extend(this, Backbone.Events);
      this.initialize.apply(this, arguments);
    };

    module.extend = Backbone.View.extend;

    return module.extend({
      
      view: View,

      initialize: function(options){

        console.log("options", options);

        this._view = new this.view(options);

        this.listenTo(this._view, "all", this.trigger);

        this.el = this._view.el;
        this.$el = this._view.$el;

        return this;

      },

      render: function(data){

        this._view.render(data);

      },

      update: function(data){

        this._view.update(data);

      },

      remove: function(){

        this._view.remove();

      },

    });

});