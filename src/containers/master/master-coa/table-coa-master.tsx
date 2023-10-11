import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Icon } from '@iconify-icon/solid';
import FormEditAkun from './forms/form-edit-akun';
import './table-coa-master.css'
import FormTambahCOA from './forms/form-tambah-coa';
import { datacoamaster } from '../../../api/master/data-coa-master';

const TabelCOAMaster: Component = () => {

    const [isEditPopupOpen, setIsEditPopupOpen] = createSignal(false);
  
    const [RowData, setRowData] = createSignal([{"id":1}]);

    onMount(async () => {
      const data_coa = await datacoamaster("data coa master");
      console.log("datacoa", data_coa);
      setRowData(data_coa)
    })

    const [editedData, setEditedData] = createSignal(null);
  
    const showEditPopup = (rowData: any) => {
      setEditedData(rowData);
      setIsEditPopupOpen(!isEditPopupOpen());
    };
  
    function CloseEditPopUp () {
      setIsEditPopupOpen (false);
    }

    const columnDefs = [
        { field: 'id', headerName: 'ID'},
        { field: 'coa_kd', headerName: 'Kode Akun'},
        { field: 'coa_name', headerName: 'Nama COA'},
        { field: 'category'},
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
       { ID: '', kd_akun: '', coa_name: '', kategori: '' }
      ];
    
    
      const defaultColDef = {
        flex: 1,
        sortable: true,
      }
    
      const gridOptions = {
        pagination: true,
        paginationPageSize: 7,
        rowHeight: 33
      }
  return (
    <div>
        <div class="ag-theme-alpine" style={{width:'140vh', height:'24vw',margin:"auto"}}>
            <AgGridSolid
                columnDefs={columnDefs}
                rowData={RowData()}
                defaultColDef={defaultColDef}
                gridOptions={gridOptions}
            />
      </div>
      <div>
      <FormTambahCOA/>
      </div>
      {isEditPopupOpen() && (<FormEditAkun OnClose={CloseEditPopUp}/>)}
    </div>
  );
};

export default TabelCOAMaster;
