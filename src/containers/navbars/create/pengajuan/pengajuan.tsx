import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './pengajuan.css'

interface PengajuanProps {
    OnClose: () => void;
}

const PengajuanCreate: Component<PengajuanProps> = (props) => {

    const [id, setId] = createSignal(0);
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
                id: 0,
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

    return (
        <div class="overlay">


        <div class="pengajuan-data">
         
                <div class="pengajuan-form">
                    <form method="dialog">
                        <div class="headakun">
                        <h2>Form Pengajuan </h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-pengajuan">

                            <div style={{"display":"flex", "justify-content":"space-between"}}>
                                <div>
                                    <label>Tanggal*</label>
                                    <br />
                                    <input type="date" name="trip-start" 
                                    value="enter a date range"/>
                                    {/* <span class="iconify bg-primary-content" data-icon="mdi:clipboard-text-clock-outline"></span>
                                    </input> */}
                                    {/* <input type="date" name="trip-start" /> */}
                                </div>

                                <div>
                                    <label>COA*</label>
                                    <br />
                                    <input
                                    type="number"
                                    name="namaCOA" // Ganti cd_account dengan kodeAkun
                                    value={coa_pemasukan()}
                                    onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label>Keterangan*</label>
                                <br />
                                <textarea class="textarea textarea-bordered" 
                                style={{ "background": '#F8F8F9',
                                         "box-shadow": "0px 2px 4px 0px rgb(0 0 0 / 25%) inset",
                                         "width": "78vh", margin:'auto' }}>
                                </textarea>
                            </div>

                            <div style={{"display":"flex", "justify-content":"space-between"}}>
                                <div>
                                <label>Kategori*</label>
                                    <br />
                                    <select>
                                        <option disabled selected></option> 
                                        <option>Event</option>
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                        <option>Etc</option>
                                    </select>
                                </div>


                                <div>
                                    <label>Jenis*</label>
                                    <br />
                                    <select>
                                        <option disabled selected></option>
                                        <option>Marketing</option>
                                        <option>Project</option>
                                        <option>Rutinitas</option>
                                        <option>Event</option>
                                        <option>DLL</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{"display":"flex", "justify-content":"space-between"}}>
                                <div>
                                    <label>Jumlah*</label>
                                    <br />
                                    <input
                                    type="number"
                                    name="kodeCOA" // Ganti cd_account dengan kodeAkun
                                    value={faktur_pemasukan()}
                                    onChange={handleInputChange}
                                    />
                                </div>


                                <div>
                                    <label>Tag*</label>
                                    <br />
                                    <select>
                                        <option disabled selected></option>
                                        <option>VIP</option>
                                        <option>In Progress</option>
                                        <option>Urgen</option>
                                        <option>Bug</option>
                                        <option>VVIP</option>
                                    </select>
                                </div>
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



export default PengajuanCreate;



