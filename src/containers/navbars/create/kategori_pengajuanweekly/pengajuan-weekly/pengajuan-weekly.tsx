import { createSignal, type Component, onMount } from 'solid-js';
import './pengajuan-weekly.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation, useNavigate } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface PengajuanWeeklyProps {
    OnClose: () => void;
    total?: number,
    total2?: number,
    total3?: number,
    total4?: number,
    total5?: number
}

type RowData = {
    keterangan: string;
    totalplan?: number;
  };

const PengajuanWeekly: Component<PengajuanWeeklyProps> = (props) => {

    const [gridApi, setGridApi] = createSignal(null);
    const [rowData, setRowData] = createSignal<RowData[]>(
        (() => {
          // Coba ambil data dari localStorage saat komponen diinisialisasi
          const savedData = localStorage.getItem('tableKetWeekly');
          return savedData ? JSON.parse(savedData) : ([] as RowData[]);
        })()
      );

    const [keterangan, setKeterangan] = createSignal("");
    const [totalplan, setTotalplan] = createSignal(0);

    const gridOptions = {
        columnDefs: [
            { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 70 },
            { field: "keterangan", width: 350},
            { field: "totalplan", headerName:"Total", width: 97}
        ]
    };

    const onGridReady = (params: any) => {
        setGridApi(() => params.api);
      };

    const navigate = useNavigate();

    const onCellClicked = (event: any) => {
        if (event.columnApi.getColumn(event.column.colId).getColId() === 'keterangan') {
            // Assuming 'keterangan' is the column containing the link
            // Redirect to the specified URL when the 'keterangan' column is clicked
            // You can adjust this logic based on your column configuration
            props.OnClose();
            // Use router navigation here
            navigate('/pengajuan-weekly/pengajuanweekly-insentif');
            // C:\Users\user2022\OneDrive\Documents\belajar-solid-dua\fe-new-erp\src\containers\navbars\create\kategori_pengajuanweekly\penguanweekly-rutin\pengajuanweekly-insentif\pengajuanweekly-insentif.tsx
        }
    };
    
    const addRow = () => {
    if (keterangan()) {
        // const total = qty() * price();
        const newRow: RowData = {
        keterangan: keterangan()
        };
        setRowData((prevData) => {
        const newData = [...prevData, newRow];
        // Simpan data ke localStorage saat menambahkan data baru
        localStorage.setItem('tableKetWeekly', JSON.stringify(newData));
        return newData;
        });
        clearInputs();
    }};

    const clearInputs = () => {
        setKeterangan("")
    };


    const [tambahKeterangan, setTambahKeterangan] = createSignal(false);

    function showTambahKeterangan(){
        setTambahKeterangan(true);
    };

    function closeTambahKeterangan(){
        setTambahKeterangan(false);
    };


  const location = useLocation();

  return (
    <div class="overlay">
      
      <div class="pengajuan-weekly-1">
        <div class="keterangan">
            <h2>Weekly  <span>(*Tidak boleh kosong)</span></h2>
            <button onClick={props.OnClose}>✕</button>
        </div>
        <div class="pengajuan-weekly" >
            <div>
                {tambahKeterangan() && 
                <div class="tambah-keterangan-group-weekly">
                    <div>
                    {/* <label>Kebutuhan</label> */}
                    <br />
                    <input 
                    type="text"
                    placeholder="Keterangan"
                    value={keterangan()}
                    onInput={(e) => setKeterangan(e.target.value)}
                    />
                    </div>
                    <div>
                        <button class="btn-tambah-weekly" onClick={addRow}>Tambah</button>
                    </div>
                    <div>
                        <button class="btn-cancel-weekly" onClick={closeTambahKeterangan}>Selesai</button>
                    </div>
                </div>
                }
            
            <div class="btn-show-keterangan-weekly">
                {!tambahKeterangan() && 
                  <button onClick={showTambahKeterangan}><Icon icon="fa-solid:plus" width="11" class="mr-2"/>Keterangan</button>
                }
            </div>
            </div>
            <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "80vh", margin:"auto" }}>
            <AgGridSolid 
                gridOptions={gridOptions} 
                onGridReady={onGridReady} 
                rowData={rowData()} 
                onCellClicked={onCellClicked}
            />
            <div class="detail-total-operasional">
                <div>TOTAL</div>
                <div>Rp</div>
            </div>
            </div>
            {/* <div>
                <A href='/pengajuan-monthly/operasional-rutin-tamanhas' onClick={props.OnClose}>Tambah Pengajuan</A>
            </div> */}
        </div>
    </div>
    </div>
  );
};

export default PengajuanWeekly;
