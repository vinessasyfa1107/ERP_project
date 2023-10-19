import { createSignal, type Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning.css';
import { Icon } from '@iconify-icon/solid';
import FormApproved from '../form/form-confirm';


const TableDetailPlan: Component = () => {

  const [popUpApproved, setpopUpApproved] = createSignal(false);

  function handlePopUpApproved () {
      setpopUpApproved(!popUpApproved());
  }

  function ClosePopUp () {
    setpopUpApproved (false);
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
    
      if (params.data.status === 'Waiting') {
        check = <Icon icon="ic:round-square" class="icon-disabled" width="21" height="21" />  ;
      } else if (params.data.status === 'Approved') {
        check = <button class="btn-approved" onClick={handlePopUpApproved}><Icon icon="icomoon-free:checkbox-checked" color="#7bc582" width="16.1" height="16.1" /></button>;
      } else if (params.data.status === 'Rejected') {
        check = <Icon icon="mdi:close-box" class="icon-rejected" width="21.5" height="21.5"/>;
      }
    
      return check;
    };

    const columnDefs = [
        { field: 'id' , headerName: 'ID'}, // Menambahkan filter pada kolom "make"
        { field: 'tanggal' }, // Menambahkan filter pada kolom "model"
        { field: 'deskripsi' },
        { field: 'kategori'  }, 
        { field: 'jenis', cellStyle: getCellStyle, cellClassRules: { 'bold-type': () => true } },
        { field: 'jumlah' }, // Menambahkan filter pada kolom "price"
        { field: 'status' },
        { field: 'konfirmasi' ,  cellRenderer: confirmCellRenderer},
      ];
    
      const rowData = [
        { id: '11C7D', tanggal: '10-2-22', kategori: 'Trip', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' , status: 'Waiting' },
        { id: '11C7C', tanggal: '10-2-22', kategori: 'Meeting', Keterangan: 'Lorem Ipsum', amount: 10000000, type: 'Event' , status: 'Approved', confirm: true },
        { id: '11C7B', tanggal: '10-2-22', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 3250000, type: 'Monthly', status: 'Rejected' },
        { id: '11C7A', tanggal: '9-2-22', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' },
        { id: '11C7D', tanggal: '10-2-22', kategori: 'Trip', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' },
        { id: '11C7C', tanggal: '10-2-22', kategori: 'Meeting', Keterangan: 'Lorem Ipsum', amount: 10000000, type: 'Weekly' },
        { id: '11C7B', tanggal: '10-2-22', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 3250000, type: 'Monthly' },
        { id: '11C7A', tanggal: '9-2-22', kategori: 'Requisite', Keterangan: 'Lorem Ipsum', amount: 2000000, type: 'Weekly' }
      ];
    
    
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
    <div>
        <div class="ag-theme-alpine" style={{width:'140vh', height:'21vw'}}>
        <AgGridSolid
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
        />
        {popUpApproved() && (<FormApproved OnClose={ClosePopUp}/>)}
      </div>
    </div>
  );
};

export default TableDetailPlan;
