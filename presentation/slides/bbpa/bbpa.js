define([
  'slides/bbpa/modules/charts/stacked-bar/modules.charts.stacked-bar.index'
], function(StackedBar){

  var generateData = function(bars, colors){

    var data = [];

    _.times(bars, function(i){
      data.push({ value: _.random(1, 30), color: colors[i] });
    });

    var total = _.reduce(data, function(total, item){
      return total + item.value;
    }, 0);

    var running = 0;

    _.each(data, function(item, i){

      item.percentage = Math.floor((item.value/total) * 100);

      running += item.percentage;

      if(i == data.length-1 && running < 100){
        item.percentage += 100 - running;
      }


    });

    return data;

  };

  // Stacked bar example
  var standard = new StackedBar();
  var small = new StackedBar();
  var big = new StackedBar();
  var colors = new StackedBar();

  $('.bbpa-stacked-bars-example .module').append(standard.el);
  $('.bbpa-stacked-bars-customisability .module-small').append(small.el);
  $('.bbpa-stacked-bars-customisability .module-big').append(big.el);
  $('.bbpa-stacked-bars-customisability .module-colors').append(colors.el);

  $('.bbpa-stacked-bars-example').click(function(){

    var data = generateData(4, ["#1FB4BD", "#00A6A0", "#008386", "#008386"]);
    standard.update(data);

    var html = JSON.stringify(data);
    html = html.replace("[", "");
    html = html.replace("]", "");

    $('.bbpa-stacked-bars-example .data').html(html);
    hljs.initHighlighting();

  });


  $('.bbpa-stacked-bars-customisability').click(function(){

    small.update(generateData(2, ["#1FB4BD", "#00A6A0"]));
    big.update(generateData(10, ["#1FB4BD","#1DABB3","#1CA2AA","#1A99A0","#189096","#16878C","#157D83","#137479","#116B6F","#0F6265","#0E595C","#0C5052"]));
    colors.update(generateData(5, ["#AF4080", "#199AC6", "#C3C753", "#DEA354", "#DE9364"]));

  });

});