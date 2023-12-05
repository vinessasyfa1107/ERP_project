import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './form_transfer.css';

interface EditPopUpProps {
    OnClose: () => void;
    data: {
        id: number,
        entry_ts: string,
        namapengajuan: string,
        tipepengajuan: string,
        category: string,
        total: number,
        status: string
    }
}
const Form_transfer: Component<EditPopUpProps> = (props) => {

    const [formSubmitted, setFormSubmitted] = createSignal(false);

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

    const [timestamp, setTimestamp] = createSignal('');
    const [status, setStatus] = createSignal('');


    const handleInputChange = async (e) => {
        // Menggunakan timestamp saat ini dalam format ISO 8601
        const { value } = e.target;
        setStatus(value);

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 11);

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        const timestamp = `${formattedDate}${formattedTime}`;

        console.log("tanggal dan waktu: ", timestamp);
        setTimestamp(timestamp);
        updateStatus();
    };

    // const categoryValueMap = {
    //     "Marketing": 1,
    //     "Projek": 2,
    //     "Rutinitas": 3,
    //     "Event": 4,
    //     "DLL": 5
    // };

    // Fungsi bantuan untuk mendapatkan nilai dari category string
    // function getCategoryValue(category) {
    //     return categoryValueMap[category] || 0; // Nilai default jika tidak ada pemetaan
    // }

    // Menggunakan fungsi getCategoryValue untuk mendapatkan nilai
    // const category = props.data.category;
    // const categoryValue = getCategoryValue(category);


    const updateStatus = async () => {
        const updateStatusToSend = {
            id: props.data.id,
            entry_ts: timestamp(),
            namapengajuan: props.data.namapengajuan,
            tipepengajuan: props.data.tipepengajuan,
            total: props.data.total,
            status: props.data.status,
        }
        console.log("test", updateStatusToSend);

        try {
            const response = await fetch(`/api/pengajuan/${(props.data.id)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateStatusToSend),
            });

            if (response.ok) {
                setFormSubmitted(true);
                // Data berhasil diubah, tampilkan alert
                alert('Data berhasil diubah');
                props.OnClose();
                window.location.reload();
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

    const formatRupiah = (value) => {
        const numericValue = Number(value);

        if (isNaN(numericValue)) {
            return value;
        }

        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(numericValue);
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
                                    <input type="string" value={props.data.entry_ts}
                                        readonly />
                                </div>

                                <div>
                                    <label>Biaya*</label>
                                    <br />
                                    <input value={formatRupiah(props.data.total)}
                                        readonly>
                                    </input>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label>Keterangan*</label>
                                    <br />
                                    <textarea class="textarea textarea-bordered" value={props.data.namapengajuan}
                                        readonly
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
                                    <input value={props.data.tipepengajuan}
                                        readonly>
                                    </input>
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
                            <button onClick={handleInputChange}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};



export default Form_transfer;


