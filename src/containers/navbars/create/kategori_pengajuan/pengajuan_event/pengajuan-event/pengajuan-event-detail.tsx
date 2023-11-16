import { createSignal, type Component, onCleanup, onMount, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './pengajuan-event-detail.css'
import PengajuanWeekly from '../../../kategori_pengajuanweekly/pengajuan-weekly/pengajuan-weekly';
import { Total6, Total7, Total8, setTotal4 } from '../../../../../../store/Pengajuan/Event-satu/pengajuan-e-satu';
import { Icon } from '@iconify-icon/solid';
import EditEventDetails from '../popup-event/edit-event-details';
import ComfirmDeleteEvDetails from '../popup-event/confirm-delete-evdetails';
import { optionsEvdetails } from './data-coa-evdetails';
import { namaPengajuanEvent } from './nama-pengajuan-event';
import PengajuanEvent from './pengajuan-event';

interface Option {
  value: string;
  label: string
}

interface SelectedOption {
  value?: string;
  label?: string;
}

export type RowData = {
    keterangan: string;
    kebutuhan: string;
    uniqueId?: number;
    qty: number;
    uom: string;
    price: number;
    total: number;
    coa: string;
    aksi?: object;
  };

const PengajuanEventDetails: Component = () => {
// <<<<<<< HEAD
//   const [gridApi, setGridApi] = createSignal(null);
//   const [rowData, setRowData] = createSignal<RowData[]>(
//     (() => {
//       const savedData = localStorage.getItem('tableKetPengajuanEvent');
//       return savedData
//         ? JSON.parse(savedData).map((row, index) => ({ ...row, uniqueId: index })) // Add a uniqueId property
//         : ([] as RowData[]);
//     })()
// =======
    const [popUpEvent, setPopUpEvent] = createSignal(false);

    function handlePopUpEvent(){
        setPopUpEvent(true);
    }

    // function ClosePopUp(){
    //     setPopUp(false);
    // }

    const [isOpen, setIsOpen] = createSignal(false);

    const [gridApi, setGridApi] = createSignal(null);
    const [rowData, setRowData] = createSignal<RowData[]>(
        (() => {
          // Coba ambil data dari localStorage saat komponen diinisialisasi
          const savedData = localStorage.getItem('tableDataEventDetails');
          return savedData ? JSON.parse(savedData) : ([] as RowData[]);
        })()
      );
      
    const dropdownRef = (el) => {
        if (el) {
        const handleDocumentClick = (e) => {
            if (!el.contains(e.target)) {
            setIsOpen(false);
            }
        };
        document.addEventListener('click', handleDocumentClick);
        onCleanup(() => {
            document.removeEventListener('click', handleDocumentClick);
        });
        }
    };
      
    const [need, setNeed] = createSignal("");
    const [qty, setQty] = createSignal(0);
    const [uom, setuom] = createSignal("");
    const [price, setPrice] = createSignal(0);
    const [coa, setCOA] = createSignal("");
  

    const [EditPopUpEvent, setEditPopUpEvent] = createSignal(false);
    const [DeletePopUpEvent, setDeletePopUpEvent] = createSignal(false);

    function showEditPopUpEvent(){
      setEditPopUpEvent(true);
    }

    function showDeletePopUpEvent(){
      setDeletePopUpEvent(true);
    }

    function closePopUpEvent(){
      setEditPopUpEvent(false);
      setDeletePopUpEvent(false);
      setPopUpEvent(false);
    }

    const handleCellValueChanged = (params) => {
      const { data } = params;
      // Update local storage
      localStorage.setItem('tableData', JSON.stringify(rowData()));
    
      // Recalculate total if 'qty' or 'price' is changed
      if (params.colDef.field === 'qty' || params.colDef.field === 'price') {
        const newTotal = data.qty * data.price;
        const updatedRow = { ...data, total: newTotal };
        setRowData((prevData) => {
          const newData = prevData.map((row) =>
            areRowsEqual(row, data) ? { ...row, ...updatedRow } : row
          );
          localStorage.setItem('tableData', JSON.stringify(newData));
          return newData;
        });
      }
    };

    const deleteRow = (index: number) => {
      setRowData((prevData) => {
        const newData = [...prevData];
        newData.splice(index, 1);
        // Update localStorage after removing the row
        localStorage.setItem('tableData', JSON.stringify(newData));
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
        { field: "keterangan", editable: true, width: 150 },
        { field: "kebutuhan", headerName: "Kebutuhan", editable: true, width: 200 },
        { field: "coa", headerName: "COA", editable: true, width: 130 },
        { field: "qty", headerName: "Qty", editable: true, width: 80 },
        { field: "uom", headerName: "UoM", editable: true, width: 100 },
        { field: "price", headerName: "Price", editable: true, width: 130 },
        { field: "total", headerName: "Total", width: 150},
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
        const newRow: RowData = {
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
        setRowData((prevData) => {
          const newData = [...prevData, newRow];
          // Simpan data ke localStorage saat menambahkan data baru
          localStorage.setItem('tableData', JSON.stringify(newData));
          return newData;
        });
  
        clearInputs();
      }
    };

    // const calculateTotal = () => {
    //     const gridData = rowData();
    //     let total = 0;
    //     for (const row of gridData) {
    //       total += row.total;
    //     }
    //     return total;
    //   };

    const calculateTotal = () => {
        const gridData = rowData();
        let Total = 0;
        for (const row of gridData) {
          Total += row.total;
        }
        setTotal4(Total); // Simpan total di toko
        return Total;
      };
  
    // onMount(() => {
    //   // Bersihkan localStorage saat komponen di-unmount
    //   onCleanup(() => {
    //     localStorage.removeItem('tableDataEventDetails');
    //   });
    // });
  //   const [keteranganOptions, setKeteranganOptions] = createSignal<string[] | (() => any)>(() => {
  //     const savedData = localStorage.getItem('tableKetPengajuanEvent');
  //     return savedData ? JSON.parse(savedData).map((row) => row.keterangan) : [];
  // });

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
    const gridData = rowData();
    let Total = 0;
    for (const row of gridData) {
      Total += row.total;
    }
    setTotal4(Total); // Simpan total di toko
  });

  // onMount(() => {
  //   // Bersihkan localStorage saat komponen di-unmount
  //   onCleanup(() => {
  //     localStorage.removeItem('tableKetPengajuanEvent');
  //   });
  // });

const [keterangan, setKeterangan] = createSignal('');
const [timestamp, setTimestamp] = createSignal('');


// kode dropdown keterangan
const [keteranganOptions, setKeteranganOptions] = createSignal<string[]>(
  localStorage.getItem('tableKetPengajuanEvent')
      ? JSON.parse(localStorage.getItem('tableKetPengajuanEvent')!).map((row: any) => row.keterangan)
      : []
);

// kode untuk buat dropdown search COA
const [inputValue, setInputValue] = createSignal('');
// const [selectedOption, setSelectedOption] = createSignal<SelectedOption | null>({ value: undefined, label: undefined });

const [selectedOption, setSelectedOption] = createSignal<SelectedOption | null>(null);

const [filteredOptions, setFilteredOptions] = createSignal<Option[]>(optionsEvdetails());
const [showDropdown, setShowDropdown] = createSignal(false);

createEffect(() => {
  const inputValueLowerCase = inputValue().toLowerCase();
  const filtered = optionsEvdetails().filter((option) => option.label.toLowerCase().includes(inputValueLowerCase));
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

  const selectedOption = optionsEvdetails().find((option) => option.label === label);
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
    <div class="pengajuan-event-details">
       <div>
        <h1>Form Tambah Pengajuan Event</h1>
      </div>
      <div class="dropdown-keterangan-evdetails">
        <label for="keteranganDropdown-evdetails">Keterangan:</label>
        <br />
        {/* Gunakan dropdown di sini */}
        <select
            id="keteranganDropdown-evdetails"
            // value={selectedOption()}
            // onChange={(e) => setSelectedOption(e.target.value)}
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
            {/* <option value="" disabled selected>
                Pilih Keterangan
            </option>
            {keteranganOptions().map((option) => (
                <option value={option}>{option}</option>
            ))} */}
        </select>      
      </div>

      <div> 
        <div class="container-event-details" style={{display:'flex', "flex-direction":"row"}}>
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
                  <div class="dropdown-options-coa-evdetails">
                  <div class="options-list-evdetails">
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

            {/* <div>
            <label>COA</label>
            <br />
               <div class="custom-dropdown-coa" ref={dropdownRef}>
                <div class="dropdown-selected" onClick={() => setIsOpen(!isOpen())} style={{"justify-content":"space-between", display:"flex", "flex-direction":"row"}}>
                    <div>{selectedOption() || ""}</div>
                    <div>
                        {isOpen() ? 
                        <svg xmlns="http://www.w3.org/2000/svg" class="mt-1" width="10" height="15" viewBox="0 0 15 15"><g transform="translate(0 15) scale(1 -1)"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></g></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" class="mt-1" width="10" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></svg>
                        }
                    </div>
                </div>
                <div>
                {isOpen() && (
                    <div class="dropdown-options-coa">
                    <div class="options-list" >
                        {options.map((option, index) => (
                        <div
                            class="option"
                            onClick={() => {
                            setSelectedOption(option);
                            setIsOpen(false);
                            }}
                        >
                            {option}
                        </div>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            </div> 
            </div> */}

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

            
            <div class="tambah-data-1-evdetails">
                <button onClick={addRow}>Tambah</button>
            </div>
        </div>
        <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "146.5vh" }}>
            <AgGridSolid 
                gridOptions={gridOptions} 
                onGridReady={onGridReady} 
                rowData={rowData()} 
            />
            <div class="detail-event-details">
                <div>TOTAL</div>
                <div>Rp{Total6()}</div>
            </div>
        </div>
        
        <div class="btn-simpan-data-evdetails">
            <button onClick={handlePopUpEvent}>Simpan</button>
        </div>

        </div>
        {popUpEvent() && <PengajuanEvent OnClose={closePopUpEvent} pengajuanevent={namaPengajuanEvent()}/>}
        {/* {EditPopUpEvent() && <EditEventDetails OnClose={closePopUpEvent}/>}
        {DeletePopUpEvent() && <ComfirmDeleteEvDetails OnClose={closePopUpEvent}/>} */}
    </div>
  );
};

export default PengajuanEventDetails;
