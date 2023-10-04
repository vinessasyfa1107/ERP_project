import type { Component } from 'solid-js';
import Barchart_report from './barchart_report/barchart_report';
import Piechart_income_report from './piechart_report/Piechart_income_report';
import Piechart_expenses_report from './piechart_report/piechart_expenses_report';

import { Icon } from '@iconify-icon/solid';
import './report.css';

const Report: Component = () => {
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
                    <div class="income-container">
                        <div class="income-title">
                            <img src="src/assets/img/money-recive.png" alt="money-recive.png" style={{ "width": "27px", "height":"27px" }} />
                            <p>Income Amount</p>
                        </div>

                        <div class="income-amount">
                            <p>Rp433.890.000</p>
                        </div>
                    </div>

                    <div class="excome-container">
                        <div class="income-title">
                            <img src="src/assets/img/money-send.png" alt="money-recive.png" style={{ "width": "27px", "height":"27px" }} />
                            <p>Expenses Amount</p>
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

                    {/* <div class="tabel-inex-container">
                        <Table_report />
                    </div> */}

                    <div class="piechart-excome-container">
                        <Piechart_expenses_report />
                    </div>
                </div>




            </div>
        </div>
    );
};


export default Report;