import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import { createEffect, createSignal } from 'solid-js';
import Semua_laporanNavbar from '../semua_laporanNavbar';
import './pengeluaran.css';

const Pengeluaran: Component = () => {
  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'ID Pengajuan', field: 'id_pengajuan' },
    { headerName: 'Jumlah', field: 'jumlah' },
    { headerName: 'Tanggal', field: 'tanggal' },
    { headerName: 'Keterangan', field: 'keterangan' },
    { headerName: 'Bukti', field: 'bukti' },
    { headerName: 'Tags', field: 'tags' }
  ];

  const rowData = [
    {
      "id": 1,
      "id_pengajuan": 123,
      "jumlah": 2000000,
      "tanggal": '10/12/22',
      "keterangan": "Lorem Ipsum Dolor Sit Amet",
      "bukti": "evidance.jpg",
      "tags": "VIP"
    },
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
      <div class="pengeluaran-container" >
        {/* div untuk mengatur top table pada pemasukan yang terdiri dari judul tabel, search, dan sorting icon */}
        <div class="pengeluaran-top-table">
          <div class="tutup-buku-container">
            <button>+ Tutup Buku</button>
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
        <p>Laporan Pengeluaran</p>

        {/* div untuk mengatur tabel kas besar dari ag grid */}
        <div class="pengeluaran-table">
          <div class="ag-theme-alpine" style={{ width: '68vw' }}>
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

export default Pengeluaran;
