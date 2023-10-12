import { Component, createSignal } from 'solid-js';
import Table_income_report from './table_report/table_income_report';
import Table_expenses_report from './table_report/table_expenses_report';
import Piechart_expenses_report from './piechart_report/piechart_report';
import Barchart_inex_report from './barchart_inex_report/barchart_inex_report';
import Barchart_aruskas_report from './barchart_aruskas_report/barchart_aruskas_report';
import Barchart_labarugi_report from './barchart_labarugi_report/barchart_labarugi_report';
// import ReportNavbar from '../reportNavbar';
import { Icon } from '@iconify-icon/solid';
import './report.css';
import Header from '../../header/header';


const Report: Component = () => {
    const [showIncomeTable, setShowIncomeTable] = createSignal(false);
    const [showExpensesTable, setShowExpensesTable] = createSignal(false);

    const toggleIncomeTable = () => {
        setShowIncomeTable(!showIncomeTable());
        setShowExpensesTable(false); // Pastikan tabel Expenses disembunyikan saat menampilkan tabel Income
    };

    const toggleExpensesTable = () => {
        setShowExpensesTable(!showExpensesTable());
        setShowIncomeTable(false); // Pastikan tabel Income disembunyikan saat menampilkan tabel Expenses
    };

    return (
        <div>
            <Header/>
            {/* <div class="navbar-f-report">
                <ReportNavbar />
            </div> */}

            <div class="report-container" style={{ "background-color": "#EFEFEF", "height": "255vh", "width": "160vh", "border-radius": "10px", "padding-top": "15px", "margin-bottom": "20px" }}>
                {/* div untuk barchart container */}
                <div class="barchartReport-container">
                    <div class="top-table">
                        <div class="search-container">
                            <div class="search-input">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="filter-text-box"
                                    placeholder="Search..."
                                />
                                <span class="search-icon">
                                    <Icon icon="ic:baseline-search" color="gray" width="16" height="16" />
                                </span>
                            </div>
                            <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                        </div>
                    </div>

                    <div class="barchartInexReport">
                        <Barchart_inex_report />
                    </div>
                </div>

                {/* div untuk income container dan expenses container */}
                <div class="inex-container" style={{
                    "margin-top": "25px",
                    "justify-content": "center",
                    "text-align": "center",
                    "align-items": "center",
                    "display": "flex"
                }}>
                    {/* ====== button untuk menampilkan tabel income ====== */}
                    <div>
                        <button onClick={toggleIncomeTable} style={{
                            "width": "242px",
                            "height": "68px",
                            "background-color": "#C1533EA3",
                            "border-radius": "10px",
                            "border": "1px solid rgba(128, 128, 128, 0.20)",
                            "box-shadow": "0 5px 5px rgba(0, 0, 0, 0.2)",
                            "margin-right": "20px",
                            "position": "relative"

                        }}>
                            <div class="inexcome-info">
                                <div class="inexcome-title" style={{
                                    "display": "flex",
                                    "padding-left": "20px",
                                    "padding-top": "5px"
                                }}>
                                    <img src="src/assets/img/money-recive.png" alt="money-recive.png" style={{ "width": "27px", "height": "27px" }} />
                                    <p style={{
                                        "padding-left": "20px",
                                        "font-weight": "500", "font-size": "18px"
                                    }}>Total Pemasukan</p>
                                </div>

                                <div class="inexcome-amount" style={{
                                    "margin-left": "18px",
                                    "font-weight": "500",
                                    "font-size": "18px"
                                }}>
                                    <p>Rp133.890.000</p>
                                </div>
                            </div>
                            {showIncomeTable()}
                        </button>
                    </div>

                    {/* ====== button untuk menampilkan tabel expenses ====== */}
                    <div>
                        <button onClick={toggleExpensesTable} style={{
                            "width": "242px",
                            "height": "68px",
                            "background-color": "#EB9627A1",
                            "border-radius": "10px",
                            "border": "1px solid rgba(128, 128, 128, 0.20)",
                            "box-shadow": "0 5px 5px rgba(0, 0, 0, 0.2)",
                            "margin-right": "20px",
                            "position": "relative"
                        }}>
                            <div class="inexcome-info">
                                <div class="inexcome-title" style={{
                                    "display": "flex",
                                    "padding-left": "20px",
                                    "padding-top": "5px"
                                }}>
                                    <img src="src/assets/img/money-send.png" alt="money-send.png" style={{ "width": "27px", "height": "27px" }} />
                                    <p style={{
                                        "padding-left": "20px",
                                        "font-weight": "500", "font-size": "18px"
                                    }}>Total Pengeluaran</p>
                                </div>

                                <div class="inexcome-amount" style={{
                                    "margin-left": "18px",
                                    "font-weight": "500",
                                    "font-size": "18px"
                                }}>
                                    <p>Rp233.890.000</p>
                                </div>
                            </div>

                            {showExpensesTable()}
                        </button>
                    </div>
                </div>

                {/* div untuk piechart income, tabel, dan piechart excome */}
                <div class="pietab-inex-container">

                    <div class="tabel-inex-container" style={{ "padding-top": "25px" }}>
                        {showIncomeTable() && <Table_income_report />}
                        {showExpensesTable() && <Table_expenses_report />}
                    </div>

                    <div class="piechart-container">
                        <Piechart_expenses_report />
                    </div>
                </div>

                {/* div untuk barchart arus kas report */}
                <p style={{ "margin": "22px", "color": "#414141", "font-size": "18px", "font-style": "normal", "font-weight": "700", "line-height": "normal" }}>Arus Kas</p>
                <div class="barchart-aruskas-container" style={{ "margin-bottom": "5.5rem" }}>
                    <Barchart_aruskas_report />
                </div>

                {/* div untuk barchart laba rugi */}
                <p style={{ "margin": "22px", "color": "#414141", "font-size": "18px", "font-style": "normal", "font-weight": "700", "line-height": "normal" }}>Laba Rugi</p>
                <div class="barchart-labarugi-container" >
                    <Barchart_labarugi_report />
                </div>


            </div>
        </div>
    );
};


export default Report;