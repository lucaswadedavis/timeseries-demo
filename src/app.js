(function(){

  var cleanData = function(data){
    return  _.filter(data,function(obj){
      return obj.date && obj['car.count'] !== undefined && obj.weather && obj['day.of.week'];
    });
  };

  var app = {};

  app.displayChart = function(data){
    var data = cleanData(data);
    var chart = c3.generate({
      bindto: "#timeseries-chart",
        data: {
          x: 'x',
        //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
        ['x'].concat(_.pluck(data,'date') ),
        ['weather'].concat(_.pluck(data,'weather') )
        //['data1', 30, 200, 100, 400, 150, 250],

        //['data2', 130, 340, 200, 500, 250, 350]
      ]
        },
        axis: {
          x: {
            type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
          }
        }
    });

    setTimeout(function () {
      chart.load({
        columns: [
        ['data3', 400, 500, 450, 700, 600, 500]
        ]
      });
    }, 1000);
  };


  app.init = function(){

    var url = "./src/data.csv";
    var opts = {
      download:true,
      header:true,
      complete:function(results,file){
        console.log(results);
        app.displayChart(results.data);
      },
      error:function(err,file){
        console.log(err);
      }
    };

    Papa.parse(url,opts);
  };

  window.app = app;

})();

$(document).ready(function(){ app.init() });
