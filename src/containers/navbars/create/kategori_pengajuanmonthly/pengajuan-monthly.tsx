import { createSignal, type Component, onMount } from 'solid-js';
import './pengajuan-monthly.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
interface PengajuanMonthlyProps {
    OnClose: () => void;
    total: number,
    total2: number,
    total3: number,
    total4: number,
    total5: number
}

type RowData = {
    keterangan: string;
    totalplan?: number;
  };

const PengajuanMonthly: Component<PengajuanMonthlyProps> = (props) => {

    const [gridApi, setGridApi] = createSignal(null);
    const [rowData, setRowData] = createSignal<RowData[]>(
        (() => {
          // Coba ambil data dari localStorage saat komponen diinisialisasi
          const savedData = localStorage.getItem('tableKetMonth');
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
    
    const addRow = () => {
    if (keterangan()) {
        // const total = qty() * price();
        const newRow: RowData = {
        keterangan: keterangan()
        };
        setRowData((prevData) => {
        const newData = [...prevData, newRow];
        // Simpan data ke localStorage saat menambahkan data baru
        localStorage.setItem('tableKetMonth', JSON.stringify(newData));
        return newData;
        });
        clearInputs();
    }};

    const clearInputs = () => {
        setKeterangan("")
    };


  const location = useLocation();

  return (
    <div class="overlay">
      
      <div class="pengajuan-monthly-1">
        <div class="keterangan">
            <h2>Monthly  <span>(*Tidak boleh kosong)</span></h2>
            <button onClick={props.OnClose}>✕</button>
        </div>
        <div class="pengajuan-monthly">
            <div>
            <div>
                <label>Kebutuhan</label>
                <br />
                <input style={{width:"14vw"}}
                type="text"
                placeholder="Kebutuhan"
                value={keterangan()}
                onInput={(e) => setKeterangan(e.target.value)}
                />
            </div>
            <div>
                <button onClick={addRow}>Tambah</button>
            </div>
            </div>
            <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "80vh", margin:"auto" }}>
            <AgGridSolid 
                gridOptions={gridOptions} 
                onGridReady={onGridReady} 
                rowData={rowData()} 
            />
            {/* <div class="detail-total-operasional">
                <div>TOTAL</div>
                <div>Rp{calculateTotal()}</div>
            </div> */}
            </div>
            <div>
                <A href='/pengajuan-monthly/operasional-rutin-tamanhas' onClick={props.OnClose}>Tambah Pengajuan</A>
            </div>
        </div>
    </div>
    </div>
  );
};

export default PengajuanMonthly;
