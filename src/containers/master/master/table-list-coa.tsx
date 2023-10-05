import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const TableListCOA: Component = () => {

    const columnDefs = [
        { field: 'coa_kd', headerName: 'Kode Akun'},
        { field: 'coa_name', headerName: 'Nama COA'},
        { field: 'kategori'}
      ];
    
      const rowData = [
        { coa_kd: '1-1100', coa_name: 'Kas', kategori: 'Kas & Bank'},
        { coa_kd: '1-1200', coa_name: 'Bank', kategori: 'Akun Piutang'},
        { coa_kd: '1-1202', coa_name: 'Bank Mandiri Giro', kategori: 'Akun Piutang'},
        { coa_kd: '1-1300', coa_name: 'Piutang Usaha', kategori: 'Kas & Bank'},
        { coa_kd: '2-1100', coa_name: 'Geodis', kategori: 'Kas & Bank'},
        { coa_kd: '2-1100', coa_name: 'Trimuda Nusantara Karya', kategori: 'Kas & Bank'},
        { coa_kd: '2-1100', coa_name: 'Hutang Usaha', kategori: 'Kas & Bank'}
      ];
    
    
      const defaultColDef = {
        flex: 1,
        sortable: true,
      }
    
      const gridOptions = {
        pagination: true,
        paginationPageSize: 7,
        rowHeight: 33
      }
  return (
    <div>
        <div class="ag-theme-alpine" style={{width:'80vh', height:'24vw'}}>
            <AgGridSolid
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                gridOptions={gridOptions}
            />
      </div>
    </div>
  );
};

export default TableListCOA;
