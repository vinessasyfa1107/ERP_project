import { createSignal, type Component, onMount, onCleanup, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table_pengajuan_ModulPengajuan.css';
import { Icon } from '@iconify-icon/solid';
// import FormConfirm from '../form/form-confirm';
// import { dataplanning } from '../../../../api/planning/dataplanning';
// import { RowData } from '../../../navbars/create/kategori_pengajuanweekly/penguanweekly-rutin/pengajuanweekly-insentif/pengajuanweekly-insentif';
import { useNavigate } from '@solidjs/router';
import { DataMonthlyPengajuan } from '../../api/planning/new-pengajuan/new-pengajuan';
// import { type } from 'os';
import { setDataIDEvent, setDataIDMonthly, setDataIDWeekly, setSelectedCategory } from '../../store/Pengajuan/pengajuan-id';
import Form_transferAdmin from './form_transferAdmin';
import 'ag-grid-enterprise';
import html2pdf from 'html2pdf.js';

const [isEditPopupOpen, setIsEditPopupOpen] = createSignal(false);

const [editedData, setEditedData] = createSignal(null);

const [evidence, setEvidence] = createSignal('');


const showEditPopup = (rowData: any) => {
    setEditedData(rowData);
    setIsEditPopupOpen(true);
    setEvidence(rowData.evidence);
    console.log("test", evidence());
};

function CloseEditPopUp() {
    setIsEditPopupOpen(false);
}

const Table_pengajuan_ModulPengajuan: Component = () => {


    const [RowData, setRowData] = createSignal([{}]);
    const [searchTerm, setSearchTerm] = createSignal('');
    const [selectedMonth, setSelectedMonth] = createSignal('');

    onMount(async () => {
        const monthlypengajuan = await DataMonthlyPengajuan("data monthly plan");
        console.log("data detail plan", monthlypengajuan);
        setRowData(monthlypengajuan)
    })

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        console.log("bulan ", selectedMonth())
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log("search ", searchTerm());

    };
    

    // const exportToPDF = () => {
    //     const gridApi = gridOptions; // Gunakan gridOptions.api seperti yang Anda lakukan sebelumnya
    
    //     // Dapatkan baris yang dipilih menggunakan API
    //     const selectedRows = gridApi.getSelectedRows();
    
    //     // Filter baris yang dipilih berdasarkan kriteria (status 'Approved' dan memiliki bukti)
    //     const filteredRows = selectedRows.filter(row => row.status === 'Approved' && row.evidence);
    
    //     if (filteredRows.length > 0) {
    //         const gridDiv = document.querySelector('.ag-theme-alpine');
    //         if (gridDiv) {
    //             html2pdf(gridDiv, {
    //                 margin: 10,
    //                 filename: 'approved_status_report.pdf',
    //                 image: { type: 'jpeg', quality: 0.98 },
    //                 html2canvas: { scale: 2 },
    //                 jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    //             });
    //         }
    //     } else {
    //         // Beri tahu pengguna bahwa tidak ada baris yang memenuhi syarat untuk diekspor
    //         console.log('No approved records with evidence selected for export.');
    //     }
    // };

    // const exportToPDF = async () => { ini gabisa
    //     // Fetch the backend data
    //     const backendData = await DataMonthlyPengajuan("data pengajuan baru");
    
    //     // Filter the backend data based on criteria (approved status and evidence availability)
    //     const filteredData = backendData.filter(
    //         (item) => item.status === 'Approved' && item.evidence !== undefined
    //     );
    
    //     // Create a temporary element to render the filtered data
    //     const tempDiv = document.createElement('div');
    //     tempDiv.className = 'ag-theme-alpine';
    //     document.body.appendChild(tempDiv);
    
    //     // Render the filtered data in the temporary element
    //     AgGridSolid({
    //         columnDefs: columnDefs,
    //         rowData: filteredData,
    //         defaultColDef: defaultColDef,
    //         gridOptions: gridOptions,
    //         rowSelection: 'multiple',
    //         rowMultiSelectWithClick: true,
    //     });
    
    //     // Export the rendered HTML to PDF
    //     html2pdf(tempDiv, {
    //         margin: 10,
    //         filename: 'approved_status_report.pdf',
    //         image: { type: 'jpeg', quality: 0.98 },
    //         html2canvas: { scale: 2 },
    //         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    //     });
    
    //     // Remove the temporary element
    //     document.body.removeChild(tempDiv);
    // };
    
    

    const exportToPDF = () => { // ini yang bisa tapi gak ada kondisi 
        const gridDiv = document.querySelector('.ag-theme-alpine');
        console.log ("coba", gridDiv)
        if (gridDiv) {
          html2pdf(gridDiv, {
            margin: 10,
            filename: 'approved_status_report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          });
        }
      };

    // const [gridApi, setGridApi] = createSignal(null);
    // const [rowData, setRowData] = createSignal<RowData[]>(
    //     (() => {
    //       // Coba ambil data dari localStorage saat komponen diinisialisasi
    //       const savedData = localStorage.getItem('tableAllPengajuan');
    //       return savedData ? JSON.parse(savedData) : ([] as RowData[]);
    //     })()
    //   );

    const [backendData, setBackendData] = createSignal([{}]);
    const [popUpOpen, setPopUpOpen] = createSignal(false);
    const [popupData, setPopupData] = createSignal(null);
    const [confirmationStatus, setConfirmationStatus] = createSignal(false);
    const [formSubmitted, setFormSubmitted] = createSignal(false);

    //   onMount(async () => {
    //     const data_planning = await dataplanning("data planning dashboard dan modul pengajuan");
    //     console.log("dataplanning", data_planning);
    //     setRowData(data_planning);
    //   })

    //   const fetchData = async () => {
    //     const data_planning = await dataplanning("data planning dashboard dan modul pengajuan");
    //     setRowData(data_planning);
    //   };

    //   onMount(() => {
    //     fetchData();
    //   });

    const handlePopUpApproved = (data) => {
        if (data.status === 'Approved') {
            setPopupData(data);
            setPopUpOpen(true);
        }
    };

    //   const ClosePopUp = () => {
    //     setPopUpOpen(false);
    //     fetchData();
    //   };
    const navigate = useNavigate();



    const handleSelectionChanged = (event) => {
        const selectedRows = event.api.getSelectedRows();
        if (selectedRows.length > 0) {
            const selectedRowData = selectedRows[0];
            handlePopUpApproved(selectedRowData);
            // Step 2: Update confirmationStatus based on checkbox
            setConfirmationStatus(selectedRowData.confirm || false);

        }
        if (formSubmitted()) {
            event.api.deselectAll(); // Deselect the checkbox
        }
    };

    const loadGridData = async () => {
        const selectedMonthValue = selectedMonth();
        const searchTermValue = searchTerm();

        // ...

        console.log("search ", searchTermValue);
        console.log("bulan ", selectedMonthValue);
        const data_planning = await DataMonthlyPengajuan("data pengajuan baru");

        let filteredData = data_planning;

        if (selectedMonthValue) {
            filteredData = filteredData
                .filter((item) => item.entry_ts.startsWith(selectedMonthValue))
                .map((item) => ({
                    ...item,
                    entry_ts: item.entry_ts.slice(0, 10),
                }));
        }

        filteredData = filteredData.filter((item) =>
            Object.values(item).some((value) =>
                value && value.toString().toLowerCase().includes(
                    (searchTermValue && searchTermValue) ? searchTermValue.toLowerCase() : ''
                )
            )
        );



        console.log("Filtered Data:", filteredData);
        console.log("search ", searchTerm());
        console.log("bulan ", selectedMonth())
        setRowData(filteredData);
    };

    onMount(loadGridData);

    createEffect(() => {
        loadGridData();
        return onCleanup(() => {
            // Clean up subscriptions or resources if needed
        });
    }, [selectedMonth, searchTerm]);


    function getCellStyle(params: { value: string; }) {
        if (params.value === 'Weekly') {
            return { color: '#FF6838' };
        } else if (params.value === 'Monthly') {
            return { color: '#00BA29' };
        } else {
            return { color: '#860089' };
        }
    }

    const navigateToTimeTrackingFile = (id, row) => {
        // Anda dapat menyesuaikan fungsi ini berdasarkan struktur file Anda
        // Sebagai contoh, Anda mungkin ingin membuat URL dengan informasi id dan row
        const timeTrackingURL = `/dashboard/time-tracking`;

        // Navigasi ke file pelacakan waktu
        navigate(timeTrackingURL);
    };

    // const StatusRenderer = (props) => {
    //     const { value, data } = props;

    //     const handleStatusClick = () => {
    //         // Ambil informasi id dan row
    //         const id = data.id;
    //         const row = data;

    //         // Panggil fungsi untuk navigasi ke file pelacakan waktu dengan id dan row
    //         navigateToTimeTrackingFile(id, row);
    //     };
    // }


    const columnDefs = [
        { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 61 },
        { field: 'id', headerName: 'ID', editable: false },
        { field: 'entry_ts', headerName: 'Tanggal', editable: false },
        // { field: 'coa_kd', headerName: 'COA', editable: false },
        { field: 'namapengajuan', headerName: 'Keterangan', editable: false },
        { field: 'tipepengajuan', cellStyle: getCellStyle, headerName: 'Kategori', cellClassRules: { 'bold-type': () => true }, editable: false },
        // { field: 'category', headerName: 'Jenis', editable: false },
        { field: "total", headerName: "Total", width: 95, valueFormatter: (params) => formatRupiah(params.value) },
        { field: 'status', headerName: 'Status', editable: false, cellRenderer: (params) => {

                // Fungsi ini akan dijalankan setiap kali rendering sel
                const { value, data } = params;
                const handleStatusClick = () => {
                    // Ambil informasi id dan row
                    const id = data.id;
                    const row = data;

                    // Panggil fungsi untuk navigasi ke file pelacakan waktu dengan id dan row
                    navigateToTimeTrackingFile(id, row);
                };

                return (
                    <div style={{ cursor: 'pointer' }} onClick={handleStatusClick}>
                        {value}
                    </div>
                );
            },

        },
        {
            field: "transfer", headerName: "", cellRenderer: (params: any) => {
                return (
                    <div style={{ "justify-content": "center", "align-items": "center", "margin-right": "20px" }}>
                        <button onClick={() => showEditPopup(params.data)} style={{ "background-color": "#6E49E9", "justify-content": "center", "border-radius": "10px", "width": "5.5rem", "height": "2.3rem", "color": "white", "align-items": "center" }}>Evidence &gt</button>
                        {params.value}
                    </div>
                );
            }
        }
        // { field: 'confirm', headerName: 'Konfirmasi', headerCheckboxSelection: true, checkboxSelection: true, editable: false },
    ];

    const defaultColDef = {
        flex: 1,
        sortable: true,
    }

    const formatRupiah = (value) => {
        const numericValue = Number(value);

        if (isNaN(numericValue)) {
            return value;
        }

        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(numericValue);
    };


    const gridOptions = {
        // domLayout: 'autoHeight' as DomLayoutType,
        pagination: true,
        paginationPageSize: 4,
        rowHeight: 40,
        onSelectionChanged: handleSelectionChanged,
        onCellEditingStopped: (event) => {
            // Periksa apakah sel yang diedit adalah 'amount' dan baris sudah dikonfirmasi
            if (event.column.getColId() === 'amount' && event.data.confirm) {
                // Reset nilai ke nilai asli
                event.api.applyTransaction({ update: [{ ...event.data }] });
            }
        },
    }

    const onCellClicked = (params) => {
        const isTransferButtonClicked = params.colDef.field === "transfer";

        if (isTransferButtonClicked) {
            showEditPopup(params.data);
        } else {
            if (params.data.tipepengajuan === 'Weekly') {
                setDataIDWeekly(params.data.id);
                setSelectedCategory(params.data.tipepengajuan)
                navigate('/pengajuan/pengajuan_detail');
            } else if (params.data.tipepengajuan === 'Event') {
                setDataIDEvent(params.data.id);
                navigate('/pengajuan/pengajuan_detail');
                setSelectedCategory(params.data.tipepengajuan)
            } else if (params.data.tipepengajuan === 'Monthly') {
                setDataIDMonthly(params.data.id);
                navigate('/pengajuan/pengajuan_detail');
                setSelectedCategory(params.data.tipepengajuan)
            }
        }
    };

    return (
        <div>
            <div class="icon-export" style={{ display: "flex", "align-items": "center"}}>
            <Icon icon="ph:export" width="23" height="23" style={{ "margin-left": "auto", cursor: "pointer"  }} onClick={exportToPDF} />
            </div>

            <div style={{ display: "flex", "justify-content": "space-between" }}>
                <div>
                    {/* <label for="monthSelect">Pilih Bulan: </label> */}
                    <select id="monthSelect" onChange={handleMonthChange}>
                        <option value="">Semua Bulan</option>
                        <option value="2023-01">Januari</option>
                        <option value="2023-02">Februari</option>
                        <option value="2023-03">Maret</option>
                        <option value="2023-04">April</option>
                        <option value="2023-05">Mei</option>
                        <option value="2023-06">Juni</option>
                        <option value="2023-07">Juli</option>
                        <option value="2023-08">Agustus</option>
                        <option value="2023-09">September</option>
                        <option value="2023-10">Oktober</option>
                        <option value="2023-11">November</option>
                        <option value="2023-12">Desember</option>

                        {/* tambahkan opsi bulan lainnya sesuai kebutuhan */}
                    </select>
                </div>
                <div class="rightcp" style={{ display: "flex", "flex-direction": "row", "align-items": "center" }}>
                    <input type="text" placeholder="Search.." name="search"
                        value={searchTerm()}
                        onInput={handleSearchChange}
                    />
                    <span class="search-icon">
                        <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                    </span>
                    <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                </div>
            </div>

            <div style={{ "justify-content": "center" }}>
                <div class="ag-theme-alpine" style={{ width: '141vh', height: '21vw', margin: "auto" }}>
                    <AgGridSolid
                        columnDefs={columnDefs}
                        rowData={RowData()}
                        onCellClicked={onCellClicked}
                        defaultColDef={defaultColDef}
                        gridOptions={gridOptions}
                        rowSelection="multiple"
                        rowMultiSelectWithClick={true}
                    />
                </div>
                {isEditPopupOpen() && (<Form_transferAdmin OnClose={CloseEditPopUp} evidence={evidence()}/>)}
            </div>
        </div>
    );
};

export default Table_pengajuan_ModulPengajuan;
function isEditing() {
    throw new Error('Function not implemented.');
}