
import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './confirm-all-event.css'
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { RowData } from '../pengajuan-event/pengajuan-event-detail';
import { getNamaPengajuanEvent } from '../../../../../../store/Pengajuan/nama-pengajuan';

interface ConfirmAllEventProps {
    OnClose: () => void;
    pengajuanevent?: string;
    sumtotal?: string;
    date?: string;
}

interface AggregatedRowData {
    keterangan: string;
    total: number;
  }

interface NewRowData {
  pengajuanevent: {
    id: number;
    coa_kd: string;
    entry_ts: string;
    tipepengajuanevent: string;
    status: string;
    namapengajuanevent?: string;
    };
  details: {
    pengajuan_id: number;
    keterangan: string;
    kebutuhan: string;
    quantity: number;
    uom: string;
    price: number;
    total: number;
    namapengajuanevent?: string;
  }[];
}
  
const ConfirmAllEvent: Component<ConfirmAllEventProps> = (props) => {

  const [originalRowData, setOriginalRowData] = createSignal<RowData[]>(
    (() => {
        const savedData = localStorage.getItem('tableDataEventDetails');
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
          pengajuanevent: {
            id: rowData.id,
            coa_kd: rowData.coa_kd,
            entry_ts: rowData.entry_ts,
            tipepengajuanevent: rowData.tipepengajuanevent,
            status: rowData.status,
            namapengajuanevent: rowData.namapengajuanevent,
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
        namapengajuanevent: rowData.namapengajuanevent,
      });
    });
  
    const result = Object.values(uniquePengajuan);
    return result.length > 0 ? result[0] : null;
  }
  
  
  // Contoh penggunaan dalam konversi data
  const newStructuredData = convertRowData(originalRowData());
  
  console.log("struktur", newStructuredData)


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
  const updatedRowData = calculateAggregates(originalRowData());
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
  console.log("data all event ke BE, ", originalRowData());
  
  console.log("struktur baru", newStructuredData)

  const sendDataToBackend = async () => {
    console.log("data all event ke BE, ", originalRowData());
    console.log("struktur baru", newStructuredData)

    try {
      const response = await fetch('/api/eventpengajuan/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStructuredData),
      });
  
      if (response.ok) {
        alert('Data berhasil dikirim ke backend');
        console.log('Data berhasil dikirim ke backend');
        props.OnClose();
        localStorage.removeItem('tableDataEventDetails');
        localStorage.removeItem('tableKetPengajuanEvent');
        localStorage.removeItem('namaPengajuanEvemet');
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
  

    // localStorage.removeItem('tableData');
    // localStorage.removeItem('tableKetMonth');
    // localStorage.removeItem('namaPengajuanMonthly');
    // try {
    //   const response = await fetch('/api/monthlypengajuan/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(originalRowData()),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Gagal mengirim data ke backend');
    //   }
  
    //   const responseData = await response.json();
    //   console.log('Response dari backend:', responseData);
  
    //   // Tambahkan logika atau penanganan lain jika diperlukan
    //   if (responseData.success) {
    //     // Data berhasil dikirim, lakukan sesuatu
    //     console.log('Data berhasil dikirim ke backend');
    //     props.OnClose();
    //     // localStorage.removeItem('tableData');
    //     // localStorage.removeItem('tableKetMonth');
    //     // localStorage.removeItem('namaPengajuanMonthly');
    //     // Tambahkan logika atau tindakan lain yang diperlukan setelah pengiriman berhasil
    //   } else {
    //     // Gagal karena logika bisnis di backend, tampilkan pesan kesalahan atau lakukan tindakan yang sesuai
    //     console.error('Gagal mengirim data ke backend:', responseData.error);
    //     // Tambahkan logika atau tindakan lain yang diperlukan setelah pengiriman gagal
    //   }
    // } catch (error) {
    //   console.error('Error:', error.message);
    //   // Tambahkan penanganan kesalahan jika diperlukan
    // }
  };
        
// function onGridReady1(event: GridReadyEvent<any, any>): void {
//   throw new Error('Function not implemented.');
// }

        // console.log("ini popup submit");
        // console.log("tes", transformDataForGrid(aggregatedRowData()))
      

    return (
        <div class="overlay">
          
        <div class="confirm-allplan-ev absolute z-6">
          <div class="event-plan-confirmation">
              <form method="dialog">
                  <div class="head-acc-event" style={{"text-transform":"capitalize"}}>
                      <h2>Apa anda yakin ingin submit data di bawah ini?</h2>
                      <button onClick={props.OnClose}>✕</button>
                  </div>
                  <div class="form-pengajuan-event">
                      <div>
                          <h1>Pengajuan Event</h1>
                          <h1>{getNamaPengajuanEvent()}</h1>
                          <h2>No : 058/FIN.BC/PDO/VI/2023</h2>
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
                        <p>TOTAL ESTIMASI</p> <p>{props.sumtotal}</p>
                      </div>
                      </div>

                      <br />
                      <div>
                        <div>
                          <button class="btn-save-edit" onClick={sendDataToBackend}>
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

export default ConfirmAllEvent;