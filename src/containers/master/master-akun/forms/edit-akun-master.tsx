import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './edit-akun-master.css'

interface EditAkunMasterProps {
    OnClose: () => void;
    dataId: number;
}

const EditAkunMaster: Component<EditAkunMasterProps> = (props) => {

    const { dataId } = props;


    const [coa_kd, setCoaKd] = createSignal('');
    const [coa_name, setCoaName] = createSignal('');
    const [category, setCategory] = createSignal('');
    const [id, setId] = createSignal(dataId); // Inisialisasi dengan nilai default

    // Mengatur nilai id saat baris di tabel diklik atau data dimuat dari backend
    setId(dataId); // dataId adalah nilai ID yang diteruskan sebagai prop

    // Kemudian, Anda dapat mengakses nilai id seperti ini:
    const idValue = id(); // Mendapatkan nilai id

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
                id: idValue,
                coa_kd: coa_kd(),
                coa_name: coa_name(),
                category: category(),
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
            <div class="edit-acc-master">
                <div class="edit-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Edit Akun <span>(*Required)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-form">

                            <p>
                                <label>Nama*</label>
                                <br />
                                <input type="text" required />
                            </p>

                         
                            <p>
                                <label>Email*</label>
                                <br />
                                <input type="text" required />
                            </p>

                            <p>
                                <label>Access*</label>
                                <br />
                                <input type="text" required />
                            </p>

                            <p>
                                <label>Kategori*</label>
                                <br />
                                <input type="text" required />
                            </p>

        
                        </div>

                        <br />
                        <div class="btn-add-acc">
                            <button><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};


export default EditAkunMaster;