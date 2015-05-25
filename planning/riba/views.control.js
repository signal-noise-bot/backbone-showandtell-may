define([
  'globals',
  'views/views.master',
  'modules/toggle/modules.toggle.index',
  'modules/dropdown/modules.dropdown.index',
  'modules/slider/modules.slider.index',
  'modules/info/modules.info.index',
  'text!templates/control.html',
], function(Globals, Master, Toggle, Dropdown, Slider, Info, template){

  return Master.extend({

    templates: {
      'main' : template,
    },

    modules: {
      "toggle": Toggle,
      "dropdown": Dropdown,
      "slider": Slider,
      "info": Info
    },

    initialize: function() {...
    },

    render: function(){

      this._super({
        model: this.model
      });

      this.$label = this.$('.js-label');
      this.$control = this.$('.js-control');
      this.$cover = this.$('.js-cover');

      this.addControl();      
      this.addEvents();

      this.update();

      return this;
    },

    update: function() {
      var disabled = this.model.get('disabled');
      var hidden = this.model.get('hidden');
      var invalid = this.model.get('invalid');

      this.$cover.toggleClass('js-hidden', !disabled);

      this.$el.toggleClass('js-disabled', disabled);
      this.$el.toggleClass('js-hidden', hidden);
      this.$el.toggleClass('js-invalid', invalid);
    },

    addControl: function() {

      var type = this.model.get('type');

      if (this.modules[type] == undefined) return;

      var view = new this.modules[type]({model: this.model});

      this.$control.append(view.el);

    },

    addEvents: function() {
      this.listenTo(this.model, 'change', this.onModelChange, this);
    },

    onModelChange: function(model) {
      this.update(model);
    },

    remove: function() {
      this._super();

      return this;
    }

  });
});