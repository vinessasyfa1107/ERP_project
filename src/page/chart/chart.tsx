import { createEffect, createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

function ColumnChart() {

  const [PieChart, setPieChart] = createSignal<am4charts.PieChart | null>(null);

  createEffect(() => {
    let newChart: am4charts.PieChart;
    if (PieChart() === null) {
      newChart = am4core.create('pie-chart-container', am4charts.PieChart);
      setPieChart(newChart);
    } else {
      newChart = PieChart()!;
    }

    newChart.data = [
      { category: 'Category 1', value: 10 },
      { category: 'Category 2', value: 20 },
      { category: 'Category 3', value: 15 },
      { category: 'Category 4', value: 25 },
      { category: 'Category 5', value: 12 }
    ];

    const series = newChart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'value';
    series.dataFields.category = 'category';

    return () => {
      newChart.dispose();
      setPieChart(null);
    };
  });

  const [chart, setChart] = createSignal<am4charts.XYChart | null>(null);

  createEffect(() => {
    let newChart: am4charts.XYChart;
    if (chart() === null) {
      newChart = am4core.create('column-chart-container', am4charts.XYChart);
      setChart(newChart);
    } else {
      newChart = chart()!;
    }

    newChart.data = [
      { category: 'Category 1', value: 10 },
      { category: 'Category 2', value: 20 },
      { category: 'Category 3', value: 15 },
      { category: 'Category 4', value: 25 },
      { category: 'Category 5', value: 12 }
    ];

    const categoryAxis = newChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    newChart.logo.disabled = true;

    const valueAxis = newChart.yAxes.push(new am4charts.ValueAxis());

    const series = newChart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = 'category';
    series.dataFields.valueY = 'value';
    series.columns.template.tooltipText = '{valueY.value}';

    return () => {
      newChart.dispose();
      setChart(null);
    };
  });

  return (
    <div>
      <div id="column-chart-container" style="width: 600px; height: 400px;"></div>
      <div id="pie-chart-container" style="width: 600px; height: 400px; margin-left: 40vh;"></div>
    </div>
  );
}

export {
  ColumnChart
}
