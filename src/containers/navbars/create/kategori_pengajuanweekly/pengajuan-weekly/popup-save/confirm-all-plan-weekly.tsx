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

        return savedData
            ? JSON.parse(savedData).map((row, index) => ({
                ...row,
                // uniqueId: index,
                entry_ts, // Tambahkan properti timestamp ke setiap objek
            })) as RowData[]
            : ([] as RowData[]);
    })()
);

  const localStorageKey = "tableAllPengajuan"; // Nama kunci local storage yang baru


  // Menyimpan data ke local storage setiap kali originalRowData berubah
  const updateLocalStorage = () => {
    const serializedData = JSON.stringify(originalRowDataW());
    localStorage.setItem(localStorageKey, serializedData);
  };

  // Fungsi untuk mengirim data ke backend
  const SubmitData = () => {
    // Lakukan logika pengiriman data ke backend di sini
    // ...

    // Setelah logika pengiriman selesai, panggil updateLocalStorage untuk menyimpan data ke local storage
    updateLocalStorage();
  };



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
  console.log("data all monthly ke BE, ", originalRowDataW());


  const sendDataToBackend = async () => {
    console.log("data all monthly ke BE, ", originalRowDataW());
    // localStorage.removeItem('tableData');
    // localStorage.removeItem('tableKetMonth');
    // localStorage.removeItem('namaPengajuanMonthly');
    try {
      const response = await fetch('/api/monthlypengajuan/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(originalRowDataW()),
      });
  
      if (!response.ok) {
        throw new Error('Gagal mengirim data ke backend');
      }
  
      const responseData = await response.json();
      console.log('Response dari backend:', responseData);
  
      // Tambahkan logika atau penanganan lain jika diperlukan
      if (responseData.success) {
        // Data berhasil dikirim, lakukan sesuatu
        console.log('Data berhasil dikirim ke backend');
        props.OnClose();
        // localStorage.removeItem('tableData');
        // localStorage.removeItem('tableKetMonth');
        // localStorage.removeItem('namaPengajuanMonthly');
        // Tambahkan logika atau tindakan lain yang diperlukan setelah pengiriman berhasil
      } else {
        // Gagal karena logika bisnis di backend, tampilkan pesan kesalahan atau lakukan tindakan yang sesuai
        console.error('Gagal mengirim data ke backend:', responseData.error);
        // Tambahkan logika atau tindakan lain yang diperlukan setelah pengiriman gagal
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Tambahkan penanganan kesalahan jika diperlukan
    }
  };
  

      

  return (
      <div class="overlay">


      <div class="confirm-allplan-m">
       
        <div class="monthly-plan-confirmation">
            <form method="dialog">
                <div class="head-acc" style={{"text-transform":"capitalize"}}>
                    <h2>Apa anda yakin ingin submit data di bawah ini?</h2>
                    <button onClick={props.OnClose}>✕</button>
                </div>
                <div class="form-pengajuan">
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
                        <button class="btn-save-edit" onClick={SubmitData}>
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

function originalRowDataW(): any {
  throw new Error('Function not implemented.');
}
