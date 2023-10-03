import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning.css'

const TableDetailPlan: Component = () => {

    
    function getCellStyle(params: { value: string; }) {
      if (params.value === 'Weekly') {
        return { color: '#FF6838' };
      } else if (params.value === 'Monthly') {
        return { color: '#00BA29' };
      } else {
        return { color: '#860089' };
      }
    }

    const columnDefs = [
        { field: 'id' , headerName: 'ID'}, // Menambahkan filter pada kolom "make"
        { field: 'date' }, // Menambahkan filter pada kolom "model"
        { field: 'description' },
        { field: 'category' }, 
        { field: 'type', cellStyle: getCellStyle },
        { field: 'amount' }, // Menambahkan filter pada kolom "price"
        { field: 'status' },
        { field: 'confirm' },
      ];
    
      const rowData = [
        { id: '11C7D', date: '10-2-22', category: 'Trip', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' },
        { id: '11C7C', date: '10-2-22', category: 'Meeting', Keterangan: 'Lorem Ipsum', amount: 10000000, type: 'Event' },
        { id: '11C7B', date: '10-2-22', category: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 3250000, type: 'Monthly' },
        { id: '11C7A', date: '9-2-22', category: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' },
        { id: '11C7D', date: '10-2-22', category: 'Trip', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' },
        { id: '11C7C', date: '10-2-22', category: 'Meeting', Keterangan: 'Lorem Ipsum', amount: 10000000, type: 'Weekly' },
        { id: '11C7B', date: '10-2-22', category: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 3250000, type: 'Monthly' },
        { id: '11C7A', date: '9-2-22', category: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' }
      ];
    
    
      const defaultColDef = {
        flex: 1,
        sortable: true,
      }
    
      const gridOptions = {
        // domLayout: 'autoHeight' as DomLayoutType,
        pagination: true,
        paginationPageSize: 5,
        rowHeight: 40,
        components: {
            // checkboxRenderer: CheckboxRenderer
          }
      }

  return (
    <div>
        <div class="ag-theme-alpine" style={{width:'150vh', height:'19vw'}}>
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

export default TableDetailPlan;
