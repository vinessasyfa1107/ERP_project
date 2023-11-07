import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './pengeluaran.css'

interface PengeluaranProps {
    OnClose: () => void;
}

const PengeluaranCreate: Component<PengeluaranProps> = (props) => {
    const [selectedFile, setSelectedFile] = createSignal<File | null>(null);

    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files && target.files[0];
    
        if (file) {
            setSelectedFile(() => file);
        } else {
          setSelectedFile(null);
        }
      };

    const [formData, setFormData] = createSignal({
        id: 0,
        expense_ts:'',
        amount: 0,
        faktur_ts: '',
        coa_kd: '',
        keterangan: '',
        // evidence: null
    });

    const [isOpen, setIsOpen] = createSignal(false);
    const [selectedOption, setSelectedOption] = createSignal('');
    const options = [
        "2-1001", "2-2000", "2-2001", "2-3000",
        "2-3016", "2-4000", "2-4001", "2-5000", "2-5001", "2-6000",
        "2-8001", "2-8002", "2-9000", "2-9993",
        "5-0000", "5-1010", "5-1020",
        "6-0000", "6-1001", "6-1002",
        "6-1003",
        "6-1004",
        "6-1005",
        "6-2003",
        "6-2004",
        "6-2005",
        "6-2006",
        "6-2007",
        "6-2008",
        "6-2009",
        "6-2010",
        "9-0000",
        "9-1001"
      ];
       

    const handleSubmit = async (e) => {
        e.preventDefault();
        
            const formattedDate = `${formData().expense_ts}T00:00:00`;

            const dataToSend = {
                id: 0,
                expense_ts: formattedDate,
                amount: formData().amount,
                faktur_ts: formData().faktur_ts,
                coa_kd: selectedOption(),
                keterangan: formData().keterangan,
                evidence: selectedFile()
                };

            console.log('data expense: ', dataToSend);

            try {
                const response = await fetch(`/api/expense/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
        
                if (response.ok) {
                    // Data berhasil diubah, tampilkan alert
                    alert('Data berhasil diubah');
                        window.location.href = '/report/Pengeluaran';
                    window.location.reload();
                    props.OnClose();
                } else {
                    // Gagal mengubah data, tampilkan pesan kesalahan dari respons
                    const errorMessage = await response.text();
                    alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
                    console.error('Gagal mengubah data:', errorMessage);
                }
            } catch (error) {
                // Terjadi kesalahan jaringan atau kesalahan lainnya, tampilkan alert dengan pesan kesalahan
                alert('Terjadi kesalahan. Silakan coba lagi.');
                console.error('Terjadi kesalahan:', error);
            }
        };

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
    
    

    return (
        <div class="overlay">


        <div class="pengeluaran-data">
         
                <div class="pengeluaran-form">
                    <form method="dialog">
                        <div class="headakun">
                        <h2>Tambah Laporan Pengeluaran <span>(*Tidak boleh kosong)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-pengeluaran">

                        <div style={{"display":"flex", "justify-content":"space-between"}}>
                                <div class='date' >
                                <label>Tanggal*</label>
                                    <input type="date" name="trip-start"
                                    value={formData().expense_ts} 
                                    onInput={(e) => setFormData({ ...formData(), expense_ts: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label>Faktur*</label>
                                    <br />
                                    <input type="text" 
                                        name="onlynumbers" 
                                        pattern="\d{1,5}"  
                                        // maxlength="5"
                                        value={formData().faktur_ts} 
                                        onInput={(e) => setFormData({ ...formData(), faktur_ts: e.target.value })}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div style={{"display":"flex", "justify-content":"space-between"}}>
                                <div>
                                    <label>Jumlah*</label>
                                    <br />
                                    <input
                                    type="number"
                                    name="kodeCOA" // Ganti cd_account dengan kodeAkun
                                    value={formData().amount !== 0 ? formData().amount.toString() : ''} // Render an empty string for 0 value
                                    onInput={(e) => {
                                        const newAmount = parseFloat(e.target.value);
                                        if (!isNaN(newAmount)) {
                                            setFormData({ ...formData(), amount: newAmount });
                                        } else {
                                            // Handle invalid input here (e.g., show an error message)
                                        }
                                    }}
                                    />
                                </div>

                                <div>
                                    <label>COA*</label>
                                    <br />
                                    <div class="custom-dropdown-coa" ref={dropdownRef}>
                                    <div class="dropdown-selected" onClick={() => setIsOpen(!isOpen())} style={{"justify-content":"space-between", display:"flex", "flex-direction":"row"}}>
                                        <div>{selectedOption() || ""}</div>
                                        <div>
                                            {isOpen() ? 
                                            <svg xmlns="http://www.w3.org/2000/svg"  width="13" height="15" viewBox="0 0 15 15"><g transform="translate(0 15) scale(1 -1)"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></g></svg>
                                            : <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></svg>
                                            }
                                        </div>
                                        {/* {isOpen() ? "▲" : "▼"} */}
                                    </div>
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
                                    {/* <select
                                    name="namaCOA" // Ganti cd_account dengan kodeAkun
                                    value={formData().coa_kd} 
                                    onInput={(e) => setFormData({ ...formData(), coa_kd: e.target.value })}
                                    >
                                        <option value="2-1001">2-1001</option>
                                        <option value="2-2000">2-2000</option>
                                        <option value="2-3000">2-3000</option>
                                        <option value="2-3001">2-3001</option>
                                        <option value="2-3016">2-3016</option>
                                        <option value="2-4000">2-4000</option>
                                        <option value="2-4001">2-4001</option>
                                        <option value="2-5000">2-5000</option>
                                        <option value="2-5001">2-5001</option>
                                        <option value="2-6000">2-6000</option>
                                        <option value="2-8001">2-8001</option>
                                        <option value="2-8002">2-8002</option>
                                        <option value="2-8003">2-8003</option>
                                        <option value="2-8004">2-8004</option>
                                        <option value="2-8005">2-8005</option>
                                        <option value="2-9000">2-9000</option>
                                        <option value="2-9993">2-9993</option>

                                        <option value="6-0000">6-0000</option>
                                        <option value="6-1001">6-1001</option>
                                        <option value="6-1002">6-1002</option>
                                        <option value="6-1003">6-1003</option>
                                        <option value="6-1004">6-1004</option>
                                        <option value="6-1005">6-1005</option>

                                        <option value="6-2003">6-2003</option>
                                        <option value="6-2004">6-2004</option>
                                        <option value="6-2005">6-2005</option>
                                        <option value="6-2006">6-2006</option>
                                        <option value="6-2007">6-2007</option>
                                        <option value="6-2008">6-2008</option>
                                        <option value="6-2009">6-2009</option>
                                        <option value="6-2010">6-2010</option>

                                        <option value="8-0000">8-0000</option>
                                        <option value="8-1001">8-1001</option>

                                    </select> */}
                                </div>
                            </div>

                            <div >
                                <div>
                                    <label>Deskripsi*</label>
                                    <br />
                                    <textarea class="textarea textarea-bordered" 
                                    style={{ "background": '#F8F8F9',
                                             "box-shadow": "0px 2px 4px 0px rgb(0 0 0 / 25%) inset",
                                             "width": "78vh", height:"10vh"}}
                                    value={formData().keterangan} 
                                    onInput={(e) => setFormData({ ...formData(), keterangan: e.target.value })}
                                    >
                                    </textarea>
                                </div>
                            </div>

                            <div>
                                <label>Bukti*</label>
                                <div class="container-bukti">
                                <div class="box-bukti">
                                    <Icon icon="bxs:image" class="icon-file" width="50" height="50" />
                                </div>
                                <div class="container-2">
                                    <p>Pilih file dengan format .png atau .jpg ke dalam form atau tarik & lepas file tersebut.</p>
                                    <label for="file-upload"><Icon icon="ic:baseline-folder" color="white" width="30" height="30" /></label>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        accept=".png, .jpg"
                                        style="display: none"
                                        onChange={handleFileChange}
                                        />
                                  
                                  {selectedFile() && (
                                                        <p>File yang dipilih: {selectedFile().name}</p>
                                                    )}                                          
                            </div>
                        </div>
                            </div>


                        </div>

                        <br />
                        <div class="btn-kirim-data">
                            <button onClick={handleSubmit}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
    );
};



export default PengeluaranCreate;


