import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './form_transfer.css';

interface TutupFormTransfer {
    formData: any;
    OnClose: () => void;
}
const Form_transfer: Component<TutupFormTransfer> = (props) => {

    //========== UNTUK FILE FOTO ==========
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
        income_ts: '',
        amount: 0,
        faktur_ts: '',
        coa_kd: '',
        keterangan: '',
        // evidence: null
    });


    const [isOpen, setIsOpen] = createSignal(false);
    const [selectedOption, setSelectedOption] = createSignal('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDate = `${formData().income_ts}T00:00:00`;

        const dataToSend = {
            id: 0,
            income_ts: formattedDate,
            amount: formData().amount,
            faktur_ts: formData().faktur_ts,
            coa_kd: selectedOption(),
            keterangan: formData().keterangan,
            evidence: selectedFile()
        };

        console.log('data income: ', dataToSend);

        // try {
        //     const response = await fetch(`/api/income/`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(dataToSend),
        //     });

        //     if (response.ok) {
        //         // Data berhasil diubah, tampilkan alert
        //         alert('Data berhasil diubah');
        //             window.location.href = '/report/pemasukan';
        //         window.location.reload();
        //         props.OnClose();
        //     } else {
        //         // Gagal mengubah data, tampilkan pesan kesalahan dari respons
        //         const errorMessage = await response.text();
        //         alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
        //         console.error('Gagal mengubah data:', errorMessage);
        //     }
        // } catch (error) {
        //     // Terjadi kesalahan jaringan atau kesalahan lainnya, tampilkan alert dengan pesan kesalahan
        //     alert('Terjadi kesalahan. Silakan coba lagi.');
        //     console.error('Terjadi kesalahan:', error);
        // }
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
            <div class="form-transfer-container">
                <div class="transfer-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Transfer<span style={{ "color": "black" }}>(*Tidak boleh kosong)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="input-form-transfer">

                            <div style={{ "display": "flex", "justify-content": "space-between" }}>
                                <div class="date" >
                                    <label>Tanggal*</label>
                                    <input type="date" required />
                                </div>

                                <div>
                                    <label>Biaya*</label>
                                    <br />
                                    <input type="number" required>
                                    </input>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label>Keterangan*</label>
                                    <br />
                                    <textarea class="textarea textarea-bordered" required
                                        style={{
                                            "background": '#F8F8F9',
                                            "box-shadow": "0px 2px 4px 0px rgb(0 0 0 / 25%) inset",
                                            "width": "78.5vh", height: "10vh"
                                        }}>
                                    </textarea>
                                </div>
                            </div>

                            <div style={{ "display": "flex", "justify-content": "space-between" }}>
                                <div>
                                    <label>Kategori*</label>
                                    <br />
                                    <select required>
                                        <option disabled selected></option>
                                        <option value="Event">Event</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        {/* <option>Etc</option> */}
                                    </select>
                                </div>


                                <div>
                                    <label>Jenis*</label>
                                    <br />
                                    <select required>
                                        <option disabled selected></option>
                                        <option value="1">Marketing</option>
                                        <option value="2">Project</option>
                                        <option value="3">Rutinitas</option>
                                        <option value="4">Event</option>
                                        <option value="5">DLL</option>
                                    </select>
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
                                            required
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



export default Form_transfer;


