import { Component, createSignal } from 'solid-js';
import Barchart_report from './barchart_report/barchart_report';
import Table_income_report from './table_report/table_income_report';
import Table_expenses_report from './table_report/table_expenses_report';
import Piechart_income_report from './piechart_report/piechart_income_report';
import Piechart_expenses_report from './piechart_report/piechart_expenses_report';

import { Icon } from '@iconify-icon/solid';
import './report.css';

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
            <div class="report-container" style={{ "background-color": "#EFEFEF", "height": "200vh" }}>
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

                    <div class="barchartReport">
                        <Barchart_report />
                    </div>
                </div>

                {/* div untuk income container dan expenses container */}
                <div class="inex-container" >
                    



                        <div class="income-title">
                            <img src="src/assets/img/money-recive.png" alt="money-recive.png" style={{ "width": "27px", "height": "27px" }} />
                            <p>Total Pemasukan</p>
                        </div>

                        <div class="income-amount">
                            <p>Rp433.890.000</p>
                        </div>
                    

                    <div class="excome-container">
                        <div class="income-title">
                            <img src="src/assets/img/money-send.png" alt="money-recive.png" style={{ "width": "27px", "height": "27px" }} />
                            <p>Total Pengeluaran</p>
                        </div>

                        <div class="income-amount">
                            <p>Rp233.890.000</p>
                        </div>
                    </div>
                </div>


                {/* div untuk piechart income, tabel, dan piechart excome */}
                <div class="pietab-inex-container">
                    <div class="piechart-income-container">
                        <Piechart_income_report />
                    </div>

                    <div class="tabel-inex-container">
                        {showIncomeTable() && <Table_income_report />}
                        {showExpensesTable() && <Table_expenses_report />}
                    </div>

                    <div class="piechart-excome-container">
                        <Piechart_expenses_report />
                    </div>
                </div>

                {/* Tombol Total Income */}
                <button onClick={toggleIncomeTable}>
                    {showIncomeTable() ? "X" : "Total Income"}
                </button>
                

                {/* Tombol Total Expenses */}
                <br />
                <button onClick={toggleExpensesTable}>
                    {showExpensesTable() ? "X" : "Total Expenses"}
                </button>
                




            </div>
        </div>
    );
};


export default Report;