import { createSignal, type Component, onCleanup, onMount, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './pengajuanweekly-insentif.css';
import PengajuanWeekly from '../../pengajuan-weekly/pengajuan-weekly';
import { TotalW, TotalW2, TotalW3, TotalW4, setTotalW } from '../../../../../../store/Pengajuan/Weekly-satu/weekly-insen-satu';
import { TotalW1 } from '../../../../../../store/Pengajuan/Weekly-satu/weekly-insen-satu';
import { Icon } from '@iconify-icon/solid';
import FormEditWeekly from './forms/form-edit-weeklyinsen';
import ConfirmPopUpWeeklyInsen from './popup/confirmpopup';
import { optionsWeekly } from '../../data-coa-weekly';
import { namaPengajuanWeekly } from './popup/nama-pengajuan-weekly';

interface Option {
  value: string;
  label: string
}

interface SelectedOption {
  value?: string;
  label?: string;
}

export type RowDataWeekly = {
    keterangan: string;
    uniqueId?: number;
    kebutuhan: string;
    qty: number;
    uom: string;
    price: number;
    total: number;
    coa: string;
    aksi?: object;
  };

  const calculateTotalByKeterangan = (data) => {
    const totals = {};
  
    for (const row of data) {
      const keterangan = row.keterangan;
  
      if (!totals[keterangan]) {
        totals[keterangan] = 0;
      }
  
      totals[keterangan] += row.total;
    }
  
    return totals;
  };
  
  export { calculateTotalByKeterangan };

const PengajuanWeeklyInsentif: Component = () => {
    const [gridApi, setGridApi] = createSignal(null);
    const [rowDataWeekly, setRowDataWeekly] = createSignal<RowDataWeekly[]>(
      (() => {
        const savedData = localStorage.getItem('tableKetWeekly');
        return savedData
          ? JSON.parse(savedData).map((row, index) => ({ ...row, uniqueId: index })) // Add a uniqueId property
          : ([] as RowDataWeekly[]);
      })()
    );
      
      
    const [need, setNeed] = createSignal("");
    const [qty, setQty] = createSignal(0);
    const [uom, setuom] = createSignal("");
    const [price, setPrice] = createSignal(0);
    const [coa, setCOA] = createSignal("");
  

    const [popUp, setPopUp] = createSignal(false);

    function handlePopUp(){
        setPopUp(true);
    }
    // const [EditPopUp, setEditPopUp] = createSignal(false);
    // const [DeletePopUp, setDeletePopUp] = createSignal(false);

    // function showEditPopUp(row: RowData){
    //   setSelectedRow(row);
    //   setEditPopUp(true);
    // }

    // function showDeletePopUp(){
    //   setDeletePopUp(true);
    // }

    function closePopUp(){
      // setEditPopUp(false);
      // setDeletePopUp(false);
      setPopUp(false);
    }

    const handleCellValueChanged = (params) => {
      const { data } = params;
      // Update local storage
      localStorage.setItem('tableKetWeekly', JSON.stringify(rowDataWeekly()));
    
      // Recalculate total if 'qty' or 'price' is changed
      if (params.colDef.field === 'qty' || params.colDef.field === 'price') {
        const newTotal = data.qty * data.price;
        const updatedRow = { ...data, total: newTotal };
        setRowDataWeekly((prevData) => {
          const newData = prevData.map((row) =>
            areRowsEqual(row, data) ? { ...row, ...updatedRow } : row
          );
          localStorage.setItem('tableKetWeekly', JSON.stringify(newData));
          return newData;
        });
      }
    };

    const deleteRow = (index: number) => {
      setRowDataWeekly((prevData) => {
        const newData = [...prevData];
        newData.splice(index, 1);
        // Update localStorage after removing the row
        localStorage.setItem('tableKetWeekly', JSON.stringify(newData));
        return newData;
      });
    };
        

    // Fungsi utilitas untuk membandingkan dua objek row
    const areRowsEqual = (row1, row2) => {
      // Implementasikan logika perbandingan berdasarkan properti yang sesuai
      return row1.uniqueId === row2.uniqueId;
    };
    
    const gridOptions = {
      columnDefs: [
        { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 60 },
        // { field: "uniqueId" },
        { field: "keterangan", editable: true, width: 150 },
        { field: "kebutuhan", headerName: "Kebutuhan", editable: true, width: 200 },
        { field: "coa", headerName: "COA", editable: true, width: 130 },
        { field: "qty", headerName: "Qty", editable: true, width: 80 },
        { field: "uom", headerName: "UoM", editable: true, width: 100 },
        { field: "price", headerName: "Price", editable: true, width: 130 },
        { field: "total", headerName: "Total",  width: 150},
        {
          field: 'aksi', width: 80,cellRenderer: (params: any) => {
            const rowIndex = params.rowIndex;
            const row = params.data; // Mendapatkan data baris dari params.data

            return (
              <div>
                <button onClick={() => deleteRow(rowIndex)}><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
              </div>
            );
          }
        }
      ],
      onCellValueChanged: handleCellValueChanged,
    };

    const onGridReady = (params: any) => {
      setGridApi(() => params.api);
    };
  
    const addRow = () => {
      if (need() && qty() && uom() && price() ) {
        let total = qty() * price();
        const newRow: RowDataWeekly = {
          // uniqueId: counter(),
          keterangan: keterangan(),
          kebutuhan: need(),
          qty: qty(),
          uom: uom(),
          price: price(),
          total: total,
          // coa: selectedOption(),
          coa: selectedOption()?.value,
        };
        setRowDataWeekly((prevData) => {
          const newData = [...prevData, newRow];
          // Simpan data ke localStorage saat menambahkan data baru
          localStorage.setItem('tableKetWeekly', JSON.stringify(newData));
          return newData;
        });
  
        clearInputs();
      }
    };
  
    const clearInputs = () => {
      setNeed("");
      setQty(0);
      setuom("");
      setPrice(0);
      setCOA("");
    };

    // const calculateTotal = () => {
    //     const gridData = rowData();
    //     let total = 0;
    //     for (const row of gridData) {
    //       total += row.total;
    //     }
    //     return total;
    //   };
    createEffect(() => {
      const gridData = rowDataWeekly();
      let TotalW = 0;
      for (const row of gridData) {
        TotalW += row.total;
      }
      setTotalW(TotalW); // Simpan total di toko
    });

    // onMount(() => {
    //   // Bersihkan localStorage saat komponen di-unmount
    //   onCleanup(() => {
    //     localStorage.removeItem('tableKetWeekly');
    //   });
    // });

  const [keterangan, setKeterangan] = createSignal('');
  const [timestamp, setTimestamp] = createSignal('');


  // kode dropdown keterangan
  const [keteranganOptions, setKeteranganOptions] = createSignal<string[]>(
    localStorage.getItem('tableKetWeekly')
        ? JSON.parse(localStorage.getItem('tableKetWeekly')!).map((row: any) => row.keterangan)
        : []
  );

  // kode untuk buat dropdown search COA
  const [inputValue, setInputValue] = createSignal('');
  // const [selectedOption, setSelectedOption] = createSignal<SelectedOption | null>({ value: undefined, label: undefined });

  const [selectedOption, setSelectedOption] = createSignal<SelectedOption | null>(null);

  const [filteredOptions, setFilteredOptions] = createSignal<Option[]>(optionsWeekly());
  const [showDropdown, setShowDropdown] = createSignal(false);

  createEffect(() => {
    const inputValueLowerCase = inputValue().toLowerCase();
    const filtered = optionsWeekly().filter((option) => option.label.toLowerCase().includes(inputValueLowerCase));
    setFilteredOptions(filtered);
  });

  createEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && !target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    onCleanup(() => {
      window.removeEventListener('click', handleClickOutside);
    });
  });

  const handleInput = (e: Event) => {
    const label = (e.target as HTMLInputElement).value;
    setInputValue(label);

    const selectedOption = optionsWeekly().find((option) => option.label === label);
    if (selectedOption) {
      setSelectedOption({ value: selectedOption.value, label: selectedOption.label });
    } else {
      setSelectedOption(null);
    }

    setShowDropdown(true);
  };

 
  const handleOptionSelect = (selectedOption: Option) => {
      setInputValue(selectedOption.label);
      setSelectedOption({ value: selectedOption.value, label: selectedOption.label });
      setShowDropdown(false);
    };
    
  const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
  
      const currentIndex = filteredOptions().findIndex((option) => option === (selectedOption() ?? { value: '', label: '' }));
      const nextIndex =
      currentIndex === -1
          ? 0
          : e.key === 'ArrowDown'
          ? (currentIndex + 1) % filteredOptions().length
          : (currentIndex - 1 + filteredOptions().length) % filteredOptions().length;
  
      setSelectedOption(filteredOptions()[nextIndex]);
  } else if (e.key === 'Enter' && selectedOption()) {
      handleOptionSelect(selectedOption() as Option);
  }
  };


  return (
    <div class="pengajuan-weekly">
      <div>
        <h1>Form Tambah Pengajuan Weekly</h1>
      </div>
      <div class="dropdown-keterangan-weekly-insen">
        <label for="keteranganDropdown-insen">Keterangan:</label>
        <br />
        {/* Gunakan dropdown di sini */}
        <select
            id="keteranganDropdown-insen"
            style={{width:"45vh"}}
            value={keterangan()}
            onInput={(e) => setKeterangan(e.target.value)}
        >
          <option value="" disabled selected></option>
          {typeof keteranganOptions() === 'function' ? (
              // Handle the case where keteranganOptions is a function
              // You might want to provide a default value or handle this case differently
              <option value="">Default Option</option>
          ) : (
              // Handle the case where keteranganOptions is an array
              keteranganOptions().map((option) => (
                  <option value={option}>{option}</option>
              ))
          )}
        </select>      
      </div>

      <div> 
        <div class="container-data-weekly" style={{display:'flex', "flex-direction":"row"}}>
            <div>
            <label>Kebutuhan</label>
            <br />
            <input style={{width:"14vw"}}
            type="text"
            placeholder="Kebutuhan"
            value={need()}
            onInput={(e) => setNeed(e.target.value)}
            />
            </div>

            <div>
              <label>COA</label>
              <br />
              <div>
                <input
                  type="text"
                  placeholder="COA.."
                  value={inputValue()}
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  class="custom-dropdown-coa"
                />
                {showDropdown() && (
                  <div class="dropdown-options-coa">
                  <div class="options-list">
                    {filteredOptions().map((option) => (
                      <div onClick={() => handleOptionSelect(option)} class="option-label">{option.label}</div>
                    ))}
                  </div>
                  </div>
                )}
                {/* <div>Selected Value: {selectedOption() ? selectedOption().value : 'None'}</div> */}
                {/* <div>Selected Value: {selectedOption()?.value || 'None'}</div> */}
              </div>
              </div>

            <div>
            <label>Qty</label>
            <br />
            <input style={{width:"6vw"}}
            type="number"
            placeholder="Qty"
            value={qty()}
            onInput={(e) => setQty(Number(e.target.value))}
            />
            </div>

            <div>
            <label>UoM</label>
            <br />
            <input style={{width:"7.5vw"}}
            type="text"
            placeholder="UoM"
            value={uom()}
            onInput={(e) => setuom(e.target.value)}
            />
            </div>
            
            <div>
            <label>Price</label>
            <br />
            <input style={{width:"8vw"}}
            type="number"
            placeholder="Price"
            value={price()}
            onInput={(e) => setPrice(Number(e.target.value))}
            />
            </div>

            
            <div class="tambah-data-1-weekly">
                <button onClick={addRow}>Tambah</button>
            </div>
        </div>
        <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "146.5vh" }}>
            <AgGridSolid 
                gridOptions={gridOptions} 
                onGridReady={onGridReady} 
                rowData={rowDataWeekly()} 
            />
            <div class="detail-total-weekly">
                <div>TOTAL</div>
                <div>Rp={TotalW()}</div>
            </div>
        </div>
        
        <div class="btn-simpan-data-weekly">
            <button onClick={handlePopUp}>Simpan</button>
        </div>

        </div>
        {popUp() && <PengajuanWeekly OnClose={closePopUp} pengajuanweekly={namaPengajuanWeekly()}/>}
        {/* {EditPopUp() && <EditMonthlyPlan OnClose={closePopUp}  rowData={selectedRow()} handleEdit={handleEdit}/>} */}
        {/* {DeletePopUp() && <ComfirmDeletePlan OnClose={closePopUp}/>} */}
    </div>
  );
};

export default PengajuanWeeklyInsentif;
