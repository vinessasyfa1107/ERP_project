import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './tambah-akun.css'

interface TambahAkunProps {
    OnClose: () => void;
}

const TambahAkunCreate: Component<TambahAkunProps> = (props) => {

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


        <div class="tambah-akun-data">
         
                <div class="tambah-akun-form">
                    <form method="dialog">
                        <div class="headakun">
                        <h2>Tambah Akun  <span>(*Tidak boleh kosong)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-tambah-akun">

                            <div style={{"display":"flex", }}>
                                <div>
                                    <label>Username*</label>
                                    <br />
                                    <input 
                                    type="text"
                                    name="kodeCOA" // Ganti cd_account dengan kodeAkun
                                    value={faktur_pemasukan()}
                                    onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div style={{"display":"flex", }}>
                                <div>
                                    <label>Email*</label>
                                    <br />
                                    <input 
                                    type="text"
                                    name="kodeCOA" // Ganti cd_account dengan kodeAkun
                                    value={faktur_pemasukan()}
                                    onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div style={{"display":"flex"}}>
                                <div>
                                <label>Akses*</label>
                                    <br />
                                    <select style={{ "margin-right": "1vw", "width":"17vw", "background": "#F8F8F9"}}
                                        class="select select-bordered w-full max-w-xs">
                                        <option disabled selected></option> 
                                        <option>Admin</option>
                                        <option>Direktur Utama</option>
                                        <option>Direktur Keuangan</option>
                                    </select>
                                </div>


                                <div style={{"margin-left":"2.5vw"}}>
                                    <label>Posisi*</label>
                                    <br />
                                    <select style={{  "width":"17vw", "background": "#F8F8F9"}}
                                        class="select select-bordered w-full max-w-xs">
                                        <option disabled selected></option>
                                        <option>Employee</option>
                                        <option>Supplier</option>
                                        <option>Customer</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{"display":"flex", }}>
                                <div>
                                    <label>Kategori*</label>
                                    <br />
                                    <input 
                                    type="text"
                                    name="kodeCOA" // Ganti cd_account dengan kodeAkun
                                    value={faktur_pemasukan()}
                                    onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div style={{"display":"flex", }}>
                                <div>
                                    <label>Password*</label>
                                    <br />
                                    <input 
                                    type="text"
                                    name="kodeCOA" // Ganti cd_account dengan kodeAkun
                                    value={faktur_pemasukan()}
                                    onChange={handleInputChange}
                                    />
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



export default TambahAkunCreate;