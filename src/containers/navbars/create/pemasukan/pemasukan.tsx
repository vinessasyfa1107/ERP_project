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

    const [formData, setFormData] = createSignal({
        id: 0,
        income_ts:'',
        amount: 0,
        faktur_ts: '',
        coa_kd: '',
        keterangan: '',
        // evidence: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

            const formattedDate = `${formData().income_ts}T00:00:00`;

            const dataToSend = {
                id: 0,
                income_ts: formattedDate,
                amount: formData().amount,
                faktur_ts: formData().faktur_ts,
                coa_kd: formData().coa_kd,
                keterangan: formData().keterangan,
                evidence: selectedFile()
                };

            console.log('data income: ', dataToSend);

            try {
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
                                    <select class="scrollable-select-coa-income"
                                    name="namaCOA" // Ganti cd_account dengan kodeAkun
                                    value={formData().coa_kd} 
                                    onInput={(e) => setFormData({ ...formData(), coa_kd: e.target.value })}
                                    >
                                        <option value="1-0000">1-0000</option>
                                        <option value="1-1000">1-1000</option>
                                        <option value="1-1100">1-1100</option>
                                        <option value="1-1101">1-1101</option>
                                        <option value="1-1102">1-1102</option>

                                        <option value="1-1201">1-1201</option>
                                        <option value="1-1202">1-1202</option>
                                        <option value="1-1203">1-1203</option>
                                        <option value="1-1204">1-1204</option>
                                        <option value="1-1300">1-1300</option>
                                        <option value="1-1400">1-1400</option>
                                        <option value="1-1401">1-1401</option>
                                        <option value="1-1402">1-1402</option>
                                        <option value="1-1403">1-1403</option>
                                        <option value="1-1404">1-1404</option>

                                        <option value="1-1600">1-1600</option>
                                        <option value="1-1700">1-1700</option>

                                        <option value="1-1801">1-1801</option>
                                        <option value="1-1801">1-1801</option>
                                        <option value="1-1802">1-1802</option>
                                        <option value="1-1803">1-1803</option>
                                        
                                        <option value="3-0000">3-0000</option>
                                        <option value="3-7000">3-7000</option>
                                        <option value="3-8000">3-8000</option>
                                        <option value="3-9000">3-9000</option>
                                        <option value="3-9999">3-9999</option>

                                        <option value="8-0000">8-0000</option>
                                        <option value="8-1001">8-1001</option>

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


