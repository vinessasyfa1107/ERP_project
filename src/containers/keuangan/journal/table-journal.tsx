import { createSignal, type Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-journal.css'

const TableJournal: Component = () => {

    const columnDefs = [
        { field: 'id' , headerName: 'ID'}, // Menambahkan filter pada kolom "make"
        { field: 'tanggal' }, // Menambahkan filter pada kolom "model"
        { field: 'pengeluaran' },
        { field: 'penghasilan' }
      ];
    
      const rowData = [
        { id: '1-T300', tanggal:'', pengeluaran:'Loren Ipsum', penghasilan:'' }
      ];
    
    
      const defaultColDef = {
        flex: 1,
        sortable: true,
      }
    
      const gridOptions = {
        // domLayout: 'autoHeight' as DomLayoutType,
        pagination: true,
        paginationPageSize: 4,
        rowHeight: 40
      }

 

  return (
    <div>
        <div class="ag-theme-alpine" style={{width:'140vh', height:'21vw'}}>
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

export default TableJournal;
