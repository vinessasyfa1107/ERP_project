import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import { createEffect, createSignal } from 'solid-js';
import './kas_besar.css';
import Kas_besar2 from './kas_besar2';
import Semua_laporanNavbar from '../semua_laporanNavbar';

const Kas_besar: Component = () => {
    const columnDefs = [
        { headerName: 'Date', field: 'date' },
        { headerName: 'COA', field: 'COA' },
        { headerName: 'Keterangan', field: 'keterangan' },
        { headerName: 'Pemasukan', field: 'pemasukan' },
        { headerName: 'Pengeluaran', field: 'pengeluaran' },
        { headerName: 'Saldo Awal', field: 'saldo_awal' }
    ];

    const rowData = [
        {
            "date": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "date": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "date": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "date": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "date": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "date": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }
    ];

    const defaultColDef = {
        flex: 1,
        filter: 'agTextColumnFilter',
    };

    const gridOptions = {
        pagination: true,
        paginationPageSize: 4,
        rowHeight: 40
    };


    return (
        <div>
            <Semua_laporanNavbar />
            <div class="kasBesar-container" >
                {/* div untuk mengatur top table pada kasBesar yang terdiri dari judul tabel, search, dan sorting icon */}
                <div class="kasBesar-top-table">
                    <div class="kasBesar-title">
                        <p>Approval Table<span> (Diurut dari baru)</span></p>
                    </div>
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

                {/* div untuk mengatur tabel kas besar dari ag grid */}
                <div class="kasBesar-table">
                    <div class="ag-theme-alpine" style={{ width: '50vw' }}>
                        <AgGridSolid
                            columnDefs={columnDefs}
                            rowData={rowData}
                            defaultColDef={defaultColDef}
                            domLayout='autoHeight'
                            gridOptions={gridOptions}
                        />
                    </div>
                </div>

                {/* div untuk mengatur total saldo container */}
                <div class="totalSaldo-container">
                    <div class="totalSaldo-title">
                        <p>Total Saldo</p>
                    </div>
                    <div class="totalSaldo-jumlah">
                        <p>46.781.200</p>
                    </div>
                </div>

                <div class="kas_besar2-container" style={{"margin-top":"5rem"}}>
                    <Kas_besar2 />
                </div>

            </div>

        </div>
    );
};

export default Kas_besar;
