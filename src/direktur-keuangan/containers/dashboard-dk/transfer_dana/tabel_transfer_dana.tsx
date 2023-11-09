import AgGridSolid from 'ag-grid-solid';

import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';


const [isEditPopupOpen, setIsEditPopupOpen] = createSignal(false);

const [editedData, setEditedData] = createSignal(null);

const showEditPopup = (rowData: any) => {
    setEditedData(rowData);
    setIsEditPopupOpen(!isEditPopupOpen());
};

function CloseEditPopUp() {
    setIsEditPopupOpen(false);
}

const TransferButtonRenderer = ({ data }) => {
    const handleTransferClick = () => {
        // Handle the transfer button click here
        console.log('Transfer clicked for row data:', data);
    };

    return (
        <button onClick={handleTransferClick}>Transfer</button>
    );
};


const Tabel_transfer_dana = () => {
    const columnDefs = [
        { field: "ID" },
        { field: "Tanggal" },
        { field: "Keterangan" },
        { field: "Kategori" },
        { field: "Jenis" },
        { field: "Jumlah" },
        { field: "Status" },
        {
            field: "Transfer", headerName: "", cellRendererFramework: TransferButtonRenderer, // Use the custom cell renderer
            cellRendererParams: { onClick: showEditPopup }
        },
        {
            field: 'aksi', cellRenderer: (params: any) => {
                return (
                    <div style={{"display":"flex", "justify-content":"center","align-items":"center"}}>
                        <button style={{ "background-color": "#6E49E9", "justify-content": "center", "border-radius": "6px","width":"7rem","height":"2rem","color":"white","align-items":"center" }}>Transfer &gt</button>
                    </div>
                );
            }
        }
    ];


    const rowData = [
        {
            "ID": "ID:97174",
            "Tanggal": "02/2/23",
            "Keterangan": "Lorem Ipsum",
            "Kategori": "Produk",
            "Jenis": "Weekly",
            "Jumlah": "Rp 345.123.123",
            "Status": "Waiting"
        },
        {
            "ID": "ID:97174",
            "Tanggal": "02/2/23",
            "Keterangan": "Lorem Ipsum",
            "Kategori": "Produk",
            "Jenis": "Weekly",
            "Jumlah": "Rp 345.123.123",
            "Status": "Waiting"
        },
        {
            "ID": "ID:97174",
            "Tanggal": "02/2/23",
            "Keterangan": "Lorem Ipsum",
            "Kategori": "Produk",
            "Jenis": "Weekly",
            "Jumlah": "Rp 345.123.123",
            "Status": "Waiting"
        },
        {
            "ID": "ID:97174",
            "Tanggal": "02/2/23",
            "Keterangan": "Lorem Ipsum",
            "Kategori": "Produk",
            "Jenis": "Weekly",
            "Jumlah": "Rp 345.123.123",
            "Status": "Waiting"
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
            <div style={{ height: '50vh', width: '65vw' }} class="ag-theme-alpine">
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

export default Tabel_transfer_dana;