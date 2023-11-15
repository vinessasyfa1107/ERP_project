import { onCleanup, type Component, createSignal } from 'solid-js';
import './form-confirm.css';
import { Icon } from '@iconify-icon/solid';

interface EditPopUpProps {
    OnClose: () => void;
    data: {
        id: number,
        entry_ts: string,
        description: string,
        planningtype: string,
        category: number,
        amount: number,
        coa_kd: string,
        status: string
    }
    confirm: boolean;
}

const FormConfirm: Component<EditPopUpProps> = (props) => {
    const [inputFile, setInputFile] = createSignal(null);
    const [confirmStatus, setConfirmStatus] = createSignal(props.confirm);
    const [formSubmitted, setFormSubmitted] = createSignal(false);

    const handleFileInputChange = () => {
        if (inputFile() && inputFile()!.files.length > 0) {
            console.log("File yang dipilih:", inputFile()!.files[0].name);
        }
    };

    onCleanup(() => {
        setInputFile(null);
    });

    const [status, setStatus] = createSignal('');
    const [timestamp, setTimestamp] = createSignal('');


    const handleInputChange = async (e) => {
        // Menggunakan timestamp saat ini dalam format ISO 8601
        if (formSubmitted()) {
            alert('Form sudah dikirim sebelumnya.');
            return;
        }

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 11);

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        const timestamp = `${formattedDate}${formattedTime}`;

        console.log("tanggal dan waktu: ", timestamp);
        setTimestamp(timestamp);
        setConfirmStatus(!confirmStatus());
        updateStatus();

    };



    const categoryValueMap = {
        "Marketing": 1,
        "Projek": 2,
        "Rutinitas": 3,
        "Event": 4,
        "DLL": 5
    };

    // Fungsi bantuan untuk mendapatkan nilai dari category string
    function getCategoryValue(category) {
        return categoryValueMap[category] || 0; // Nilai default jika tidak ada pemetaan
    }

    // Menggunakan fungsi getCategoryValue untuk mendapatkan nilai
    const category = props.data.category;
    const categoryValue = getCategoryValue(category);


    const updateStatus = async () => {
        if (formSubmitted()) {
            alert('Form sudah dikirim sebelumnya.');
            return;
        }

        const updateStatusToSend = {
            id: props.data.id,
            entry_ts: timestamp(),
            coa_kd: props.data.coa_kd,
            description: props.data.description,
            planningtype: props.data.planningtype,
            category: categoryValue,
            amount: props.data.amount,
            status: props.data.status,
            confirm: confirmStatus()
        }
        console.log("test", updateStatusToSend);

        try {
            const response = await fetch(`/api/planning/${(props.data.id)}`, {
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

    return (
        <div class="overlay">
            <div class="form-confirm">

                <div class="modal-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Form Confirm</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-form">

                            <label>ID Perencanaan*</label>
                            <br />
                            <input type="text"
                                value={props.data.id}
                                readonly />


                            <p>
                                <label>Keterangan*</label>
                                <br />
                                <input type="text"
                                    value={props.data.description}
                                    readonly />
                            </p>

                            <p>
                                <label>Status*</label>
                                <br />
                                <input type="text"
                                    value={props.data.status}
                                    readonly />
                            </p>

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
                        <div class="btn-add-acc">
                            <button disabled={formSubmitted()} onClick={handleInputChange}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default FormConfirm;
