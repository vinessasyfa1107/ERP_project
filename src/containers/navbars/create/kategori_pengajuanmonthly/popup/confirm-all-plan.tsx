
import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './confirm-all-plan.css'
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { RowData } from '../operasional-tamanhas/operasional-tamanhas';

interface ConfirmAllPlanProps {
    OnClose: () => void;
    pengajuan: string
}

interface AggregatedRowData {
    keterangan: string;
    total: number;
  }
  

const ConfirmAllPlan: Component<ConfirmAllPlanProps> = (props) => {

    const [originalRowData, setOriginalRowData] = createSignal<RowData[]>(
        (() => {
          const savedData = localStorage.getItem('tableData');
          return savedData
            ? JSON.parse(savedData).map((row, index) => ({ ...row, uniqueId: index })) as RowData[]
            : ([] as RowData[]);
        })()
      );



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
            columnDefs: [
                { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 70 },
                { field: "keterangan", width: 350},
                { field: "total", headerName:"Total", width: 97},
            ]
        };
    
        console.log("tes", transformDataForGrid(aggregatedRowData()))
      

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
                                <h1>{props.pengajuan}</h1>
                                <h2>No : 058/FIN.BC/PDO/VI/2023</h2>
                                <p>Total Amount: {updatedRowData[updatedRowData.length - 1].total}</p>
                                {/* <p>Aggregated Description: {updatedRowData[updatedRowData.length - 1].aggregatedDescription}</p> */}
                            </div>
                            <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "80vh", margin:"auto" }}>
                                <AgGridSolid 
                                    gridOptions={gridOptions} 
                                    onGridReady={onGridReady} 
                                    rowData={rowDataForGrid} 
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


export default ConfirmAllPlan;