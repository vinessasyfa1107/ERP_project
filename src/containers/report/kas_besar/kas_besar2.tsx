import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import { createEffect, createSignal } from 'solid-js';
import './kas_besar2.css';

const Kas_besar2: Component = () => {
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
            "COA": '1-1200',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "date": '10/12/22',
            "COA": '1-1200',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "date": '10/12/22',
            "COA": '1-1200',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "date": '10/12/22',
            "COA": '1-1200',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "date": '10/12/22',
            "COA": '1-1200',
            "keterangan": 'Lorem ipsum',
            "pemasukan": 50000000,
            "pengeluaran": 39000000,
            "saldo_awal": 20000000
        }, {
            "date": '10/12/22',
            "COA": '1-1200',
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
        paginationPageSize: 2,
        rowHeight: 40
    };


    return (
        <div>
            <div class="kasBesar-table2" style={{
            "display": "flex",
            "justify-content": "center",
            "align-items": "center", 
            "text-align": "center"}}>
                <div class="ag-theme-alpine" style={{ 
                width: '50vw', 
                "text-align":"center", 
                "z-index":"0" }}>
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
            <div class="totalSaldo-container2">
                <div class="totalSaldo-title2">
                    <p>Total Saldo</p>
                </div>
                <div class="totalSaldo-jumlah2">
                    <p>46.781.200</p>
                </div>
            </div>


        </div>
    );
};

export default Kas_besar2;
