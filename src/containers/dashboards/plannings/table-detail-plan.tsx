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

    // function checkboxRenderer(params) {
    //   const checkboxContainer = document.createElement('div');
    //   checkboxContainer.className = 'checkbox-container';
  
    //   const input = document.createElement('input');
    //   input.type = 'checkbox';
    //   input.checked = params.value;
  
    //   input.addEventListener('click', () => {
    //     params.node.setDataValue(params.column.colId, input.checked);
    //   });
  
    //   const checkmark = document.createElement('span');
    //   checkmark.className = 'checkbox-checkmark';
  
    //   input.appendChild(checkmark);
  
    //   checkboxContainer.appendChild(input);
  
    //   return checkboxContainer;
    // }

    function checkboxRenderer(params) {
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = params.value;
    
      // Tambahkan event listener untuk mengubah warna checkbox saat dicentang
      input.addEventListener('click', () => {
        params.node.setDataValue(params.column.colId, input.checked);
        if (input.checked) {
          input.style.backgroundColor = '#00BA29'; // Ubah warna latar belakang saat dicentang
        } else {
          input.style.backgroundColor = ''; // Hapus warna latar belakang jika tidak dicentang
        }
      });
    
      return input;
    }
    
     
    // function checkboxRenderer(params) {
    //   const checkboxContainer = document.createElement('div');
    //   const checkbox = document.createElement('input');
    //   checkbox.type = 'checkbox';
    
    //  // Menambahkan event listener untuk memperbarui data berdasarkan checkbox
    //   checkbox.addEventListener('change', function (event) {
    //     if (event.target instanceof HTMLInputElement) {
    //       params.data.confirm = event.target.checked;
    //     }
    //   });

    
    //   // Sesuaikan tampilan berdasarkan status
    //   if (params.data.status === 'Approved') {
    //     checkbox.style.color = 'green'; // Background hijau untuk status "Approved"
    //   } else if (params.data.status === 'Rejected') {
    //     checkbox.style.backgroundColor = 'red'; // Background merah untuk status "Rejected"
    //     // checkbox.style.opacity = 0.7; // Mengurangi opacity untuk mengindikasikan status "Rejected"
    //   } else {

    //   }
    
    //   // Menambahkan checkbox ke dalam container
    //   checkboxContainer.appendChild(checkbox);
    
    //   return checkboxContainer;
    // }

    // function checkboxRenderer(params) {
    //   const checkbox = document.createElement('input');
    //   checkbox.type = 'checkbox';
    //   checkbox.className = 'checkbox-custom'; // Tambahkan kelas CSS kustom ke checkbox
    
    //      checkbox.addEventListener('change', function (event) {
    //     if (event.target instanceof HTMLInputElement) {
    //       params.data.confirm = event.target.checked;
    //     }
    //   });
    
    //   return checkbox;
    // }
    
    
    

    const columnDefs = [
        { field: 'id' , headerName: 'ID'}, // Menambahkan filter pada kolom "make"
        { field: 'date' }, // Menambahkan filter pada kolom "model"
        { field: 'description' },
        { field: 'category' }, 
        { field: 'type', cellStyle: getCellStyle, cellClassRules: { 'bold-type': () => true } },
        { field: 'amount' }, // Menambahkan filter pada kolom "price"
        { field: 'status' },
        { field: 'confirm' , cellRenderer: 'checkboxRenderer' },
      ];
    
      const rowData = [
        { id: '11C7D', date: '10-2-22', category: 'Trip', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' , status: 'Waiting' },
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
        rowHeight: 40,
        components: {
          checkboxRenderer: checkboxRenderer,
        }
      }

 

  return (
    <div>
        <div class="ag-theme-alpine" style={{width:'153vh', height:'19vw'}}>
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
