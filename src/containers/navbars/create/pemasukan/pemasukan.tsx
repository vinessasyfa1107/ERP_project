import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './pemasukan.css'

interface PemasukanProps {
    OnClose: () => void;
}

const PemasukanCreate: Component<PemasukanProps> = (props) => {
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


      const [message, setMessage] = createSignal('');

      const handleDragEnter = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        // Ubah tampilan area drop jika diperlukan
      };
    
      const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };
    
      const handleDragLeave = () => {
        // Kembalikan tampilan area drop ke kondisi awal jika diperlukan
      };
    
      const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          const file = files[0];
          setMessage(`File yang diunggah: ${file.name}`);
          // Anda dapat menangani file yang diunggah di sini, misalnya mengunggahnya ke server atau melakukan operasi lain.
        }
      };

    const [formData, setFormData] = createSignal({
        id: 0,
        income_ts:'',
        amount: 0,
        faktur_ts: '',
        coa_kd: '',
        keterangan: '',
        // evidence: null
    });


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

    const handleSubmit = async (e) => {
        e.preventDefault();

            const formattedDate = `${formData().income_ts}T00:00:00`;

            const dataToSend1 = {
                id: 0,
                income_ts: formattedDate,
                amount: formData().amount,
                faktur_ts: formData().faktur_ts,
                coa_kd: selectedOption(),
                keterangan: formData().keterangan,
                evidence: selectedFile()
                };
            
                const dataToSend = new FormData();
                dataToSend.append('id', '0');
                dataToSend.append('income_ts', `${formData().income_ts}T00:00:00`);
                dataToSend.append('amount', formData().amount !== null ? formData().amount.toString() : '');
                dataToSend.append('faktur_ts', formData().faktur_ts !== null ? formData().faktur_ts.toString() : '');
                dataToSend.append('coa_kd', selectedOption());
                dataToSend.append('keterangan', formData().keterangan !== null ? formData().keterangan.toString() : '');
                dataToSend.append('evidence', selectedFile());

            console.log('data income: ', dataToSend);

            try {
                const response = await fetch(`/api/income/`, {
                    method: 'POST',
                    body: dataToSend,
                });
        
                if (response.ok) {
                    // Data berhasil diubah, tampilkan alert
                    alert('Data berhasil diubah');
                        window.location.href = '/report/pemasukan';
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


        <div class="pemasukan-data">
         
                <div class="pemasukan-form">
                    <form method="dialog">
                        <div class="headakun">
                        <h2>Tambah Laporan Pemasukan <span>(*Tidak boleh kosong)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-pemasukan">

                        <div style={{"display":"flex", "justify-content":"space-between"}}>
                                <div class='date' >
                                <label>Tanggal*</label>
                                    <input type="date" name="trip-start"
                                    value={formData().income_ts} 
                                    onInput={(e) => setFormData({ ...formData(), income_ts: e.target.value })}
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
                                                <svg xmlns="http://www.w3.org/2000/svg" class="mt-1" width="13" height="15" viewBox="0 0 15 15"><g transform="translate(0 15) scale(1 -1)"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></g></svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" class="mt-1" width="13" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M7.5 12L0 4h15l-7.5 8Z"/></svg>
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
                                <div class="box-bukti"
                                 onDragEnter={handleDragEnter}
                                 onDragOver={handleDragOver}
                                 onDragLeave={handleDragLeave}
                                 onDrop={handleDrop}
                                >
                                    <Icon icon="bxs:image" class="icon-file" width="50" height="50" />
                                    <p>{message()}</p>
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



export default PemasukanCreate;


