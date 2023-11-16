import { createSignal, type Component, onMount, createEffect } from 'solid-js';
import './pengajuan-weekly.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation, useNavigate } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { DataMonthlyPlanning } from '../../../../api/planning/data-monthly-plan';

export interface PengajuanWeeklyProps {
    OnClose?: () => void;
    total?: number,
    total2?: number,
    total3?: number,
    total4?: number,
    total5?: number
    pengajuanweekly?: string,
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

    const [backendData, setBackendData] = createSignal([{}]);

    // ...

// onMount(async () => {
//     try {
//       const backendData = await DataMonthlyPlanning("data monthplan");
//       console.log("monthplan: ", backendData);
//       setBackendData(backendData);
  
//       // Get keterangan values from local storage
//       const savedData = localStorage.getItem('tableKetWeekly');
//       const localData = savedData ? JSON.parse(savedData) : [];
  
//       // Calculate aggregated data based on keterangan from local storage and backend data
//       const aggregatedData = localData.map((localItem) => {
//         const total = backendData
//           .filter((backendItem) => backendItem.keterangan === localItem.keterangan)
//           .reduce((sum, item) => sum + item.total, 0);
  
//         return { keterangan: localItem.keterangan, totalplan: total };
//       });
  
//       setRowData(aggregatedData);
//     } catch (error) {
//       console.error('Error fetching data from backend:', error);
//     }
//   });
  
  // ...
  
    
    const [pageKeterangan, setPageKeterangan] = createSignal(false);

    function showPageKeterangan(){
        setPageKeterangan(true);
    };
    const [showTambahNamaPengajuan, setShowTambahNamaPengajuan] = createSignal(true);



    const submitForm = () => {
        // Perform form submission logic here
        // ...
        
        // After successful submission, hide the "tambah-nama-pengajuan" div
        setPageKeterangan(true);
        setShowTambahNamaPengajuan(false);

    };

    const [keterangan, setKeterangan] = createSignal("");
    const [allTotal, setAllTotal] = createSignal(0);


    function clearKeterangan(keteranganToRemove) {
        // Filter rowData untuk menghapus baris dengan keterangan yang sesuai
        const updatedData = rowData().filter(item => item.keterangan !== keteranganToRemove);
      
        // Perbarui rowData dengan data yang telah diperbarui
        setRowData(updatedData);
      
        // Simpan data yang telah diperbarui ke localStorage
        localStorage.setItem('tableKetWeekly', JSON.stringify(updatedData));
    }
      
    const gridOptions = {
        columnDefs: [
            { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 70 },
            { field: "keterangan", width: 350},
            { field: "totalplan", headerName:"Total", width: 97},
            { field: "aksi", headerName:"", width: 80, 
            cellRenderer: (params: any) => {
                return (
                  <div style={{ "margin-top": "1vh", display: "flex", "justify-content": "space-between", width: "9vh" }}>
                    <button><Icon icon="iconamoon:edit" color="#40444b" width="18" height="18" /></button>
                    <button onClick={() => clearKeterangan(params.data.keterangan)}><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
                  </div>
                );
              }
            }
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
            // alert('klik');
            props.OnClose();
            // Use router navigation here
            navigate('/pengajuan-weekly/pengajuanweekly-insentif');
        }
    };


    //   const calculateTotalByKeterangan = (keterangan, backendData) => {
    //     const filteredData = backendData.filter(item => item.keterangan === keterangan);
    //     const total = filteredData.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    //     return total;
    //   };
      
      
    //   const addRow = () => {
    //     if (keterangan()) {
    //         const total = calculateTotalByKeterangan(keterangan(), backendData());

    //       const newRow: RowData = {
    //         keterangan: keterangan(),
    //         totalplan: total
    //       };
      
    //       setRowData((prevData) => {
    //         const newData = [...prevData, newRow];
    //         // Simpan data ke localStorage saat menambahkan data baru
    //         localStorage.setItem('tableKetWeekly', JSON.stringify(newData));
    //         return newData;
    //       });

    //       setAllTotal((prevTotal) => prevTotal + total);

    //       clearInputs();
    //     }
    //   };
    const calculateTotalByKeterangan = (keterangan, backendData) => {
        const filteredData = backendData.filter(item => item.keterangan === keterangan);
        const total = filteredData.reduce((accumulator, currentValue) => accumulator + currentValue.total2, 0);
        return total;
      };

    const calculateAllTotal = () => {
        const totalall = rowData().reduce((accumulator, currentValue) => accumulator + currentValue.totalplan, 0);
        console.log("hasil total", totalall);
        setAllTotal(totalall);
      };
      
      const addRow = () => {
        if (keterangan()) {
          const total = calculateTotalByKeterangan(keterangan(), backendData);
      
          const newRow: RowData = {
            keterangan: keterangan(),
            totalplan: total
          };
      
          setRowData((prevData) => {
            const newData = [...prevData, newRow];
            // Simpan data ke localStorage saat menambahkan data baru
            localStorage.setItem('tableKetWeekly', JSON.stringify(newData));
            // calculateAllTotal();
            return newData;
          });
      
          setAllTotal((prevTotal) => prevTotal + total);
      
          clearInputs();
        }
      };
      createEffect(() => {
        calculateAllTotal();
      });
      
    const addRow1 = () => {
    if (keterangan()) {
        // const total = qty() * price();
        const newRow: RowData = {
        keterangan: keterangan()
        };
        setRowData((prevData) => {
        const newData = [...prevData, newRow];
        // Simpan data ke localStorage saat menambahkan data baru
        localStorage.setItem('tableKetWeekly', JSON.stringify(newData));
        // calculateAllTotal();
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
                <div class="judul-pengajuan-weekly">
                    <h1>Form Pengajuan Weekly</h1>
                    <p>{props.pengajuanweekly}</p>
                    </div>
                    {tambahKeterangan() && 
                    <div class="tambah-keterangan-group-weekly">
                        <div>
                        <br />
                        <input 
                        type="text"
                        placeholder="Keterangan"
                        value={keterangan()}
                        onInput={(e) => setKeterangan(e.target.value)}
                        />
                </div>
                    <div>
                        <button class="btn-tambah-weekly" onClick={addRow1}>Tambah</button>
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
