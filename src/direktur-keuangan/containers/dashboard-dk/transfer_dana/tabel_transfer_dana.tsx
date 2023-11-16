import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal, type Component, onMount, onCleanup, createEffect } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './tabel_transfer_dana.css';
import Form_transfer from './form_transfer';
import { dataplanning } from '../../../../api/planning/dataplanning';

const [isEditPopupOpen, setIsEditPopupOpen] = createSignal(false);
  
const [editedData, setEditedData] = createSignal(null);

const showEditPopup = (rowData: any) => {
  setEditedData(rowData);
  setIsEditPopupOpen(!isEditPopupOpen());
};

function CloseEditPopUp () {
  setIsEditPopupOpen (false);
}

const Tabel_transfer_dana = () => {
    const [RowData, setRowData] = createSignal([{}]);
    const [selectedRow, setSelectedRow] = createSignal(null);
    const [FormTransfer, setFormTransfer] = createSignal(null);


    onMount(async () => {
        const data_planning = await dataplanning("data planning dashboard dan modul pengajuan");
        console.log("dataplanning", data_planning);
        setRowData(data_planning);
    })

    const columnDefs = [
        { field: 'id', headerName: "ID" },
        { field: 'entry_ts', headerName: "Tanggal" },
        { field: 'description', headerName: "Keterangan" },
        { field: 'planningtype', headerName: "Kategori" },
        { field: 'category', headerName: "Jenis", cellStyle: getCellStyle, cellClassRules: { 'bold-type': () => true } },
        { field: 'amount', headerName: "Jumlah" },
        { field: 'status', headerName: "Status" },
        {
            field: "transfer", headerName: "", cellRenderer: (params: any) => {
                return (
                    <div style={{ "justify-content": "center", "align-items": "center", "margin-right": "20px" }}>
                        <button onClick={() => showEditPopup(params.data)} style={{ "background-color": "#6E49E9", "justify-content": "center", "border-radius": "10px", "width": "5.5rem", "height": "2.3rem", "color": "white", "align-items": "center" }}>Transfer &gt</button>
                        {params.value}
                    </div>
                );
            }
        }
    ];

    const defaultColDef = {
        flex: 1,
    };

    // event listener
    const selectionChangedCallback = (e: any) => {
        console.log('selection has changed', e);
    };

    function getCellStyle(params: { value: string; }) {
        if (params.value === 'Weekly') {
            return { color: '#FF6838' };
        } else if (params.value === 'Monthly') {
            return { color: '#00BA29' };
        } else {
            return { color: '#860089' };
        }
    }

    return (
        <div style={{ display: 'flex', "justify-content": 'center', "align-items": 'center' }}>
            <div style={{ height: '50vh', width: '65vw' }} class="ag-theme-alpine">
                <AgGridSolid
                    rowData={RowData()} // use signal
                    columnDefs={columnDefs} // no signal
                    rowSelection="single" // no signal, inline
                    defaultColDef={defaultColDef}
                    onSelectionChanged={selectionChangedCallback} // listen for grid event
                />
            </div>
            {isEditPopupOpen() && (<Form_transfer data={editedData()} OnClose={CloseEditPopUp} />)}
        </div>
    );
};

export default Tabel_transfer_dana;