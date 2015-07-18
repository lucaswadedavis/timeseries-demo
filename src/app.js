(function(){

  var cleanData = function(data){
    return  _.filter(data,function(obj){
      return obj.date && obj['car.count'] !== undefined && obj.weather && obj['day.of.week'];
    });
  };


  var extractPropertyByDay = function(data,day, prop){
    return [day].concat([_.reduce(data,function(m,n){
      return n['day.of.week']===day ? m+(parseFloat(n[prop]) || 0) : m;
    }, 0)] );
  };

  var app = {};

  app.displayChart = function(data){
    var chart = c3.generate({
      bindto: "#timeseries-chart",
        subchart:{show:true},
        data: {
          x: 'x',
        columns: [
      ['x'].concat(_.pluck(data,'date') ),
        ['weather'].concat(_.pluck(data,'weather') ),
        ['car.count'].concat(_.pluck(data,'car.count') )
      ],
        axes:{
          weather:"y",
        'car.count':"y2"
        }
        },
        axis: {
          x: {
            type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
          },
          y:{label:"weather"},
          y2:{show:true, label:"car count"}
        }
    });


  };

  app.displayDonut = function(data){


    var chart = c3.generate({
      bindto:"#dayofweek-donut-chart",
        data:{
          columns:_.map(["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],function(day){
            return extractPropertyByDay(data,day,"car.count");
          }),
          type:"donut"
        },
        donut:{
          title:"cars per day"
        }
    });
  };


  app.init = function(){

    var url = "./src/data.csv";
    var opts = {
      download:true,
      header:true,
      complete:function(results,file){
        console.log(results);
        app.data = cleanData(results.data);
        app.displayChart(app.data);
        app.displayDonut(app.data);
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
