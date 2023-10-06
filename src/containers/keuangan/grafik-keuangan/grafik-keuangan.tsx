import { createEffect, onCleanup, createSignal, Component } from 'solid-js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Icon } from '@iconify-icon/solid';

const Grafik_keuangan: Component = () => {
    createEffect(() => {
        let chart: am4charts.XYChart | null = null;

        // Callback untuk menggambar chart
        const drawChart = () => {
            am4core.useTheme(am4themes_animated);
            chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.width = am4core.percent(100);
            chart.height = 400;
            chart.logo.disabled = true;

            // Add data
            chart.data = [{
                "date": new Date(2018, 3, 20),
                "value": 90
            }, {
                "date": new Date(2018, 3, 21),
                "value": 102
            }, {
                "date": new Date(2018, 3, 22),
                "value": 65
            }, {
                "date": new Date(2018, 3, 23),
                "value": 62
            }, {
                "date": new Date(2018, 3, 24),
                "value": 55
            }, {
                "date": new Date(2018, 3, 25),
                "value": 81
            }];

            // Create axes
            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

            // Create value axis
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            let lineSeries = chart.series.push(new am4charts.LineSeries());
            lineSeries.dataFields.valueY = "value";
            lineSeries.dataFields.dateX = "date";
            lineSeries.name = "Sales";
            lineSeries.strokeWidth = 3;

            // Add simple bullet
            let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
            bullet.circle.radius = 5; // Ukuran radius lingkaran
            bullet.circle.stroke = am4core.color("#000"); // Warna garis tepi lingkaran
            bullet.circle.fill = am4core.color("#FF5733");
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
            <div class="grafik-keuangan-container" style={{ "background-color": "#FFFFFFEB", "margin-top": "10px", "border-radius": "6px", "height": "58vh" }}>
                <div id="chartdiv" style={{ "width": "85vw", "height": "90vw", "font-size": "14px" }}>
                </div>
            </div>




        </div>
    );
};

export default Grafik_keuangan;
