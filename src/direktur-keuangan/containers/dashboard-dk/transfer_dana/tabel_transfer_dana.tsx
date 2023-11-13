import AgGridSolid from 'ag-grid-solid';

import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './tabel_transfer_dana.css';
import Form_transfer from './form_transfer';

const [isFormOpen, setIsFormOpen] = createSignal(false);
const [formDataToTransfer, setFormDataToTransfer] = createSignal(null);

const showEditPopup = (rowData) => {
    setFormDataToTransfer(rowData);
    setIsFormOpen(true);
};

const TransferButtonRenderer = ({ data }) => {
    const handleTransferClick = () => {
        showEditPopup(data);
    };
}


const Tabel_transfer_dana = () => {
    const columnDefs = [
        { field: "ID" },
        { field: "Tanggal" },
        { field: "Keterangan" },
        { field: "Kategori" },
        { field: "Jenis", cellStyle: getCellStyle, cellClassRules: { 'bold-type': () => true } },
        { field: "Jumlah" },
        { field: "Status" },
        {
            field: "Transfer", headerName: "", cellRendererFramework: TransferButtonRenderer, cellRenderer: (params: any) => {
                return (
                    <div style={{ "justify-content": "center", "align-items": "center", "margin-right": "20px" }}>
                        <button onClick={() => showEditPopup(params.data)} style={{ "background-color": "#6E49E9", "justify-content": "center", "border-radius": "10px", "width": "5.5rem", "height": "2.3rem", "color": "white", "align-items": "center" }}>Transfer &gt</button>
                        {params.value}
                        

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
                    rowData={rowData} // use signal
                    columnDefs={columnDefs} // no signal
                    rowSelection="single" // no signal, inline
                    defaultColDef={defaultColDef}
                    onSelectionChanged={selectionChangedCallback} // listen for grid event
                />
            </div>
            {isFormOpen() && <Form_transfer formData={formDataToTransfer()} OnClose={() => setIsFormOpen(false)} />}
        </div>
    );
};

export default Tabel_transfer_dana;