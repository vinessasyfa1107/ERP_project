import type { Component } from 'solid-js';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './pengeluaran.css'

interface PengeluaranProps {
    OnClose: () => void;

}

const PengeluaranCreate: Component<PengeluaranProps> = (props) => {


    const [tanggal_pemasukan, setTanggalPemasukan] = createSignal('');
    const [kategori_pemasukan, setKategoriPemasukan] = createSignal('');
    const [faktur_pemasukan, setFakturPemasukan] = createSignal('');
    const [coa_pemasukan, setCoaPengeluaran] = createSignal('');
    const [jumlah_pemasukan, setJumlahPengeluaran] = createSignal('');
    const [tag_pemasukan, setTagPengeluaran] = createSignal('');
    const [deskripsi_pemasukan, setDeskripsiPengeluaran] = createSignal('');
    const [bukti_pemasukan, setBuktiPengeluaran] = createSignal('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'kodeCOA') {
            setTanggalPemasukan(value);
        } else if (name === 'namaCOA') {
            setKategoriPemasukan(value);
        } else if (name === 'kategori') {
            setFakturPemasukan(value);
        }
    };

    const saveChanges = async () => {
        try {
            const dataToSend = {
                tanggal_pemasukan: tanggal_pemasukan(),
                kategori_pemasukan: kategori_pemasukan(),
                faktur_pemasukan: faktur_pemasukan(),
                coa_pemasukan: coa_pemasukan(),
                jumlah_pemasukan: jumlah_pemasukan(),
                tag_pemasukan: tag_pemasukan(),
                deskripsi_pemasukan: deskripsi_pemasukan(),
                bukti_pemasukan: bukti_pemasukan(),
                // balance: props.balance,
            };
    
            const response = await fetch(`/api/coa/update`, {
                method: 'PUT',
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

                        <div style={{"display":"flex"}}>
                                <div class='date' >
                                <label>Tanggal*</label>
                                    <input type="date" name="trip-start" style={{ "border-radius": '5px', height: '3vw' }}
                                    value="enter a date range"
                                    class="input input-bordered bg-primary-content input-ghost input-xs w-full max-w-xs" >
                                    <span class="iconify bg-primary-content" data-icon="mdi:clipboard-text-clock-outline"></span>
                                    </input>
                                    {/* <input type="date" name="trip-start" /> */}
                                </div>

                                <div style={{"margin-left":"3.5vw"}}>
                                    <label>Kategori*</label>
                                    <br />
                                    <select style={{ "margin-right": "1vw", "width":"17vw", "background": "#F8F8F9"}}
                                        class="select select-bordered w-full max-w-xs">
                                        <option disabled selected></option> 
                                        <option>Event</option>
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                        <option>Etc</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{"display":"flex"}}>
                                <div>
                                    <label>Faktur*</label>
                                    <br />
                                    <input type="text" 
                                    name="onlynumbers" 
                                    pattern="\d{1,5}"  
                                    maxlength="5">
                                        
                                    </input>
                                </div>

                                <div style={{"margin-left":"3.5vw"}}>
                                    <label>COA*</label>
                                    <br />
                                    <input
                                    type="number"
                                    style={{"appearance": "textfield", "-webkit-appearance": "none"}}
                                    name="namaCOA" // Ganti cd_account dengan kodeAkun
                                    value={coa_pemasukan()}
                                    onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div style={{"display":"flex"}}>
                                <div>
                                    <label>Jumlah*</label>
                                    <br />
                                    <input
                                    type="text"
                                    name="kodeCOA" // Ganti cd_account dengan kodeAkun
                                    value={jumlah_pemasukan()}
                                    onChange={handleInputChange}
                                    />
                                </div>

                                <div style={{"margin-left":"3.5vw"}}>
                                    <label>Tag*</label>
                                    <br />
                                    <select style={{ "margin-right": "1vw", "width":"17vw", "background": "#F8F8F9"}}
                                        class="select select-bordered w-full max-w-xs">
                                        <option disabled selected></option>
                                        <option>VIP</option>
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
                                             "width": "37.5vw" }}>
                                    </textarea>
                                </div>
                            </div>

                            <div>
                                <label>Bukti*<span style={{"font-size": "1.5vh"}}>(Pilih file dengan format .png atau .jpg ke dalam form)</span></label>
                                <br />
                                <input style={{"width":"30vw", "height":"6vh", "margin-top": "1vh"}}
                                type="file" class="file-input file-input-ghost w-full max-w-xs" 
                                />
                            </div>


                        </div>

                        <br />
                        <div class="btn-edit-coa">
                            <button onClick={saveChanges}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
    );
};



export default PengeluaranCreate;


