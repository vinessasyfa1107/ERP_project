import AgGridSolid from 'ag-grid-solid';


import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal } from 'solid-js';
import './table-time.css'

const TableTime = () => {
    const columnDefs = [
        { field: "NO" },
        { field: "Date" },
        { field: "Description" },
        { field: "Category" },
        { field: "Type", cellStyle: getCellStyle, cellClassRules: { 'bold-type': () => true } },
        { field: "Amount",   cellClass: 'transparent-row', },
        { field: "Status" },

    ];

    const rowData = [
        {   
            "NO": "12987", 
            "Date": "02/2/23", 
            "Description": "Lorem Ipsum", 
            "Category": "Lorem Ipsum",
            "Type": "Weekly", 
            "Amount": "15.000.000",
            "Status": "Waiting",
            isTransparent: true
        },  
        {   
            "NO": "12987", 
            "Date": "02/2/23", 
            "Description": "Lorem Ipsum", 
            "Category": "Lorem Ipsum",
            "Type": "Weekly", 
            "Amount": "15.000.000",
            "Status": "Approved"
        },  
        {   
            "NO": "12987", 
            "Date": "02/2/23", 
            "Description": "Lorem Ipsum", 
            "Category": "Lorem Ipsum",
            "Type": "Event", 
            "Amount": "15.000.000",
            "Status": "Rejected",
            isTransparent: true

        }, 
        {   
            "NO": "12987", 
            "Date": "02/2/23", 
            "Description": "Lorem Ipsum", 
            "Category": "Lorem Ipsum",
            "Type": "Weekly", 
            "Amount": "15.000.000",
            "Status": "Waiting"
        },   

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

            getRowStyle: function(params) {
                // Kondisi di mana baris harus transparan
                if (params.data.isTransparent) {
                  return { background: 'transparent' };
                }
                // Kondisi lainnya
                return null; // Gunakan gaya CSS default
              },
            
          } 
    

    function getCellStyle(params: { value: string; }) {
        if (params.value === 'Weekly') {
          return { color: '#FF6838' };
        } else if (params.value === 'Monthly') {
          return { color: '#00BA29' };
        } else {
          return { color: '#860089' };
        }
      }

    // event listener
    const selectionChangedCallback = (e: any) => {
        console.log('selection has changed', e);
    };

    return (
        <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center' }}>
            <div style={{ height: '35vh', width: '65vw' }} class="ag-theme-alpine glass-table">
                <AgGridSolid
                    rowData={rowData} 
                    columnDefs={columnDefs} 
                    rowSelection="single" // no signal, inline
                    defaultColDef={defaultColDef}
                    gridOptions={gridOptions}
                    onSelectionChanged={selectionChangedCallback} // listen for grid event
                />
            </div>
        </div>
    );
};

export default TableTime;