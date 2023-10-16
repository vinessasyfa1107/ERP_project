import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import { Grid, GridOptions, ISetFilterParams } from 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import { ColDef, MenuItemDef } from 'ag-grid-enterprise';


import './inex_semualap.css';


const Pengeluaran_semualap: Component = () => {

    const columnDefs = [
        { headerName: 'Tanggal', field: 'tanggal' },
        { headerName: 'Keterangan', field: 'keterangan' },
        { headerName: 'Jumlah', field: 'jumlah' }
    ];

    const rowData = [
        {
            "tanggal": '10/12/22',
            "keterangan": "Lorem Ipsum Dolor Sit Amet",
            "jumlah": 2000000
        }
    ];

    const defaultColDef = {
        flex: 1,
        filter: 'agTextColumnFilter',
    };

    const gridOptions = {
        pagination: true,
        paginationPageSize: 5,
        rowHeight: 40,
        // frameworkComponents, // Tambahkan frameworkComponents ke dalam gridOptions
    };

    return (
        <div>
            <div class="inex-semualap-container">
                <p>Pengeluaran</p>

                {/* div untuk mengatur tabel kas besar dari ag grid */}
                <div class="inex-semualap-table">
                    <div class="ag-theme-alpine" style={{ width: '28vw' }}>
                        <AgGridSolid
                            columnDefs={columnDefs}
                            rowData={rowData}
                            defaultColDef={defaultColDef}
                            domLayout='autoHeight'
                            gridOptions={gridOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pengeluaran_semualap;
