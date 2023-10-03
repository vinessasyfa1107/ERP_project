import AgGridSolid from 'ag-grid-solid';

import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal } from 'solid-js';

const TeamsAg = () => {
    const columnDefs = [
        { field: 'Date' },
        { field: 'Content' },
        { field: 'Platform' },
        { field: 'Package' },
        { field: 'Charging' },
        { field: 'Status' },
        { field: 'PhoneNumber', },
 
    ];

    const rowData = [
        {   Date: '01/01/2023', 
            Content: '-', 
            Platform: 'Netflix', 
            Package: 'Subscribed', 
            Charging: 'BKS001M41_xxxxx02',
            Status: 'Success',
            PhoneNumber:'08123456789' },

        {   Date: '01/01/2023', 
            Content: 'Video Bola', 
            Platform: 'Netflix', 
            Package: 'Not Subscribe', 
            Charging: 'BKS001M41_xxxxx02',
            Status: 'Failed',
            PhoneNumber:'' },    
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
            <div style={{ height: '45vh', width: '85vw' }} class="ag-theme-alpine">
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

export default TeamsAg;