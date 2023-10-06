import type { Component } from 'solid-js';
import './accounting.css'
import ChartAccounting from './chart-accounting';
import { Icon } from '@iconify-icon/solid';

const Accounting: Component = () => {
  return (
    <div class="accounting">
        <div class="card-acounting-2">
                <div class="nameheader">
                  <div class="rightcp">
                        <input type="text" placeholder="Search.." name="search"/>
                          <span class="search-icon">
                          <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
                          </span>
                      <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                  </div>
                </div>
            <div style={{ "display": "flex", "justify-content": "center" }}>
                    <div class="report-case1 stats shadow">
                        <div class="report-card">
                            <div class="card-font stat-title">Journal</div>
                            <div>
                                <div class="report-jumlah-1 stat-value">BGN 28,051.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="report-case2 stats shadow">
                        <div class="report-card">
                            <div class="card-font stat-title">Balance</div>
                            <div>
                                <div class="report-jumlah-2 stat-value">BGN 28,051.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="report-case3 stats shadow">
                        <div class="report-card">
                            <div class="card-font stat-title">Profit Loss</div>
                            <div>
                                <div class="report-jumlah-3 stat-value">BGN 28,051.00</div>
                            </div>
                        </div>
                    </div>
              </div>
            <div class="component-1">
                <ChartAccounting/>
            </div>            
        </div>
    </div>
  );
};

export default Accounting;
