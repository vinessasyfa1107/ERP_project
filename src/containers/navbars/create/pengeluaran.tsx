import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './form-edit-coa.css'

interface PengeluaranProps {
    OnClose: () => void;
    dataId: number;
    balance: number; // Tambahkan properti balance

}

const PengeluaranCreate: Component<PengeluaranProps> = (props) => {

    const [coa_kd, setCoaKd] = createSignal('');
    const [coa_name, setCoaName] = createSignal('');
    const [category, setCategory] = createSignal('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'kodeCOA') {
            setCoaKd(value);
        } else if (name === 'namaCOA') {
            setCoaName(value);
        } else if (name === 'kategori') {
            setCategory(value);
        }
    };

    const saveChanges = async () => {
        try {
            const dataToSend = {
                coa_kd: coa_kd(),
                coa_name: coa_name(),
                category: category(),
                balance: props.balance,
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


        <div class="edit-data">
         
                <div class="edit-form">
                    <form method="dialog">
                        <div class="headakun">
                        <h2>Tambah Laporan Pengeluaran <span>(*Tidak boleh kosong)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-form">

                        <div style={{"display":"flex"}}>
                                <div>
                                    <label>Tanggal*</label>
                                    <br />
                                    <input
                                    type="text"
                                    name="kodeCOA" // Ganti cd_account dengan kodeAkun
                                    value={coa_kd()}
                                    onChange={handleInputChange}
                                    />
                                </div>

                                <div style={{"margin-left":"3.5vw"}}>
                                    <label>Kategori*</label>
                                    <br />
                                    <input
                                    type="text"
                                    name="namaCOA" // Ganti cd_account dengan kodeAkun
                                    value={coa_name()}
                                    onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div style={{"display":"flex"}}>
                                <div>
                                    <label>Faktur*</label>
                                    <br />
                                    <input
                                    type="text"
                                    name="kodeCOA" // Ganti cd_account dengan kodeAkun
                                    value={coa_kd()}
                                    onChange={handleInputChange}
                                    />
                                </div>

                                <div style={{"margin-left":"3.5vw"}}>
                                    <label>COA*</label>
                                    <br />
                                    <input
                                    type="text"
                                    name="namaCOA" // Ganti cd_account dengan kodeAkun
                                    value={coa_name()}
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
                                    value={coa_kd()}
                                    onChange={handleInputChange}
                                    />
                                </div>

                                <div style={{"margin-left":"3.5vw"}}>
                                    <label>Tag*</label>
                                    <br />
                                    <input
                                    type="text"
                                    name="namaCOA" // Ganti cd_account dengan kodeAkun
                                    value={coa_name()}
                                    onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div >
                                <div>
                                    <label>Deskripsi*</label>
                                    <br />
                                    <textarea class="textarea textarea-bordered" 
                                    placeholder="Bio"
                                    style={{ "background": '#F8F8F9',
                                             "box-shadow": "0px 2px 4px 0px rgb(0 0 0 / 25%) inset",
                                             "width": "37.5vw" }}>
                                    </textarea>
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


export default PengeluaranCreate;



// import type {