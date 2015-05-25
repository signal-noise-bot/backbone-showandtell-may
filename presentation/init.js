require.config({
	paths: {
		"jquery": "lib/jquery/dist/jquery.min",
		"underscore": "lib/underscore/underscore-min",
		"backbone": "lib/backbone/backbone",
		"backbone-super": "lib/backbone-super/backbone-super/backbone-super-min",
    "text": "lib/requirejs-text/text",
    "velocity": "lib/velocity/velocity",
    "velocity-ui": "lib/velocity/velocity.ui.min",
		// "templates": "templates",
		// "views": "views",
		// "models": "models",
		// "data": "../data",
		// "modules": "../../modules",
	}
});

requirejs([
  // Libs
  'jquery',
  'underscore',
  'backbone',
  'backbone-super',
  'velocity',
  'velocity-ui',
], function($, _, Backbone){

  	
  	require(['slides/bbpa/bbpa'], function(){
  		console.log("Loaded BBPA");
  	});

});