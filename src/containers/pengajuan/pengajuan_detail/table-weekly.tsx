import { createSignal, type Component, onMount, onCleanup, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import '../../dashboard/plannings/table/table-planning.css';
import { Icon } from '@iconify-icon/solid';
import { useNavigate } from '@solidjs/router';
// import { dataIdPlan } from '../../dashboard/plannings/table/table-pengajuan-baru';
import { DataWeeklyPengajuan } from '../../../api/planning/new-pengajuan/weekly-pengajuan';
import { DataDetailWeekly } from '../../../api/planning/new-pengajuan/weekly-detail-pengajuan';
import { GridOptions } from 'ag-grid-community';

const [dataIdWeekly, setDataIDWeekly] = createSignal(0);

export {dataIdWeekly, setDataIDWeekly}


const TablePengajuanDetailWeekly: Component = () => {
    
    const [RowData, setRowData] = createSignal([{}]);

    onMount(async () => {
        const weeklypengajuan = await DataDetailWeekly("data weekly detail plan");
        console.log("WEEKLY detail plan", weeklypengajuan);
        setRowData(weeklypengajuan)
    })


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

  
// const onCellClicked = (data) => {
//         setDataIDPlan(data.id);
//         navigate('/pengajuan/pengajuan_detail');
//   };

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


  function getCellStyle(params: { value: string; }) {
    if (params.value === 'Weekly') {
      return { color: '#FF6838' };
    } else if (params.value === 'Monthly') {
      return { color: '#00BA29' };
    } else {
      return { color: '#860089' };
    }
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
    columnDefs: [
    // { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 61 },
    // { field: 'id', headerName: 'ID', editable: false },
    { field: 'pengajuan_id', headerName: 'ID', editable: false, width: 100 },
    { field: 'namapengajuan', headerName: 'Pengajuan', editable: false},
    { field: 'keterangan', editable: false },
    { field: 'kebutuhan'},
    { field: 'total', headerName: 'Jumlah', valueFormatter: (params) => formatRupiah(params.value),  width: 100 },
    // { field: 'tipepengajuan', cellStyle: getCellStyle, headerName: 'Kategori', cellClassRules: { 'bold-type': () => true }, editable: false },
    // { field: 'quantity', headerName: 'Qty', editable: false },
    // { field: 'price', headerName: 'Harga' },
    // { field: 'total', headerName: 'Jumlah' },
    // // { field: 'status', headerName: 'Status', editable: false },
    // { field: 'notes'},
    // { field: 'reference'},

    // { field: 'confirm', headerName: 'Konfirmasi', headerCheckboxSelection: true, checkboxSelection: true, editable: false },
  ],
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
};

  // const rowData = [
  //   { id: '11C7D', tanggal: '10-2-22', COA: '1-0000', kategori: 'Trip', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' , status: 'Waiting' },
  //   { id: '11C7C', tanggal: '10-2-22', COA: '1-1000', kategori: 'Meeting', Keterangan: 'Lorem Ipsum', amount: 10000000, type: 'Event' , status: 'Approved', confirm: true },
  //   { id: '11C7B', tanggal: '10-2-22', COA: '2-1001', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 3250000, type: 'Monthly', status: 'Rejected' },
  //   { id: '11C7A', tanggal: '9-2-22', COA: '2-2000', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' },
  //   { id: '11C7D', tanggal: '10-2-22', COA: '3-4001', kategori: 'Trip', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' },
  //   { id: '11C7C', tanggal: '10-2-22', COA: '3-5000', kategori: 'Meeting', Keterangan: 'Lorem Ipsum', amount: 10000000, type: 'Weekly' },
  //   { id: '11C7B', tanggal: '10-2-22', COA: '4-1000', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 3250000, type: 'Monthly' },
  //   { id: '11C7A', tanggal: '9-2-22', COA: '4-2000', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' }
  // ];


  const defaultColDef = {
    flex: 1,
    sortable: true,
  }

//   const gridOptions = {
//     // domLayout: 'autoHeight' as DomLayoutType,
//     pagination: true,
//     paginationPageSize: 4,
//     rowHeight: 40,
//     onSelectionChanged: handleSelectionChanged,
//     onCellEditingStopped: (event) => {
//       // Periksa apakah sel yang diedit adalah 'amount' dan baris sudah dikonfirmasi
//       if (event.column.getColId() === 'amount' && event.data.confirm) {
//         // Reset nilai ke nilai asli
//         event.api.applyTransaction({ update: [{ ...event.data }] });
//       }
//     },
//   }

  return (
    <div style={{ "justify-content": "center", "margin-top":"30px" }}>
      <h1 style={{ "font-size": "18px", "text-align":"left","margin-bottom":"5px"}}>Detail Pengajuan Weekly</h1>
      <div class="ag-theme-alpine" style={{ width: '141vh', height: '21vw', margin: "auto" }}>
        <AgGridSolid
        //   columnDefs={columnDefs}
          rowData={RowData()}
        //   onCellClicked={onCellClicked}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          rowSelection="multiple"
          rowMultiSelectWithClick={true}
        />
      </div>
      {/* {popUpOpen() && <FormConfirm data={popupData()} confirm={confirmationStatus()} OnClose={ClosePopUp} />} */}
    </div>
  );
};

export default TablePengajuanDetailWeekly;

