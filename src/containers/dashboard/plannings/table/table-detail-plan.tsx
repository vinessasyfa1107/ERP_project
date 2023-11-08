import { createSignal, type Component, onMount, onCleanup } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning.css';
import { Icon } from '@iconify-icon/solid';
import FormPlanning from '../form/form-planning';
import { dataplanning } from '../../../../api/planning/dataplanning';

const TableDetailPlan: Component = () => {

  const [RowData, setRowData] = createSignal([{}]);
  const [updatedData, setUpdatedData] = createSignal([]);

  onMount(async () => {
    const data_planning = await dataplanning("data planning dashboard dan modul pengajuan");
    console.log("dataplanning", data_planning);
    setRowData(data_planning)
  })

  function handleConfirmChange(params) {
    const data = params.data;

    if (data.status === 'Approved' && data.confirm) {
      const updatedDataArray = updatedData();
      const updatedDataIndex = updatedDataArray.findIndex((item) => item.id === data.id);

      if (updatedDataIndex === -1) {
        updatedDataArray.push({ ...data });
        setUpdatedData(updatedDataArray);

        // Kirim data yang diperbarui ke backend
        sendUpdatedDataToBackend(updatedDataArray);
      }
    }
  }

  async function sendUpdatedDataToBackend(updatedDataArray) {
    console.log("julpa", updatedDataArray);
    try {
      const response = await fetch('/api/planning/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDataArray),
      });

      if (response.ok) {
        console.log('Data terkirim ke backend:', updatedDataArray);
      } else {
        console.error('Gagal mengirim data ke backend:', response.statusText);
      }
    } catch (error) {
      console.error('Gagal mengirim data ke backend:', error);
    }
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


  const columnDefs = [
    { field: 'id', headerName: 'ID' },
    { field: 'entry_ts', headerName: 'Tanggal' },
    { field: 'coa_kd', headerName: 'COA' },
    { field: 'description', headerName: 'Keterangan' },
    { field: 'planningtype', cellStyle: getCellStyle, headerName: 'Kategori', cellClassRules: { 'bold-type': () => true } },
    { field: 'category', headerName: 'Jenis' },
    { field: 'amount', headerName: 'Jumlah' },
    { field: 'status', headerName: 'Status' },
    { field: 'confirm', headerName: 'Konfirmasi', headerCheckboxSelection: true, checkboxSelection: true, onCellValueChanged: handleConfirmChange },


  ];

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

  const gridOptions = {
    // domLayout: 'autoHeight' as DomLayoutType,
    pagination: true,
    paginationPageSize: 4,
    rowHeight: 40
  }



  return (
    <div style={{ "justify-content": "center" }}>
      <div class="ag-theme-alpine" style={{ width: '141vh', height: '21vw', margin: "auto" }}>
        <AgGridSolid
          columnDefs={columnDefs}
          rowData={RowData()}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          rowSelection="multiple"
          rowMultiSelectWithClick={true}
        />

      </div>
    </div>
  );
};

export default TableDetailPlan;
