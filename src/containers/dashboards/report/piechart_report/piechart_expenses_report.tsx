import { createEffect, type Component } from 'solid-js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Piechart_expenses_report: Component = () => {
    createEffect(() => {
        setTimeout(() => {
            chart_income()
        }, 500);
    })

    const chart_income = () => {
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("pieincome", am4charts.PieChart);

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";

        // Let's cut a hole in our Pie chart the size of 30% the radius
        chart.innerRadius = am4core.percent(50);
        chart.radius = am4core.percent(80);
        chart.logo.disabled = true;


        chart.data = [{
            "country": "Lithuania",
            "litres": 501.9
        }, {
            "country": "Germany",
            "litres": 165.8
        }, {
            "country": "Australia",
            "litres": 139.9
        }, {
            "country": "Austria",
            "litres": 128.3
        }, {
            "country": "UK",
            "litres": 99
        }, {
            "country": "Belgium",
            "litres": 60
        }];
        pieSeries.labels.template.disabled = true;

        // let label = chart.seriesContainer.createChild(am4core.Label);
        // label.text = "Total Biaya Total";
        // label.horizontalCenter = "middle";
        // label.verticalCenter = "middle";
        // label.fontSize = 16;

        // // Menghitung total liternya
        // let totalLitres = chart.data.reduce((acc, item) => acc + item.litres, 0);

        // // Menambahkan persentase total ke dalam label
        // label.events.on("inited", (event) => {
        //     label.text += \n${Math.round((totalLitres / 1000) * 100)}%;
        //   });



        // Misalnya, definisikan categoryWithHighestValue sebagai objek awal
        let categoryWithHighestValue = chart.data[0];

        // Kemudian, hitung kategori dengan nilai terbesar
        categoryWithHighestValue = chart.data.reduce((maxCategory, currentItem) => {
            return currentItem.litres > maxCategory.litres ? currentItem : maxCategory;
        }, chart.data[0]); // Menggunakan data pertama sebagai nilai awal

        // Menghitung total liternya
        let totalLitres = chart.data.reduce((acc, item) => acc + item.litres, 0);

        // Membuat label untuk persentase
        let percentageLabel = chart.seriesContainer.createChild(am4core.Label);
        percentageLabel.text = `${Math.round((categoryWithHighestValue.litres / totalLitres) * 100)}%`;
        percentageLabel.horizontalCenter = "middle";
        percentageLabel.verticalCenter = "middle"; // Mengatur ke tengah label
        percentageLabel.fontSize = 24; // Ukuran font persentase lebih besar
        percentageLabel.fontWeight = "500";
        percentageLabel.y = -7;


        // Membuat label untuk keterangan
        let descriptionLabel = chart.seriesContainer.createChild(am4core.Label);
        descriptionLabel.text = categoryWithHighestValue.country;
        descriptionLabel.horizontalCenter = "middle";
        descriptionLabel.verticalCenter = "middle"; // Mengatur ke tengah label
        descriptionLabel.fontSize = 12; // Ukuran font keterangan
        descriptionLabel.y = +10;


    }

    return (
        <div class="containers">
            <div id="pieincome" style={{ width: '200px', height: '200px' }}></div>
        </div>
    );
};

export default Piechart_expenses_report;