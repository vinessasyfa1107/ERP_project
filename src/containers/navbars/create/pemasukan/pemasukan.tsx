import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './pemasukan.css'

interface PemasukanProps {
    OnClose: () => void;
}

const PemasukanCreate: Component<PemasukanProps> = (props) => {


    const [inputFile, setInputFile] = createSignal(null);

    const handleFileInputChange = () => {
      if (inputFile() && inputFile()!.files.length > 0) {
        console.log("File yang dipilih:", inputFile   ()!.files[0].name);
      }
    };
  
    onCleanup(() => {
      setInputFile(null);
    });

    const [formData, setFormData] = createSignal({
        id: 0,
        income_ts:'',
        amount: 0,
        faktur_ts: '',
        coa_kd: '',
        keterangan: '',
        // evidence:''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!formData().coa_kd || !formData().coa_name || !formData().category) {
        //     alert('Mohon isi semua kolom yang dibutuhkan.');
        //     return; // Menghentikan pengiriman jika ada input yang kosong
        const saveChanges = async () => {
            try {
                const dataToSend = {
                    
                };
        
                const response = await fetch(`/api/income/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
        
                if (response.ok) {
                    // Data berhasil diubah, tampilkan alert
                    alert('Data berhasil diubah');
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
    }



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
                                    <label>Kategori*</label>
                                    <br />
                                    <select
                                    value={formData().coa_kd} 
                                    onInput={(e) => setFormData({ ...formData(), coa_kd: e.target.value })}
                                    >
                                        <option disabled selected></option>
                                        <option>Event</option>
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                        <option>Etc</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{"display":"flex", "justify-content":"space-between"}}>
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

                                <div>
                                    <label>COA*</label>
                                    <br />
                                    <input
                                    type="number"
                                    name="namaCOA" // Ganti cd_account dengan kodeAkun
                                    value={formData().coa_kd} 
                                    onInput={(e) => setFormData({ ...formData(), coa_kd: e.target.value })}
                                    />
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
                                    <label>Tag*</label>
                                    <br />
                                    <select>
                                        <option disabled selected></option>
                                        <option>testVIP</option>
                                        <option>In Progress</option>
                                        <option>Urgen</option>
                                        <option>Bug</option>
                                        <option>VVIP</option>
                                    </select>
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
                                        onChange={handleFileInputChange}
                                        ref={inputFile}
                                    />
                            </div>
                        </div>
                            </div>


                        </div>

                        <br />
                        <div class="btn-edit-coa">
                            <button onClick={handleSubmit}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
    );
};



export default PemasukanCreate;


