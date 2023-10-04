import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning.css'
import { Icon } from '@iconify-icon/solid';


const TableDetailPlan: Component = () => {

  // icon x <Icon icon="mdi:close-box" color="#e85151" width="15" height="15"/>
  // icon centang <Icon icon="icomoon-free:checkbox-checked" color="#7bc582" width="15" height="15" />
  // icon disabled <Icon icon="tabler:square-filled" color="#d9d9d9" width="15" height="15" />  

    function getCellStyle(params: { value: string; }) {
      if (params.value === 'Weekly') {
        return { color: '#FF6838' };
      } else if (params.value === 'Monthly') {
        return { color: '#00BA29' };
      } else {
        return { color: '#860089' };
      }
    }

    const confirmCellRenderer = (params: { data: any }) => {
      let check = null;
    
      if (params.data.status === 'Waiting') {
        check = <Icon icon="ic:round-square" color="#d9d9d9" width="18" height="18" />  ;
      } else if (params.data.status === 'Approved') {
        check = <Icon icon="icomoon-free:checkbox-checked" color="#7bc582" width="15" height="15" />;
      } else if (params.data.status === 'Rejected') {
        check = <Icon icon="mdi:close-box" color="#e85151" width="20" height="20"/>;
      }
    
      return check;
    };
    

    const columnDefs = [
        { field: 'id' , headerName: 'ID'}, // Menambahkan filter pada kolom "make"
        { field: 'date' }, // Menambahkan filter pada kolom "model"
        { field: 'description' },
        { field: 'category' }, 
        { field: 'type', cellStyle: getCellStyle, cellClassRules: { 'bold-type': () => true } },
        { field: 'amount' }, // Menambahkan filter pada kolom "price"
        { field: 'status' },
        { field: 'confirm' ,  cellRenderer: confirmCellRenderer},
      ];
    
      const rowData = [
        { id: '11C7D', date: '10-2-22', category: 'Trip', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' , status: 'Waiting', confirm: true,
          if (confirm : true) {
              return {cellRenderer: 'DeleteButtonRenderer'};
          }  
      },
        { id: '11C7C', date: '10-2-22', category: 'Meeting', Keterangan: 'Lorem Ipsum', amount: 10000000, type: 'Event' , status: 'Approved' },
        { id: '11C7B', date: '10-2-22', category: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 3250000, type: 'Monthly', status: 'Rejected' },
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
        paginationPageSize: 4,
        rowHeight: 40
      }

 

  return (
    <div>
        <div class="ag-theme-alpine" style={{width:'153vh', height:'21vw'}}>
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
