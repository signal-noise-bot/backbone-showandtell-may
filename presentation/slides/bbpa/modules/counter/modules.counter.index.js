define([
  './../master/modules.master.index',
  './modules.counter.view'
], function(Master, View){

  return Master.extend({

    view: View

  });

});

