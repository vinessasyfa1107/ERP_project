import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import { Grid, GridOptions, ISetFilterParams } from 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import { ColDef, MenuItemDef } from 'ag-grid-enterprise';


import Semua_laporanNavbar from '../semua_laporanNavbar';
import './pengeluaran.css';
import Tutup_buku from '../pemasukan/tutup_buku';


const Pengeluaran: Component = () => {

  const agLinkCellRenderer = (params: any) => {
    const bukti = params.data.bukti;
    const link = `https://example.com/city/${bukti}`;

    return (
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ "text-decoration": "underline", color: "blue" }}>
        {bukti}
      </a>
    );
  };

  const tagsCellRenderer = (params: any) => {
    const tags = params.value;
    let tagColor = 'transparent';

    switch (tags) {
      case 'VIP':
        tagColor = '#F56D59'; // Ganti dengan warna yang Anda inginkan
        break;
      case 'In Progress':
        tagColor = '#C7C7C7'; // Ganti dengan warna yang Anda inginkan
        break;
      case 'Urgent':
        tagColor = '#040404'; // Ganti dengan warna yang Anda inginkan
        break;
      case 'Bug':
        tagColor = '#31DFEA'; // Ganti dengan warna yang Anda inginkan
        break;
      case 'VVIP':
        tagColor = '#FF2100'; // Ganti dengan warna yang Anda inginkan
        break;
      default:
        tagColor = 'transparent'; // Warna default untuk nilai lain
    }

    return (
      <div>
        <span
          style={{
            "background-color": tagColor,
            "border-radius": '50%',
            "display": 'inline-block',
            "width": '10px',
            "height": '10px',
            "margin-right": '8px',
          }}
        ></span>
        {tags}
      </div>
    );
  };


const columnDefs = [
  { headerName: 'ID', field: 'id' },
  { headerName: 'ID Pengajuan', field: 'id_pengajuan' },
  { headerName: 'Faktur', field: 'faktur' },
  { headerName: 'COA', field: 'COA' },
  { headerName: 'Jumlah', field: 'jumlah' },
  { headerName: 'Tanggal', field: 'tanggal' },
  { headerName: 'Keterangan', field: 'keterangan' },
  { headerName: 'Bukti', field: 'bukti', cellRenderer: agLinkCellRenderer },
  {
    headerName: 'Tags',
    field: 'tags',
    filter: 'agSetColumnFilter',
    filterParams: {
      applyMiniFilterWhileTyping: true,
      values: ['VIP','In Progress','Urgent','Bug','VVIP'],
    } as ISetFilterParams,
    cellRenderer: tagsCellRenderer
  }
];

const rowData = [
  {
    "id": 1,
    "id_pengajuan": 123,
    "faktur": "KM20231016",
    "COA": "1-1000",
    "jumlah": 2000000,
    "tanggal": '10/12/22',
    "keterangan": "Lorem Ipsum Dolor Sit Amet",
    "bukti": "evidance.jpg",
    "tags": "VIP"
  },
  {
    "id": 2,
    "id_pengajuan": 123,
    "faktur": "KM20231016",
    "COA": "1-1000",
    "jumlah": 2000000,
    "tanggal": '10/12/22',
    "keterangan": "Lorem Ipsum Dolor Sit Amet",
    "bukti": "evidance.jpg",
    "tags": "In Progress"
  },
  {
    "id": 3,
    "id_pengajuan": 123,
    "faktur": "KM20231016",
    "COA": "1-1000",
    "jumlah": 2000000,
    "tanggal": '10/12/22',
    "keterangan": "Lorem Ipsum Dolor Sit Amet",
    "bukti": "evidance.jpg",
    "tags": "Urgent"
  },
  {
    "id": 4,
    "id_pengajuan": 123,
    "faktur": "KM20231016",
    "COA": "1-1000",
    "jumlah": 2000000,
    "tanggal": '10/12/22',
    "keterangan": "Lorem Ipsum Dolor Sit Amet",
    "bukti": "evidance.jpg",
    "tags": "Bug"
  },
  {
    "id": 5,
    "id_pengajuan": 123,
    "faktur": "KM20231016",
    "COA": "1-1000",
    "jumlah": 2000000,
    "tanggal": '10/12/22',
    "keterangan": "Lorem Ipsum Dolor Sit Amet",
    "bukti": "evidance.jpg",
    "tags": "VVIP"
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
    <Semua_laporanNavbar />
    <div class="pengeluaran-container">
      {/* div untuk mengatur top table pada pemasukan yang terdiri dari judul tabel, search, dan sorting icon */}
      <div class="pengeluaran-top-table">
        <div class="tutup-buku-container">
          <Tutup_buku />
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
