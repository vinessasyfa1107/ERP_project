import { createEffect, createSignal } from "solid-js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const ChartAccounting = () => {
  const [chart, setChart] = createSignal<am4charts.XYChart | null>(null);

  let hasInitialized = false;

  createEffect(() => {
    if (!hasInitialized) {
      hasInitialized = true;
    } else {
      console.log("[ERROR] Dashboard.tsx - call to createeffect blocked, because has been initialized");
      return;
    }

    let newChart: am4charts.XYChart;
    if (chart() === null) {
      newChart = am4core.create('Statistic-chart', am4charts.XYChart);
      setChart(newChart);
    } else {
      newChart = chart()!;
    }

    newChart.data = [
      { period: "Jan", value: 10 },
      { period: "Feb", value: 20 },
      { period: "Mar", value: 15 },
      { period: "Apr", value: 25 },
      { period: "May", value: 12 },
      { period: "Jun", value: 12 },
    ];

    const categoryAxis = newChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "period";
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.fill = am4core.color("black"); // Warna teks period

    const valueAxis = newChart.yAxes.push(new am4charts.ValueAxis());
    // Jangan invers nilai sumbu Y
    valueAxis.renderer.labels.template.fill = am4core.color("black"); // Warna teks value

    const addSeries = () => {
      const series = newChart.series.push(new am4charts.LineSeries());
      series.dataFields.categoryX = "period";
      series.dataFields.valueY = "value";
      series.tooltipText = "{categoryX} {valueY.value}";
      series.strokeWidth = 2;
      series.tensionX = 0.8;
      series.stroke = am4core.color("red");
      series.fill = am4core.color("red");

      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color("orange");
      bullet.circle.radius = 4; // Ukuran titik
    };

    addSeries();

    newChart.logo.disabled = true;

    return () => {
      newChart.dispose();
      setChart(null);
    };
  });

  return (
    <div>
      <div id="Statistic-chart" style="width: 75vw; height: 45vh;margin-top: 0vw;margin-left: 0vw"></div>
    </div>
  );
};

export default ChartAccounting;
