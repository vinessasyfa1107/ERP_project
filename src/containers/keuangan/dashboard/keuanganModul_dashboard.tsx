import type { Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';

import './keuanganModul_dashboard.css';
import KeuanganNavbar from '../keuangan-navbar';
import Grafik_keuangan_dashboard from '../../dashboard/accounting/grafik_keuangan_dashboard';
import KeuanganModul_report from './keuanganModul_report';



const Keuangan_dashboard: Component = () => {
    return (

        <div>
            <KeuanganNavbar />
            <div class="keuanganModul-dashboard-container">
                {/* div untuk card chart total pada keuangan dashboard */}
                <div class="all-report-card">
                    <div class="report-case">
                        <div class="card-title">Journal</div>
                        <div class="card-total" style={{ "color": "#a155b9" }}>BGN 28,051.00</div>
                    </div>
                    <div class="report-case">
                        <div class="card-title">Balance</div>
                        <div class="card-total" style={{ "color": "#f765b3" }}>BGN 28,051.00</div>
                    </div>
                    <div class="report-case">
                        <div class="card-title">Profit Loss</div>
                        <div class="card-total" style={{ "color": "#165baa" }}>BGN 28,051.00</div>
                    </div>
                </div>

                {/* div untuk card chart total pada keuangan dashboard dan grafik keuangan dashboard */}
                <div class="chart-total-keuanganModul">
                    <div class="card-total-container">
                        <div class="total-title">
                            Total
                        </div>
                        <div class="card-total2">
                            5.987,37
                        </div>
                        <div class="card-total3">
                            BGN
                        </div>
                    </div>

                    <div class="grafik-keuangan-dashboard-container">
                        <Grafik_keuangan_dashboard />
                    </div>

                    <KeuanganModul_report />
                </div>
            </div>
        </div>
    );
};

export default Keuangan_dashboard;
