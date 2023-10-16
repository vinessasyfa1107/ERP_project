import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import { createEffect, createSignal } from 'solid-js';
import './kasBesar_semualap.css';
import Semua_laporanNavbar from '../semua_laporanNavbar';

const KasBesar_semualap: Component = () => {
    const columnDefs = [
        { headerName: 'Tanggal', field: 'tanggal' },
        { headerName: 'COA', field: 'COA' },
        { headerName: 'Keterangan', field: 'keterangan' },
        { headerName: 'Pemasukan', field: 'pemasukan' },
        { headerName: 'Pengeluaran', field: 'pengeluaran' },
        { headerName: 'Saldo Awal', field: 'saldo_awal' }
    ];

    const rowData = [
        {
            "tanggal": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "tanggal": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "tanggal": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "tanggal": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "tanggal": '10/12/22',
            "COA": '1-1100',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "tanggal": '10/12/22',
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
            <div class="kasBesar-semualap-container" >
                <p>Kas Besar</p>

                {/* div untuk mengatur tabel kas besar dari ag grid */}
                <div class="kasBesar-semualap-table">
                    <div class="ag-theme-alpine" style={{ width: '69vw' }}>
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

            </div>

        </div>
    );
};

export default KasBesar_semualap;
