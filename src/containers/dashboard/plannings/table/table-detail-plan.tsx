import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning.css';
import { Icon } from '@iconify-icon/solid';
import FormApproved from '../form/form-confirm';
import { dataplanning } from '../../../../api/planning/dataplanning';

const TableDetailPlan: Component = () => {

  const [RowData, setRowData] = createSignal([{}]);

  onMount(async () => {
    const data_planning = await dataplanning("data planning dashboard dan modul pengajuan");
    console.log("dataplanning", data_planning);
    setRowData(data_planning)
  })

  const [popUpApproved, setpopUpApproved] = createSignal(false);

  function handlePopUpApproved() {
    setpopUpApproved(!popUpApproved());
  }

  function ClosePopUp() {
    setpopUpApproved(false);
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

  const confirmCellRenderer = (params: { data: any }) => {
    let check = null;

    if (params.data.status === 'InProgress') {
      check = <Icon icon="ic:round-square" class="icon-disabled" width="21" height="21" />;
    } else if (params.data.status === 'Approved') {
      check = <button class="btn-approved" onClick={handlePopUpApproved}><Icon icon="icomoon-free:checkbox-checked" color="#7bc582" width="16.1" height="16.1" /></button>;
    } else if (params.data.status === 'Rejected') {
      check = <Icon icon="mdi:close-box" class="icon-rejected" width="21.5" height="21.5" />;
    } else if (params.data.status === 'Waiting') {
      check = <Icon icon="ic:round-square" class="icon-disabled" width="21" height="21" />;
    }

    return check;
  };

  const columnDefs = [
    { field: 'id', headerName: 'ID' },
    { field: 'entry_ts', headerName: 'Tanggal' }, 
    { field: 'coa_kd', headerName: 'COA' },
    { field: 'description', headerName: 'Keterangan' },
    { field: 'planningtype', cellStyle: getCellStyle, headerName: 'Kategori',  cellClassRules: { 'bold-type': () => true } },
    { field: 'category', headerName: 'Jenis'},
    { field: 'amount', headerName: 'Jumlah' },
    { field: 'status', headerName: 'Status' },
    { field: 'confirm', headerName: 'Konfirmasi', cellRenderer: confirmCellRenderer }

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
    <div style={{"justify-content":"center"}}>
      <div class="ag-theme-alpine" style={{ width: '141vh', height: '21vw', margin:"auto"}}>
        <AgGridSolid
          columnDefs={columnDefs}
          rowData={RowData()}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
        />
        {popUpApproved() && (<FormApproved OnClose={ClosePopUp} />)}
      </div>
    </div>
  );
};

export default TableDetailPlan;
