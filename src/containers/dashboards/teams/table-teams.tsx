import AgGridSolid from 'ag-grid-solid';

import './table-teams.css'
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal } from 'solid-js';
import TagsHeader from './tags-header';

const TableTeams = () => {
    const columnDefs = [
        { field: "Name" },
        { field: "Email" },
        { field: "Access" },
        { field: "Role" },
        { field: "Category" },
        {
        headerName: 'Action',
        field: 'checkboxColumn',
        headerComponentFramework: TagsHeader, // Gunakan custom header component
        width: 50,
        },
    
    ];

    const rowData = [
        {   "Name": "Dede Herman", 
            "Email": "dedeherman@braincodesolution", 
            "Access": "Admin", 
            "Role": "Employee, Supplier", 
            "Category": "Suppervisor",
            "Action": "button"
        },  
        {   "Name": "Dede Herman", 
            "Email": "dedeherman@braincodesolution", 
            "Access": "Admin", 
            "Role": "Employee, Supplier", 
            "Category": "Suppervisor",
            "Action": "button"
        },  
        {   "Name": "Dede Herman", 
            "Email": "dedeherman@braincodesolution", 
            "Access": "Admin", 
            "Role": "Employee, Supplier", 
            "Category": "Suppervisor",
            "Action": "button"
        },  
        {   "Name": "Dede Herman", 
            "Email": "dedeherman@braincodesolution", 
            "Access": "Admin", 
            "Role": "Employee, Supplier", 
            "Category": "Suppervisor",
            "Action": "button"
        },  
        ];

    const defaultColDef = {
        flex: 1,
    };

    // event listener
    const selectionChangedCallback = (e: any) => {
        console.log('selection has changed', e);
    };

    return (
        <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center' }}>
            <div style={{ height: '60vh', width: '85vw' }} class="ag-theme-alpine">
                <AgGridSolid
                    rowData={rowData} // use signal
                    columnDefs={columnDefs} // no signal
                    rowSelection="single" // no signal, inline
                    defaultColDef={defaultColDef}
                    onSelectionChanged={selectionChangedCallback} // listen for grid event
                />
            </div>
        </div>
    );
};

export default TableTeams;