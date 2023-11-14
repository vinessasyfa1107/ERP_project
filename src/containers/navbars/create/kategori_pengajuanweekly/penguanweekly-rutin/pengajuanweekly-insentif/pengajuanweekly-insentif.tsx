import { createSignal, type Component, onCleanup, onMount, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './pengajuanweekly-insentif.css';
import PengajuanWeekly from '../../pengajuan-weekly/pengajuan-weekly';
import { Totall, setTotall2 } from '../../../../../../store/Pengajuan/Weekly-satu/weekly-insen-satu';
import { Icon } from '@iconify-icon/solid';
import FormEditWeekly from './forms/form-edit-weeklyinsen';
import ConfirmPopUpWeeklyInsen from './popup/confirmpopup';

interface Option {
  value: string;
  label: string
}

interface SelectedOption {
  value?: string;
  label?: string;
}

type RowData = {
  total: number;
  kebutuhan: string;
  price: number;
  coa: string;
  aksi?: object;
};

const PengajuanWeeklyInsentif: Component = () => {
    const [popUp, setPopUpInsen] = createSignal(false);

    function handlePopUp(){
        setPopUpInsen(true);
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
          // Coba ambil data dari localStorage saat komponen diinisialisasi
          const savedData = localStorage.getItem('tableData');
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
  

    const [EditPopUpInsen, setEditPopUpInsen] = createSignal(false);
    const [DeletePopUpInsen, setDeletePopUpInsen] = createSignal(false);

    function showEditPopUpInsen(){
      setEditPopUpInsen(true);
    }

    function showDeletePopUpInsen(){
      setDeletePopUpInsen(true);
    }

    function closePopUpInsen(){
      setEditPopUpInsen(false);
      setDeletePopUpInsen(false);
      setPopUpInsen(false);
    }

    const gridOptions = {
      columnDefs: [
        { valueGetter: 'node.rowIndex + 1', headerName: 'No', width: 60 },
        { field: "kebutuhan", headerName: "Kebutuhan", width: 200 },
        { field: "coa", headerName: "COA", width: 130 },
        { field: "price", headerName: "Price", width: 130 },
        // { field: "total", headerName: "Total", width: 150},
        {
          field: 'aksi', cellRenderer: (params: any) => {
            return (
              <div style={{  display: "flex", "justify-content": "space-between", width: "9vh" }}>
                <button onClick={showEditPopUpInsen}><Icon icon="iconamoon:edit" color="#40444b" width="18" height="18" /></button>
                <button onClick={showDeletePopUpInsen}><Icon icon="mdi:delete" color="#40444b" width="18" height="18" /></button>
              </div>
            );
          }
        }
      ],
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
      let Totall2 = 0;
      for (const row of gridData) {
        Totall2 += row.price;
      }
      setTotall2(Totall2); // Simpan total di toko
      return Totall2;
    };
  
    // onMount(() => {
    //   // Bersihkan localStorage saat komponen di-unmount
    //   onCleanup(() => {
    //     localStorage.removeItem('tableData');
    //   });
    // });
  //   const [keteranganOptions, setKeteranganOptions] = createSignal<string[] | (() => any)>(() => {
  //     const savedData = localStorage.getItem('tableKetWeekly');
  //     return savedData ? JSON.parse(savedData).map((row) => row.keterangan) : [];
  // });
  const [keteranganOptions, setKeteranganOptions] = createSignal<string[]>(
    localStorage.getItem('tableKetWeekly')
        ? JSON.parse(localStorage.getItem('tableKetWeekly')!).map((row: any) => row.keterangan)
        : []
  );

  // kode untuk buat dropdown searc
  const [inputValue, setInputValue] = createSignal('');
  // const [selectedOption, setSelectedOption] = createSignal<SelectedOption | null>({ value: undefined, label: undefined });

  const [selectedOption, setSelectedOption] = createSignal<SelectedOption | null>(null);
  const [options, setOptions] = createSignal<Option[]>([
      { value: '1-1300', label: '1-1300 Piutang Usaha' },
      { value: '1-1400', label: '1-1400 Biaya Dibayar DiMuka' },
      { value: '1-1401', label: '1-1401 By Perawatan diBayar dimuka' },
      { value: '1-1402', label: '1-1402 Biaya lain-lain dibayar dimuka' },
      { value: '1-1403', label: '1-1403 Deposit Telepon' },
      { value: '1-1404', label: '1-1404 Deposit Security' },
      { value: '1-1500', label: '1-1500 Pajak Dibayar Dimuka' },
      { value: '1-1501', label: '1-1501 PPh Pasal 21' },
      { value: '1-1506', label: '1-1506 PPN Masukan' },
      { value: '1-1801', label: '1-1801 Piutang Afiliasi' },
      { value: '1-1802', label: '1-1802 Piutang Daisen' },
      { value: '1-1803', label: '1-1803 Piutang Selangis Hidro' },
      { value: '1-1900', label: '1-1900 Piutang Lain-Lain' },
      { value: '1-1901', label: '1-1901 Piutang Karyawan' },
      { value: '1-2000', label: '1-2000 AKTIVA TETAP' },
      { value: '1-2001', label: '1-2001 Gedung kantor' },
      { value: '1-2002', label: '1-2002 Inventaris Kantor' },
      { value: '1-2003', label: '1-2003 Kendaraan' },
      { value: '1-3000', label: '1-3000 Investasi Jangka Panjang' },
      { value: '3-0000', label: '3-0000 MODAL' },
      { value: '3-7000', label: '3-7000 Modal Salam Disetor' },
      { value: '3-8000', label: '3-8000 Laba ditahan' },
      { value: '3-9000', label: '3-9000 Laba Tahun Berjalan' },
      { value: '3-9999', label: '3-9999 Historical Balancing Account' },
      { value: '4-0000', label: '4-0000 Pendapatan' },
      { value: '4-0001', label: '4-0001 Pendapatan dalam Negeri' },
      { value: '8-0000', label: '8-0000 Pendapatan Lain - Lain' },
      { value: '8-1001', label: '8-1001 Pendapatan Lain di luar usaha' },

      { value: '2-1001', label: '2-1001 Hutang Usaha' },
      { value: '2-2000', label: '2-2000 Hutang Gaji' },
      { value: '2-2001', label: '2-2001 Hutang Gaji' },
      { value: '2-3000', label: '2-3000 Hutang Pajak' },
      { value: '2-3016', label: '2-3016 Hutang PPN' },
      { value: '2-4000', label: '2-4000 Biaya Yang Masih Harus Dibayar' },
      { value: '2-4001', label: '2-4001 Biaya Yang Harus Dibayar' },
      { value: '2-5000', label: '2-5000 Hutang Jangka Pendek' },
      { value: '2-5001', label: '2-5001 Hutang Bank Jangka Pendek' },
      { value: '2-6000', label: '2-6000 Hutang Jangka Panjang' },
      { value: '2-8001', label: '2-8001 Hutang Afiliasi' },
      { value: '2-8002', label: '2-8002 Hutang Daisen' },
      { value: '2-9000', label: '2-9000 Deposit Sewa' },
      { value: '2-9993', label: '2-9993 Hutang Usaha' },
      { value: '5-0000', label: '5-0000 Beban Pendapatan' },
      { value: '5-1010', label: '5-1010 Biaya Proyek' },
      { value: '5-1020', label: '5-1020 Biaya Perjalanan Dinas Proyek' },
      { value: '6-0000', label: '6-0000 Beban Umum Administrasi' },
      { value: '6-1001', label: '6-1001 Gaji' },
      { value: '6-1002', label: '6-1002 Tunjangan Hari Raya' },
      { value: '6-1003', label: '6-1003 Bonus' },
      { value: '6-1004', label: '6-1004 Tunjangan Kesehatan' },
      { value: '6-1005', label: '6-1005 Biaya Office Boy' },
      { value: '6-2003', label: '6-2003 Biaya Perlengkapan Kantor' },
      { value: '6-2004', label: '6-2004 Biaya Alat Tulis Kantor' },
      { value: '6-2005', label: '6-2005 Biaya Pengiriman Dokumen / Pos' },
      { value: '6-2006', label: '6-2006 By Fotocopi, Brosur & Print' },
      { value: '6-2007', label: '6-2007 Biaya Materi' },
      { value: '6-2008', label: '6-2008 Biaya Telephone' },
      { value: '6-2009', label: '6-2009 Biaya Internet' },
      { value: '6-2010', label: '6-2010 Biaya TV Kabel' },
      { value: '9-0000', label: '9-0000 Biaya Lain-Lain' },
      { value: '9-1001', label: '9-1001 Biaya Adm Bank' },

    // Tambahkan opsi lainnya sesuai kebutuhan
  ]);
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
    if (need() && price() ) {
      const newRow: RowData = {
          kebutuhan: need(),
          price: price(),
          total: 0,
          coa: selectedOption()?.value,
          // aksi: aksi()
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

  const clearInputs = () => {
    setNeed("");
    setPrice(0);
    setCOA("");
  };

  return (
    <div class="operasional-rutin-tamanhas">
      <div>
        <h1>Form Tambah Pengajuan Weekly</h1>
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
        <div class="ag-theme-alpine z-0" style={{ height: "300px", width: "130vh" }}>
            <AgGridSolid 
                gridOptions={gridOptions} 
                onGridReady={onGridReady} 
                rowData={rowData()} 
            />
            <div class="detail-total-operasional">
                <div>TOTAL</div>
                <div>Rp{calculateTotal()}</div>
            </div>
        </div>
        
        <div class="btn-simpan-data-operasional">
            <button onClick={handlePopUp}>Simpan</button>
        </div>

        </div>
        {popUp() && <PengajuanWeekly OnClose={closePopUpInsen} total2={Totall()} total={calculateTotal()}/>}
        {EditPopUpInsen() && <FormEditWeekly OnClose={closePopUpInsen}/>}
        {DeletePopUpInsen() && <ConfirmPopUpWeeklyInsen OnClose={closePopUpInsen}/>}
    </div>
  );
};

export default PengajuanWeeklyInsentif;
