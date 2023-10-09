import { createEffect, onCleanup, createSignal, Component } from 'solid-js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Barchart_aruskas_report: Component = () => {
    createEffect(() => {
        let chart: am4charts.XYChart | null = null;

        // Callback untuk menggambar chart
        const drawChart = () => {
            am4core.useTheme(am4themes_animated);

            chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.width = am4core.percent(100);
            chart.height = 400;
            chart.logo.disabled = true;

            // Data
            chart.data = [
                {
                    "month": "01/22",
                    "Biaya": 45,
                    "Pemasukan": 50,
                    "Pengeluaran": 56,
                },
                {
                    "month": "02/22",
                    "Biaya": 30,
                    "Pemasukan": 40,
                    "Pengeluaran": 38,
                },
                {
                    "month": "03/22",
                    "Biaya": 50,
                    "Pemasukan": 54,
                    "Pengeluaran": 35,
                },
                {
                    "month": "04/22",
                    "Biaya": 35,
                    "Pemasukan": 40,
                    "Pengeluaran": 38,
                },
                {
                    "month": "05/22",
                    "Biaya": 25,
                    "Pemasukan": 28,
                    "Pengeluaran": 28,
                },
                {
                    "month": "06/22",
                    "Biaya": 48,
                    "Pemasukan": 35,
                    "Pengeluaran": 56,
                },
                {
                    "month": "07/22",
                    "Biaya": 18,
                    "Pemasukan": 20,
                    "Pengeluaran": 10,
                },
                {
                    "month": "08/22",
                    "Biaya": 12,
                    "Pemasukan": 20,
                    "Pengeluaran": 18,
                },
                {
                    "month": "09/22",
                    "Biaya": 20,
                    "Pemasukan": 35,
                    "Pengeluaran": 28,
                },
                {
                    "month": "10/22",
                    "Biaya": 20,
                    "Pemasukan": 50,
                    "Pengeluaran": 35,
                },
                {
                    "month": "11/22",
                    "Biaya": 35,
                    "Pemasukan": 10,
                    "Pengeluaran": 35,
                },
                {
                    "month": "12/22",
                    "Biaya": 18,
                    "Pemasukan": 15,
                    "Pengeluaran": 20,

                }
            ];

            // Axis X (CategoryAxis)
            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "month";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 20;
            categoryAxis.renderer.cellStartLocation = 0.1;
            categoryAxis.renderer.cellEndLocation = 0.9;

            // Axis Y (ValueAxis)
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.max = 200;

            // Create series
            function createSeries(field: string, name: string, stacked: boolean, color: any) {
                let series = chart!.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = field;
                series.dataFields.categoryX = "month";
                series.name = name;
                series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
                series.stacked = stacked;
                series.columns.template.width = am4core.percent(95);
                series.columns.template.fill = color;
            }

            createSeries("Biaya", "Biaya", false, am4core.color("#B9002C")); // Menambahkan series untuk Biaya
            createSeries("Pemasukan", "Pemasukan", false, am4core.color("#0060B9"));
            createSeries("Pengeluaran", "Pengeluaran", false, am4core.color("#89963D"));


            // Add legend
            chart!.legend = new am4charts.Legend();
            let markerTemplate = chart.legend.markers.template;
            markerTemplate.width = 35;
            markerTemplate.height = 5;
        };

        // Gambar chart ketika komponen pertama kali dimount
        drawChart();

        // Cleanup untuk menghancurkan chart saat komponen di-unmount
        onCleanup(() => {
            if (chart) {
                chart.dispose();
            }
        });

        return () => {
            // Hapus chart sebelum menggambar yang baru
            if (chart) {
                chart.dispose();
            }
        };
    });

    return (
        <div>
            <div class="barchart-container">
                <div id="chartdiv" style={{ "width": "60vw", "height": "30vw"}}></div>
            </div>

        </div>
    );
};

export default Barchart_aruskas_report;
