import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './confirm-all-plan-weekly.css'
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { RowData } from '../../penguanweekly-rutin/pengajuanweekly-insentif/pengajuanweekly-insentif';
import { getNamaPengajuanWeekly } from '../../../../../../store/Pengajuan/nama-pengajuan';

interface ConfirmAllPlanWeeklyProps {
  OnClose: () => void;
  pengajuanweekly: string;
  sumtotalweekly: string;
  date: string;
}

interface AggregatedRowData {
  keterangan: string;
  total: number;
}

interface NewRowData {
  pengajuan: {
    id: number;
    coa_kd: string;
    entry_ts: string;
    tipepengajuanweekly: string;
    status: string;
    namapengajuanweekly?: string;
  };
  details: {
    pengajuan_id: number;
    keterangan: string;
    kebutuhan: string;
    quantity: number;
    uom: string;
    price: number;
    total: number;
    namapengajuanweekly?: string;
  }[];
}



const ConfirmAllPlanWeekly: Component<ConfirmAllPlanWeeklyProps> = (props) => {

  // const [originalRowData, setOriginalRowData] = createSignal<RowData[]>(
  //     (() => {
  //       const savedData = localStorage.getItem('tableData');
  //       return savedData
  //         ? JSON.parse(savedData).map((row, index) => ({ ...row, uniqueId: index })) as RowData[]
  //         : ([] as RowData[]);
  //     })()
  //   );
  const [originalRowDataW, setOriginalRowData] = createSignal<RowData[]>(
    (() => {
        const savedData = localStorage.getItem('tableDataWeekly');
        const entry_ts = props.date; // Ambil nilai timestamp dari props
        const status = "Waiting";
        const pengajuan_id = 0;

        return savedData
            ? JSON.parse(savedData).map((row, index) => ({
                ...row,
                // uniqueId: index,
                entry_ts, 
                status, 
                pengajuan_id 
            })) as RowData[]
            : ([] as RowData[]);
    })()
);

     // Fungsi untuk mengonversi originalRowData ke NewRowData
  function convertRowData(originalRowData): NewRowData | null {
    const uniquePengajuan: Record<string, NewRowData> = {};
  
    originalRowData.forEach((rowData) => {
      const key = `${rowData.id}_${rowData.coa_kd}_${rowData.entry_ts}_${rowData.tipepengajuan}`;
  
      if (!uniquePengajuan[key]) {
        uniquePengajuan[key] = {
          pengajuan: {
            id: rowData.id,
            coa_kd: rowData.coa_kd,
            entry_ts: rowData.entry_ts,
            tipepengajuanweekly: rowData.tipepengajuan,
            status: rowData.status,
            namapengajuanweekly: rowData.namapengajuan,
          },
          details: [],
        };
      }
  
      uniquePengajuan[key].details.push({
        pengajuan_id: rowData.pengajuan_id,
        keterangan: rowData.keterangan,
        kebutuhan: rowData.kebutuhan,
        quantity: rowData.quantity,
        uom: rowData.uom,
        price: rowData.price,
        total: rowData.total,
        namapengajuanweekly: rowData.namapengajuanweekly,
      });
    });
  
    const result = Object.values(uniquePengajuan);
    return result.length > 0 ? result[0] : null;
  }
  
  
  // Contoh penggunaan dalam konversi data
  const newStructuredData = convertRowData(originalRowDataW());
  
  console.log("struktur", newStructuredData)





  // const localStorageKey = "tableAllPengajuan"; // Nama kunci local storage yang baru


  // // Menyimpan data ke local storage setiap kali originalRowData berubah
  // const updateLocalStorage = () => {
  //   const serializedData = JSON.stringify(originalRowDataW());
  //   localStorage.setItem(localStorageKey, serializedData);
  // };

  // // Fungsi untuk mengirim data ke backend
  // const SubmitData = () => {
  //   // Lakukan logika pengiriman data ke backend di sini
  //   // ...

  //   // Setelah logika pengiriman selesai, panggil updateLocalStorage untuk menyimpan data ke local storage
  //   updateLocalStorage();
  // };



  const [gridApi, setGridApi] = createSignal(null);
  const [aggregatedRowData, setAggregatedRowData] = createSignal<AggregatedRowData[]>([]);

  const onGridReady = (params: any) => {
      setGridApi(() => params.api);
    };


    const calculateAggregates = (data: RowData[]): AggregatedRowData[] => {
      const aggregatedData: { [key: string]: AggregatedRowData } = {};
    
      // Loop through each item in the data
      data.forEach((row) => {
        const keterangan = row.keterangan;
    
        // Check if keterangan already exists in aggregatedData
        if (!aggregatedData[keterangan]) {
          aggregatedData[keterangan] = {
            keterangan,
            total: 0,
          };
        }
    
        // Add value to the total
        aggregatedData[keterangan].total += row.total; // Adjust according to the relevant property
      });
    
      // Convert the aggregate object to an array
      const result = Object.values(aggregatedData);
      return result;
    };

    const transformDataForGrid = (data: AggregatedRowData[]): any[] => {
      // Mengonversi AggregatedRowData ke format yang diharapkan oleh AgGridSolid
      return data.map((row) => ({
        keterangan: row.keterangan,
        total: row.total,
      }));
    };
    
  //   const updatedRowData = calculateAggregates(originalRowData());
  //     setAggregatedRowData(() => updatedRowData);
  const updatedRowData = calculateAggregates(originalRowDataW());
  setAggregatedRowData(() => updatedRowData);

  // Mengonversi data agar sesuai dengan format AgGridSolid
  const rowDataForGrid = transformDataForGrid(aggregatedRowData());
  
  const gridOptions = {
    domLayout: 'autoHeight' as 'autoHeight',            
    columnDefs: [
          { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 70 },
          { field: "keterangan", width: 350},
          { field: "total", headerName:"Total", width: 97},
      ],
      
  };

  console.log("tes", transformDataForGrid(aggregatedRowData()))
  console.log("data all weekly ke BE, ", originalRowDataW());

  console.log("struktur baru", newStructuredData)

  const sendDataToBackend = async () => {
    console.log("data all weekly ke BE, ", originalRowDataW());
    console.log("struktur baru", newStructuredData)
    // localStorage.removeItem('tableData');
    // localStorage.removeItem('tableKetMonth');
    // localStorage.removeItem('namaPengajuanMonthly');
    try {
      const response = await fetch('/api/mweeklypengajuan/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(originalRowDataW()),
      });
  
      if (response.ok) {
        alert('Data berhasil dikirim ke backend');
        console.log('Data berhasil dikirim ke backend');
        props.OnClose();
        localStorage.removeItem('tableData');
        localStorage.removeItem('tableKetMonth');
        localStorage.removeItem('namaPengajuanMonthly');
      } else {
          const errorMessage = await response.text();
          alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
          console.error('Gagal mengubah data:', errorMessage);
      }

    } catch (error) {
      console.error('Error:', error.message);
      // Tambahkan penanganan kesalahan jika diperlukan
    }
  };

  return (
      <div class="overlay">


      <div class="confirm-allplan-weekly">
       
        <div class="weekly-plan-confirmation">
            <form method="dialog">
                <div class="head-acc-weekly" style={{"text-transform":"capitalize"}}>
                    <h2>Apa anda yakin ingin submit data di bawah ini?</h2>
                    <button onClick={props.OnClose}>✕</button>
                </div>
                <div class="form-pengajuan-weekly">
                    <div>
                        <h1>{getNamaPengajuanWeekly()}</h1>
                        <h2>No : 058/FIN.BC/PDO/VI/2023</h2>
                        <p>{props.date}</p>
                        {/* <p>Aggregated Description: {updatedRowData[updatedRowData.length - 1].aggregatedDescription}</p> */}
                    </div>
                    <div class="ag-theme-alpine z-0" style={{ height: "auto", width: "80vh", margin:"auto"}}>
                        <AgGridSolid 
                            gridOptions={gridOptions} 
                            onGridReady={onGridReady} 
                            rowData={rowDataForGrid} 
                        />
                    </div>
                    <div class="sum-total" style={{display:"flex", "flex-direction":"row", "justify-content":"space-between"}}>
                      <p>TOTAL ESTIMASI</p> <p>{props.sumtotalweekly}</p>
                    </div>
                    </div>

                    <br />
                    <div>
                      <div>
                        <button class="btn-save-edit-weekly" onClick={sendDataToBackend}>
                          <Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" />
                        </button>
                      </div>
                    </div>
            </form>
        </div>
      </div>
      </div>
  );
};


export default ConfirmAllPlanWeekly;

// function originalRowDataW(): any {
//   throw new Error('Function not implemented.');
// }
