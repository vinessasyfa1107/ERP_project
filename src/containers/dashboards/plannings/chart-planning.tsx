import { Component, createEffect, createSignal, onMount } from 'solid-js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { dataplanning } from '../../../api/planning/dataplanning';

const ChartPlanning: Component = () => {

  const [RowData, setRowData] = createSignal([{"date":"2012-08-09"}]);

  onMount(async () => {
    const peng = await dataplanning("hallo");
    console.log("peng", peng);
    setRowData(peng);
  })
       
    createEffect(()=> {
        setTimeout(() => {
          chartxy()
        }, 500);
      })

    const chartxy = () => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("planchart", am4charts.XYChart);

      chart.logo.disabled = true;

      let data1 = RowData();

      
      // let dataa = 
      let data = [ {
        "date": "2012-07-27",
        "value": 13
        }, {
        "date": "2012-07-28",
        "value": 11
        },  {
        "date": "2012-08-07",
        "value": 18
        }, {
        "date": "2012-08-08",
        "value": 21
        }, {
        "date": "2012-08-09",
        "value": 26
        }, {
        "date": "2012-08-10",
        "value": 24
        }, {
        "date": "2012-08-11",
        "value": 29
        }, {
        "date": "2012-08-12",
        "value": 32
        }, {
        "date": "2012-08-13",
        "value": 18
        }, {
        "date": "2012-08-14",
        "value": 24
        }, {
        "date": "2012-08-15",
        "value": 22
        }, {
        "date": "2012-08-16",
        "value": 18
        }, {
        "date": "2012-08-17",
        "value": 19
        }, {
        "date": "2012-08-18",
        "value": 14
        }, {
        "date": "2012-08-19",
        "value": 15
        }, {
        "date": "2012-08-20",
        "value": 12
        }, {
        "date": "2012-08-21",
        "value": 8
        }, {
        "date": "2012-08-22",
        "value": 9
        }, {
        "date": "2012-08-23",
        "value": 8
        }, {
        "date": "2012-08-24",
        "value": 7
        }, {
        "date": "2012-08-25",
        "value": 5
        }, {
        "date": "2012-08-26",
        "value": 11
        }, {
        "date": "2012-09-12",
        "value": 29
        }, {
        "date": "2012-09-13",
        "value": 34
        }, {
        "date": "2012-09-14",
        "value": 37
        }, {
        "date": "2012-09-15",
        "value": 42
        }, {
        "date": "2012-09-16",
        "value": 49
        }, {
        "date": "2012-09-17",
        "value": 46
        }, {
        "date": "2012-09-18",
        "value": 47
        }, {
        "date": "2012-09-19",
        "value": 55
        }, {
        "date": "2012-09-20",
        "value": 59
        }, {
        "date": "2012-09-21",
        "value": 58
        }, {
        "date": "2012-09-22",
        "value": 57
        }, {
        "date": "2012-09-23",
        "value": 61
        }, {
        "date": "2012-09-24",
        "value": 59
        },  {
        "date": "2012-10-29",
        "value": 72
        }, {
        "date": "2012-10-30",
        "value": 70
        }, {
        "date": "2012-10-31",
        "value": 72
        }, {
        "date": "2012-11-01",
        "value": 73
        },  {
        "date": "2012-11-07",
        "value": 74
        }, {
        "date": "2012-11-08",
        "value": 71
        }, {
        "date": "2012-11-09",
        "value": 76
        }, {
        "date": "2012-11-10",
        "value": 77
        }, {
        "date": "2012-11-11",
        "value": 81
        },  {
        "date": "2013-01-14",
        "value": 70
        }, {
        "date": "2013-01-15",
        "value": 73
        }, {
        "date": "2013-01-16",
        "value": 71
        }, {
        "date": "2013-01-17",
        "value": 74
        }, {
        "date": "2013-01-18",
        "value": 78
        }, {
        "date": "2013-01-19",
        "value": 85
        }, {
        "date": "2013-01-20",
        "value": 82
        }, {
        "date": "2013-01-21",
        "value": 83
        }, {
        "date": "2013-01-22",
        "value": 88
        }, {
        "date": "2013-01-23",
        "value": 85
        }, {
        "date": "2013-01-27",
        "value": 84
        }, {
        "date": "2013-01-28",
        "value": 83
        }, {
        "date": "2013-01-29",
        "value": 84
        }, {
        "date": "2013-01-30",
        "value": 81
        } ];
        
      // chart.data = data;

      chart.data = data1;

          // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minGridDistance = 30;

      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "date";
      series.stroke = am4core.color("#5327AE");
      series.strokeWidth = 2;
      series.fill = am4core.color("#5327AE");
      series.fillOpacity = 1;

      chart.legend = new am4charts.Legend();
      let markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 25;
      markerTemplate.height = 3;
      chart.legend.labels.template.text = "Permintaan";

      // Warna fill

      dateAxis.dateFormats.setKey("day", "dd/M/yy");
      dateAxis.dateFormats.setKey("week", "dd/M/yy");
      dateAxis.dateFormats.setKey("month", "dd/M/yy");
      dateAxis.dateFormats.setKey("year", "dd/M/yy");

      let fillModifier = new am4core.LinearGradientModifier();
      fillModifier.opacities = [1, 0];
      fillModifier.offsets = [0, 1];
      fillModifier.gradient.rotation = 90;
      series.segments.template.fillModifier = fillModifier;
      
      chart.cursor = new am4charts.XYCursor();
      // chart.cursor.behavior = "panXY"; 
      // chart.mouseWheelBehavior = "zoomXY";
      // dateAxis.maxZoomFactor = 10; 
    }

    return (
        <div>
          <div>
            <div id="planchart" style={{width: '85vh', height:'45vh'}}></div>
          </div>
        </div>
    )
}

export default ChartPlanning;