define([
  'slides/bbpa/modules/charts/stacked-bar/modules.charts.stacked-bar.index',
  'slides/bbpa/modules/charts/donut/modules.charts.donut.index'
], function(StackedBar, Donut){

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
  var bars = {
    intro: new StackedBar(),
    standard: new StackedBar(),
    small: new StackedBar(),
    big: new StackedBar(),
    colors: new StackedBar()
  };

  $('.bbpa-stacked-bars-intro .module').append(bars.intro.el);
  $('.bbpa-stacked-bars-example .module').append(bars.standard.el);
  $('.bbpa-stacked-bars-customisability .module-small').append(bars.small.el);
  $('.bbpa-stacked-bars-customisability .module-big').append(bars.big.el);
  $('.bbpa-stacked-bars-customisability .module-colors').append(bars.colors.el);

  bars.intro.update(generateData(3, ["#1FB4BD", "#00A6A0", "#008386"]));

  $('.bbpa-stacked-bars-example').click(function(){

    var data = generateData(4, ["#1FB4BD", "#00A6A0", "#008386", "#008386"]);
    bars.standard.update(data);

    var html = JSON.stringify(data);
    html = html.replace("[", "");
    html = html.replace("]", "");

    $('.bbpa-stacked-bars-example .data').html(html);
    hljs.initHighlighting();

  });


  $('.bbpa-stacked-bars-customisability').click(function(){

    bars.small.update(generateData(2, ["#1FB4BD", "#00A6A0"]));
    bars.big.update(generateData(10, ["#1FB4BD","#1DABB3","#1CA2AA","#1A99A0","#189096","#16878C","#157D83","#137479","#116B6F","#0F6265","#0E595C","#0C5052"]));
    bars.colors.update(generateData(5, ["#AF4080", "#199AC6", "#C3C753", "#DEA354", "#DE9364"]));

  });

  // Donut example
  var donuts = {
    intro: new Donut({ radius: 67 }),
    small: new Donut({ radius: 120 })
  };

  $('.bbpa-donut-intro .module').append(donuts.intro.el);
  $('.bbpa-donut-helper-example-1 .module').append(donuts.small.el);

  donuts.intro.update(generateData(3, ["#079772", "#068464", "#006E60"]));
  donuts.small.update([{ percentage: 30, color: "#079772" }])

});


