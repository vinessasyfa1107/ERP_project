import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './confirm-all-plan-weekly.css'
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { RowDataWeekly } from '../../penguanweekly-rutin/pengajuanweekly-insentif/pengajuanweekly-insentif';

interface ConfirmAllPlanWeeklyProps {
    OnClose: () => void;
    pengajuanweekly: string
}

interface AggregatedRowDataWeekly {
    keterangan: string;
    total: number;
  }
  

const ConfirmAllPlanWeekly: Component<ConfirmAllPlanWeeklyProps> = (props) => {

    const [originalRowDataWeekly, setOriginalRowDataWeekly] = createSignal<RowDataWeekly[]>(
        (() => {
          const savedData = localStorage.getItem('tableData');
          return savedData
            ? JSON.parse(savedData).map((row, index) => ({ ...row, uniqueId: index })) as RowDataWeekly[]
            : ([] as RowDataWeekly[]);
        })()
      );



    const [gridApi, setGridApi] = createSignal(null);
    const [aggregatedRowDataWeekly, setAggregatedRowDataWeekly] = createSignal<AggregatedRowDataWeekly[]>([]);

    const onGridReady = (params: any) => {
        setGridApi(() => params.api);
      };


      const calculateAggregates = (data: RowDataWeekly[]): AggregatedRowDataWeekly[] => {
        const aggregatedData: { [key: string]: AggregatedRowDataWeekly } = {};
      
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

      const transformDataForGrid = (data: AggregatedRowDataWeekly[]): any[] => {
        // Mengonversi AggregatedRowDataWeekly ke format yang diharapkan oleh AgGridSolid
        return data.map((row) => ({
          keterangan: row.keterangan,
          total: row.total,
        }));
      };
      
    //   const updatedRowDataWeekly = calculateAggregates(originalRowDataWeekly());
    //     setAggregatedRowDataWeekly(() => updatedRowDataWeekly);
    const updatedRowDataWeekly = calculateAggregates(originalRowDataWeekly());
    setAggregatedRowDataWeekly(() => updatedRowDataWeekly);

    // Mengonversi data agar sesuai dengan format AgGridSolid
    const RowDataWeeklyForGrid = transformDataForGrid(aggregatedRowDataWeekly());
    
        const gridOptions = {
            columnDefs: [
                { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 70 },
                { field: "keterangan", width: 350},
                { field: "total", headerName:"Total", width: 97},
            ]
        };
    
        console.log("tes", transformDataForGrid(aggregatedRowDataWeekly()))
      

    return (
        <div class="overlay">


        <div class="confirm-allplan-m">
         
                <div class="monthly-plan-confirmation">
                    <form method="dialog">
                        <div class="head-acc">
                            <h2>Apa anda yakin ingin submit data di bawah ini?</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>
                        <div class="form-pengajuan">
                            <div>
                                <h1>{props.pengajuanweekly}</h1>
                                <h2>No : 058/FIN.BC/PDO/VI/2023</h2>
                                <p>Total Amount: {updatedRowDataWeekly[updatedRowDataWeekly.length - 1].total}</p>
                                {/* <p>Aggregated Description: {updatedRowDataWeekly[updatedRowDataWeekly.length - 1].aggregatedDescription}</p> */}
                            </div>
                            <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "80vh", margin:"auto" }}>
                                <AgGridSolid 
                                    gridOptions={gridOptions} 
                                    onGridReady={onGridReady} 
                                    rowData={RowDataWeeklyForGrid} 
                                />
                            </div>

                    
                            </div>

                            <br />
                            <div class="btn-save-edit">
                                <button ><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                            </div>
                    </form>
                </div>
        </div>
        </div>
    );
};


export default ConfirmAllPlanWeekly;