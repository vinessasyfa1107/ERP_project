import { Component, createSignal } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { RowData } from '../../../navbars/create/kategori_pengajuanmonthly/operasional-tamanhas/operasional-tamanhas';

interface RowData {
  keterangan: string;
  total: number;
  // Add other properties as needed
}

interface AggregatedRowData {
  keterangan: string;
  total: number;
}

interface ConfirmAllPlanDateProps {
  date: number; // Assuming 'date' is a timestamp
}

const ConfirmAllPlanDate: Component<ConfirmAllPlanDateProps> = (props) => {
  const [originalRowData, setOriginalRowData] = createSignal<RowData[]>(
    (() => {
      const savedData = localStorage.getItem('tableData');
      const entry_ts = props.date;

      return savedData
        ? JSON.parse(savedData).map((row, index) => ({
            ...row,
            entry_ts,
          })) as RowData[]
        : ([] as RowData[]);
    })()
  );

  const saveDataToLocalStorage = (data: RowData[]) => {
    localStorage.setItem('tableData', JSON.stringify(data));
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

  const updatedRowData = calculateAggregates(originalRowData());
  setAggregatedRowData(() => updatedRowData);

  // Mengonversi data agar sesuai dengan format AgGridSolid
  const rowDataForGrid = transformDataForGrid(aggregatedRowData());

  const gridOptions = {
    domLayout: 'autoHeight' as 'autoHeight',
    columnDefs: [
      { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 70 },
      { field: 'keterangan', width: 350 },
      { field: 'total', headerName: 'Total', width: 97 },
    ],
  };

  // Simpan data ke localStorage saat terjadi perubahan pada originalRowData
  setOriginalRowData((prevData) => {
    saveDataToLocalStorage(prevData);
    return prevData;
  });

  return (
    <div class="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridSolid
        onGridReady={onGridReady}
        gridOptions={gridOptions}
        rowData={rowDataForGrid}
      />
    </div>
  );
};

export default ConfirmAllPlanDate;
