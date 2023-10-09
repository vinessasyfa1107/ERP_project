import { createSignal, type Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Icon } from '@iconify-icon/solid';
import './table-master-akun.css'
import EditAkunMaster from './forms/edit-akun-master';

const TableAkunMaster: Component = () => {

    const [isEditPopupOpen, setIsEditPopupOpen] = createSignal(false);
  
    const [editedData, setEditedData] = createSignal(null);
  
    const showEditPopup = (rowData: any) => {
      setEditedData(rowData);
      setIsEditPopupOpen(!isEditPopupOpen());
    };
  
    function CloseEditPopUp () {
      setIsEditPopupOpen (false);
    }

    const columnDefs = [
        { field: 'nama'},
        { field: 'email', headerName: 'Kode Akun'},
        { field: 'akses', headerName: 'Nama COA'},
        { field: 'posisi'},
        { field: 'kategori'},
        { field: 'aksi', cellRenderer: (params: any) => {
            return (
              <div style={{"margin-top": "8px", display:"flex", "justify-content":"space-between", width:"50px"}}>
                <button onClick={() => showEditPopup(params.data)}><Icon icon="iconamoon:edit" color="#40444b" width="18" height="18" /></button>
                <button><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
              </div>
            );
          }}
      ];

      //onClick={() => showEditPopup(params.data)}
    
      const rowData = [
       { nama: '', email: '', akses: '', posisi: '', kategori: '' }
      ];
    
    
      const defaultColDef = {
        flex: 1,
        sortable: true,
      }
    
      const gridOptions = {
        pagination: true,
        paginationPageSize: 10,
        rowHeight: 33
      }
  return (
    <div>
        <div class="ag-theme-alpine" style={{width:'145vh', height:'30vw',margin:"auto"}}>
            <AgGridSolid
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                gridOptions={gridOptions}
            />
      </div>
      {isEditPopupOpen() && (<EditAkunMaster OnClose={CloseEditPopUp}/>)}
    </div>
  );
};

export default TableAkunMaster;
