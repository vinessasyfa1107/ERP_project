import { createSignal, type Component, onCleanup, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './pengajuanweekly-insentif.css';
import PengajuanWeeklyRutin from '../pengajuanweekly-rutin';
import { Totall, setTotall2 } from '../../../../../../store/Pengajuan/Weekly-satu/weekly-insen-satu';
import PengajuanWeekly from '../../pengajuan-weekly/pengajuan-weekly';
import { Icon } from '@iconify-icon/solid';
import FormEditWeekly from './forms/form-edit-weeklyinsen';
import ConfirmPopUpWeeklyInsen from './popup/confirmpopup';


type RowData = {
    total: number;
    kebutuhan: string;
    price: number;
    coa: string;
    // aksi: object;
  };

const PengajuanWeeklyInsentif: Component = () => {
    const [popUp, setPopUp] = createSignal(false);

    function handlePopUp(){
        setPopUp(true);
    }

    function ClosePopUp(){
        setPopUp(false);
    }

    const [isOpen, setIsOpen] = createSignal(false);
    const [selectedOption, setSelectedOption] = createSignal('');
    const options = [
        "1-0000", "1-1000", "1-1100", "1-1101", "1-1102",
        "1-1200", "1-1201", "1-1202", "1-1203", "1-1204",
        "1-1300", "1-1400", "1-1401", "1-1402", "1-1403", "1-1404",
        "1-1500", "1-1501", "1-1506",
        "1-1600", "1-1700",
        "1-1801", "1-1801", "1-1802", "1-1803",
        "1-9000", "1-9001", "1-2000", "1-2001", "1-2002", "1-2003",
        "3-0000", "3-7000", "3-8000", "3-9000", "3-9999",
        "8-0000",
        "8-1001"
      ];  

    const [gridApi, setGridApi] = createSignal(null);
    const [rowData, setRowData] = createSignal<RowData[]>(
        (() => {
          // Coba ambil data dari localStorage saat komponen diinisialisasi
          const savedData = localStorage.getItem('tableData1');
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
    const [price, setPrice] = createSignal(0);
    const [coa, setCOA] = createSignal("");

    const [isEditPopupInsenOpen, setisEditPopupInsenOpen] = createSignal(false);
    const [isDeletePopupInsenOpen, setisDeletePopupInsenOpen] = createSignal(false);

  //   const showEditPopupInsen = () => {
  //     // console.log("Kebutuhan:", editedKebutuhan);
  //     // setKebutuhan(editedKebutuhan);
  
  //     // console.log("Price:", editedPrice);
  //     // setPrice(editedPrice);
  
  //     // console.log("Coa:", editedCoa);
  //     // setCOA(editedCoa);
  
  //     setisEditPopupInsenOpen(!isEditPopupInsenOpen());
  // };
  
  function showEditPopupInsen() {
    setisEditPopupInsenOpen(!isEditPopupInsenOpen());
  }

  function showDeletePopupInsen() {
    setisDeletePopupInsenOpen(!isDeletePopupInsenOpen());
  }

  function CloseEditPopUpInsen() {
    setisEditPopupInsenOpen(false);
    setConfirmPopUp(false);
  }

  function CloseDeletePopUpInsen() {
    setisDeletePopupInsenOpen(false);
    setConfirmPopUp(false);
  }

  const [ConfirmPopUp, setConfirmPopUp] = createSignal(false);
  
    const gridOptions = {
      columnDefs: [
        { field: "kebutuhan", headerName: "Kebutuhan", width: 200 },
        { field: "coa", headerName: "COA", width: 130 },
        { field: "price", headerName: "Price", width: 130 },
        // { field: "total", headerName: "Total", width: 130 },
        {
          field: 'aksi', cellRenderer: (params: any) => {
            // function showEditPopupInsen(id: any, balance: any): void {
            //   throw new Error('Function not implemented.');
            // }
  
            // function showDeletePopupInsen(id: any): void {
            //   throw new Error('Function not implemented.');
            // }
  
            return (
              <div style={{ "margin-top": "1vh", display: "flex", "justify-content": "space-between", width: "9vh" }}>
                <button onClick={showEditPopupInsen}><Icon icon="iconamoon:edit" color="#40444b" width="18" height="18" /></button>
                <button onClick={showDeletePopupInsen}><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
              </div>
            );
          }
        }
      ],
    };
  
    const onGridReady = (params: any) => {
      setGridApi(() => params.api);
    };
  
    const addRow = () => {
      if (need() && price() ) {
        const newRow: RowData = {
            kebutuhan: need(),
            price: price(),
            total: 0,
            coa: selectedOption(),
            // aksi: aksi()
        };
        setRowData((prevData) => {
          const newData = [...prevData, newRow];
          // Simpan data ke localStorage saat menambahkan data baru
          localStorage.setItem('tableData1', JSON.stringify(newData));
          return newData;
        });
        clearInputs();
      }
    };
  
    const clearInputs = () => {
      setNeed("");
      setPrice(0);
    };

    const calculateTotal = () => {
        const gridData = rowData();
        let Totall2 = 0;
        for (const row of gridData) {
          Totall2 += row.price;
        }
        setTotall2(Totall2); // Simpan total di toko
        return Totall2;
      };

      const initialKeteranganOptions = [
        "Insentif week 43",
        "Token Tamanhas",
        "Token Purwokerto week 43",
        "Transport Alvin",
        "Gaji David 26-Okt",
        "Gaji OB Sukaraja 30-Okt",
        "Gaji pak Min 1-Nov",
        "Iuran kebersihan Tamanahas 1-Nov",
        "Iuran keamanan Tamanhas 1-Nov",
        "Iuran kebersihan Purwokerto 1-Nov",
        "Iuran keamanan Purwokerto 1-Nov",
        "Pettycash 27-Okt"
      ];
      
      // Fungsi untuk mendapatkan opsi keterangan dari local storage atau nilai default jika tidak ada
      const getKeteranganOptions = () => {
        const storedOptions = localStorage.getItem('tableKetMonth');
        return storedOptions ? JSON.parse(storedOptions).map((row) => row.keterangan) : initialKeteranganOptions;
      };
      
      // Inisialisasi sinyal dengan opsi keterangan
      const [keteranganOptions, setKeteranganOptions] = createSignal<string[]>(getKeteranganOptions());

  return (
    <div>
        <div>
        
        <div class="dropdown-keterangan">
        <label for="keteranganDropdown">Keterangan:</label>
        <br />
        {/* Gunakan dropdown di sini */}
        <select
            id="keteranganDropdown"
            // value={selectedOption()}
            // onChange={(e) => setSelectedOption(e.target.value)}
            style={{width:"45vh"}}
        >
          <option value="" disabled selected></option>
          {typeof keteranganOptions() === 'function' ? (
              // Handle the case where keteranganOptions is a function
              // You might want to provide a default value or handle this case differently
              <option value="">Pilih Keterangan</option>
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
            
        <div class="container-weekly-insent" style={{display:'flex', "flex-direction":"row"}}>
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
               <div class="custom-dropdown-coa" ref={dropdownRef}>
                <div class="dropdown-selected" onClick={() => setIsOpen(!isOpen())} style={{"justify-content":"space-between", display:"flex", "flex-direction":"row"}}>
                    <div>{selectedOption() || ""}</div>
                    <div>
                        {isOpen() ? 
                        <svg xmlns="http://www.w3.org/2000/svg" class="mt-1" width="10" height="15" viewBox="0 0 15 15"><g transform="translate(0 15) scale(1 -1)"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></g></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" class="mt-1" width="10" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></svg>
                        }
                    </div>
                    {/* {isOpen() ? "▲" : "▼"} */}
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
            
            <div class="tambah-data-weekly">
                <button onClick={addRow}>Tambah</button>
            </div>
        </div>
        <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "126vh" }}>
            <AgGridSolid 
                gridOptions={gridOptions} 
                onGridReady={onGridReady} 
                rowData={rowData()} 
            />
            <div class="detail-total-weekly-insent">
                <div>TOTAL</div>
                <div>Rp{calculateTotal()}</div>
            </div>
        </div>
        
        <div class="btn-simpan-weekly-insent">
            <button onClick={handlePopUp}>Simpan</button>
        </div>

        </div>
        {popUp() && <PengajuanWeekly OnClose={ClosePopUp} total2={Totall()} total={calculateTotal()}/>}
        {isEditPopupInsenOpen() && <FormEditWeekly OnClose={CloseEditPopUpInsen} />}
        {isDeletePopupInsenOpen() && <ConfirmPopUpWeeklyInsen OnClose={CloseDeletePopUpInsen} />}
    </div>
  );
};

export default PengajuanWeeklyInsentif;
