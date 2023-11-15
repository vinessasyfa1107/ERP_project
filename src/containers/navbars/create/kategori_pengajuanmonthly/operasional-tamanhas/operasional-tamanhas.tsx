import { createSignal, type Component, onCleanup, onMount, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './operasional-tamanhas.css'
import PengajuanMonthly from '../pengajuan-monthly';
import { Total, Total3, Total4, Total5, setTotal } from '../../../../../store/Pengajuan/Monthly-satu/pengajuan-m-satu';
import { Total2 } from '../../../../../store/Pengajuan/Monthly-satu/pengajuan-m-satu';
import { Icon } from '@iconify-icon/solid';
import EditMonthlyPlan from './popup/edit-monthly-plan';
import ComfirmDeletePlan from './popup/confirm-delete-plan';
import { options } from './data-coa';
import { namaPengajuan } from '../nama-pengajuan';

interface Option {
  value: string;
  label: string
}

interface SelectedOption {
  value?: string;
  label?: string;
}

export type RowData = {
    uniqueId: number;
    kebutuhan: string;
    qty: number;
    uom: string;
    price: number;
    total: number;
    coa: string;
    aksi?: object;
  };

const OperasionalTamanhas: Component = () => {
    const [popUp, setPopUp] = createSignal(false);

    function handlePopUp(){
        setPopUp(true);
    }

    // function ClosePopUp(){
    //     setPopUp(false);
    // }

    const [isOpen, setIsOpen] = createSignal(false);
    // const [selectedOption, setSelectedOption] = createSignal('');
    // const options = [
    //     "1-0000", "1-1000", "1-1100", "1-1101", "1-1102",
    //     "1-1200", "1-1201", "1-1202", "1-1203", "1-1204",
    //     "1-1300", "1-1400", "1-1401", "1-1402", "1-1403", "1-1404",
    //     "1-1500", "1-1501", "1-1506",
    //     "1-1600", "1-1700",
    //     "1-1801", "1-1801", "1-1802", "1-1803",
    //     "1-9000", "1-9001", "1-2000", "1-2001", "1-2002", "1-2003",
    //     "3-0000", "3-7000", "3-8000", "3-9000", "3-9999",
    //     "8-0000",
    //     "8-1001"
    //   ];  

    const [gridApi, setGridApi] = createSignal(null);
    const [rowData, setRowData] = createSignal<RowData[]>(
      (() => {
        const savedData = localStorage.getItem('tableData');
        return savedData
          ? JSON.parse(savedData).map((row, index) => ({ ...row, uniqueId: index })) // Add a uniqueId property
          : ([] as RowData[]);
      })()
    );

    const [counter, setCounter] = createSignal(
      (() => {
        const savedCounter = localStorage.getItem('rowCounter');
        return savedCounter ? parseInt(savedCounter, 10) : 0;
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
  

    const [EditPopUp, setEditPopUp] = createSignal(false);
    const [DeletePopUp, setDeletePopUp] = createSignal(false);

    function showEditPopUp(row: RowData){
      setSelectedRow(row);
      setEditPopUp(true);
    }

    function showDeletePopUp(){
      setDeletePopUp(true);
    }

    function closePopUp(){
      setEditPopUp(false);
      setDeletePopUp(false);
      setPopUp(false);
    }

    const deleteRow = (uniqueId: number) => {
      setRowData((prevData) => {
        const newData = prevData.filter((row) => row.uniqueId !== uniqueId);
        localStorage.setItem('tableData', JSON.stringify(newData));
        return newData;
      });
    };
    // const generateUniqueId = () => {
    //   const timestamp = new Date().getTime().toString(36); // Use a timestamp
    //   const randomString = Math.random().toString(36).substr(2, 5); // Use a random string
    //   return `${timestamp}_${randomString}`;
    // };
    
    // ...

    const onCellValueChanged = (params) => {
      console.log('onCellValueChanged triggered');
      
      const editedRow = params.data;
      const { field, newValue } = params;
    
      if (!editedRow.uniqueId) {
        editedRow.uniqueId = counter(); // Set a unique value if it doesn't exist
      }
    
      if (field === 'qty' || field === 'price') {
        const qty = Number(editedRow.qty);
        const price = Number(editedRow.price);
        const updatedTotal = qty * price;
    
        console.log('Edited Row:', editedRow);
        console.log('Field:', field);
        console.log('New Value:', newValue);
        console.log('Updated Total:', updatedTotal);
    
        setRowData((prevData) => {
          const updatedData = prevData.map((row) =>
            areRowsEqual(row, editedRow) ? { ...row, total: updatedTotal } : row
          );
    
          console.log('Updated Data:', updatedData);
    
          localStorage.setItem('tableData', JSON.stringify(updatedData));
    
          // Recalculate and update the total
          calculateTotal();
    
          return updatedData;
        });
      }
    };
    
    
    
    

    // Fungsi utilitas untuk membandingkan dua objek row
    const areRowsEqual = (row1, row2) => {
      // Implementasikan logika perbandingan berdasarkan properti yang sesuai
      return row1.uniqueId === row2.uniqueId;
    };
    

    const [selectedRow, setSelectedRow] = createSignal<RowData | null>(null);

    const gridOptions = {
      columnDefs: [
        { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 60 },
        { field: "uniqueId" },
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
              <div style={{  display: "flex", "justify-content": "space-between", width:"9vh"}}>
                <button onClick={() => showEditPopUp(row)}><Icon icon="iconamoon:edit" color="#40444b" width="18" height="18" /></button>
                <button onClick={() => deleteRow(rowIndex)}><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
              </div>
            );
          }
        }
      ],
      onCellValueChanged: onCellValueChanged,
      getRowId: (data) => data.uniqueId !== undefined ? data.uniqueId : data.id,
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
      setTotal(Total); // Simpan total di toko
    });

    const calculateTotal = () => {
        const gridData = rowData();
        let Total = 0;
        for (const row of gridData) {
          Total += row.total;
        }
        setTotal(Total); // Simpan total di toko
        return Total;
      };
  
    // onMount(() => {
    //   // Bersihkan localStorage saat komponen di-unmount
    //   onCleanup(() => {
    //     localStorage.removeItem('tableData');
    //   });
    // });
  //   const [keteranganOptions, setKeteranganOptions] = createSignal<string[] | (() => any)>(() => {
  //     const savedData = localStorage.getItem('tableKetMonth');
  //     return savedData ? JSON.parse(savedData).map((row) => row.keterangan) : [];
  // });
  const [keteranganOptions, setKeteranganOptions] = createSignal<string[]>(
    localStorage.getItem('tableKetMonth')
        ? JSON.parse(localStorage.getItem('tableKetMonth')!).map((row: any) => row.keterangan)
        : []
  );

  // kode untuk buat dropdown searc
  const [inputValue, setInputValue] = createSignal('');
  // const [selectedOption, setSelectedOption] = createSignal<SelectedOption | null>({ value: undefined, label: undefined });

  const [selectedOption, setSelectedOption] = createSignal<SelectedOption | null>(null);

  const [filteredOptions, setFilteredOptions] = createSignal<Option[]>(options());
  const [showDropdown, setShowDropdown] = createSignal(false);

  createEffect(() => {
    const inputValueLowerCase = inputValue().toLowerCase();
    const filtered = options().filter((option) => option.label.toLowerCase().includes(inputValueLowerCase));
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

  // const handleOptionSelect = (selectedOption: Option) => {
  //     setInputValue(selectedOption.label);
  //     setSelectedOption({ value: selectedOption.value, label: selectedOption.label });
  //     setShowDropdown(false);
  //   };
    

  const handleInput = (e: Event) => {
    const label = (e.target as HTMLInputElement).value;
    setInputValue(label);

    const selectedOption = options().find((option) => option.label === label);
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

  const onGridReady = (params: any) => {
    setGridApi(() => params.api);
  };

  const addRow = () => {
    if (need() && qty() && uom() && price() ) {
      let total = qty() * price();
      const newRow: RowData = {
        uniqueId: counter(),
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
      setCounter(counter() + 1);

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

  const [keterangan, setKeterangan] = createSignal('');
  const [timestamp, setTimestamp] = createSignal('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData().nama || !formData().nama_perusahaan || !formData().email) {
    //     alert('Mohon isi semua kolom yang dibutuhkan.');
    //     return; // Menghentikan pengiriman jika ada input yang kosong
    //   }
    const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 11);

      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      const timestamp = `${formattedDate}${formattedTime}`;

      console.log("tanggal dan waktu: ", timestamp);
      setTimestamp(timestamp);

    const total = qty() * price();

    const DataToSend = {
      id: 0,
      tipepengajuan: 'Monthly',
      entry_ts: timestamp,
      keterangan: keterangan(),
      kebutuhan: need(),
      coa_kd: selectedOption()?.value,
      quantity: qty(),
      uom: uom(),
      price: price(),
      total: total,
    };

    console.log("data kontak: ", DataToSend)
    try{
      const response = await fetch('/api/monthlypengajuan/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(DataToSend),
      });
  
      if (response.ok) {
        console.log('Data berhasil diinput'); // Tampilkan pesan sukses
        alert('Data berhasil ditambah');
        addRow();
      } else {
          const errorMessage = await response.text();
          alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
          console.error('Gagal mengubah data:', errorMessage);
      }
    } catch (error) {
        alert('Terjadi kesalahan. Silakan coba lagi.');
        console.error('Terjadi kesalahan:', error);
    }

  };

  // const handleEdit = () => {
  //   if (selectedRow()) {
  //     const updatedRow: RowData = { ...selectedRow(), ...editedData() };

  //     setRowData((prevData) => {
  //       const updatedData = prevData.map((row) =>
  //         areRowsEqual(row, selectedRow()) ? updatedRow : row
  //       );

  //       localStorage.setItem('tableData', JSON.stringify(updatedData));

  //       // Hitung kembali total setelah edit
  //       calculateTotal();

  //       // Setelah proses edit selesai, Anda mungkin ingin menutup popup
  //       setEditPopUp(false);

  //       return updatedData;
  //     });
  //   }
  // };


  return (
    <div class="operasional-rutin-tamanhas">
      <div>
        <h1>Form Tambah Pengajuan</h1>
      </div>
      <div class="dropdown-keterangan">
        <label for="keteranganDropdown">Keterangan:</label>
        <br />
        {/* Gunakan dropdown di sini */}
        <select
            id="keteranganDropdown"
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
        <div class="container-data-operasional" style={{display:'flex', "flex-direction":"row"}}>
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

            
            <div class="tambah-data-1">
                <button onClick={addRow}>Tambah</button>
            </div>
        </div>
        <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "146.5vh" }}>
            <AgGridSolid 
                gridOptions={gridOptions} 
                onGridReady={onGridReady} 
                rowData={rowData()} 
            />
            <div class="detail-total-operasional">
                <div>TOTAL</div>
                <div>Rp{Total()}</div>
            </div>
        </div>
        
        <div class="btn-simpan-data-operasional">
            <button onClick={handlePopUp}>Simpan</button>
        </div>

        </div>
        {popUp() && <PengajuanMonthly OnClose={closePopUp} pengajuan={namaPengajuan()}/>}
        {/* {EditPopUp() && <EditMonthlyPlan OnClose={closePopUp}  rowData={selectedRow()} handleEdit={handleEdit}/>} */}
        {DeletePopUp() && <ComfirmDeletePlan OnClose={closePopUp}/>}
    </div>
  );
};

export default OperasionalTamanhas;
