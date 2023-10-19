import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './edit-akun-master.css'

interface EditAkunMasterProps {
    OnClose: () => void;
    dataId: number;
}

const EditAkunMaster: Component<EditAkunMasterProps> = (props) => {

    // const { dataId } = props;


    // const [id, setId] = createSignal(dataId); // Inisialisasi dengan nilai default
    const [formData, setFormData] = createSignal({
        account_name: '',
        email: '',
        access: '',
        role: [],
        category: ''
    });

    // Mengatur nilai id saat baris di tabel diklik atau data dimuat dari backend
    // setId(dataId); // dataId adalah nilai ID yang diteruskan sebagai prop

    // Kemudian, Anda dapat mengakses nilai id seperti ini:
    // const idValue = id(); // Mendapatkan nilai id

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     if (name === 'kodeCOA') {
    //         setCoaKd(value);
    //     } else if (name === 'namaCOA') {
    //         setCoaName(value);
    //     } else if (name === 'kategori') {
    //         setCategory(value);
    //     }
    // };

    const saveChanges = async () => {
        try {
            const dataToSend = {
                id: props.dataId,
                account_name: formData().account_name,
                email: formData().email,
                access: formData().access,
                role: formData().role,
                categoty: formData().category
            };

            console.log(dataToSend);
    
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

    const [selectedItems, setSelectedItems] = createSignal<string[]>([]);


    onMount(() => {
        const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];

        const updateSelectedItems = () => {
            const selectedItemsText = checkboxes
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);
            setSelectedItems(selectedItemsText);
        };

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", updateSelectedItems);
        });

        onCleanup(() => {
            checkboxes.forEach((checkbox) => {
                checkbox.removeEventListener("change", updateSelectedItems);
            });
        });

        updateSelectedItems();

    });

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
                                <input type="text" required 
                                value={formData().account_name}
                                onInput={(e) => setFormData({ ...formData(), account_name: e.target.value })}
                                />
                            </p>

                         
                            <p>
                                <label>Email*</label>
                                <br />
                                <input type="text" required 
                                value={formData().email}
                                onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
                                />
                            </p>

                            <p>
                                <label>Access*</label>
                                <br />
                                    <select id="access" name="access" required
                                    value={formData().access}
                                    onChange={(e) => setFormData({ ...formData(), access: e.target.value })}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="direktur keuangan">Direktur Keuangan</option>
                                        <option value="direktur utama">Direktur Utama</option>
                                    </select>  
                            </p>
                            
                            <div class="edit-options">
                            <div style={{ display: 'flex', "flex-direction": "column" }}>
                            <label>Posisi*</label>
                                <div class="dropdown dropdown-bottom">
                                    <label tabindex="0" class="drop-posisi">
                                        {selectedItems().length > 0 ? selectedItems().join(", ") : ""}
                                    </label>
                                    <ul tabindex="0" class="dropdown-content z-[1] 2 shadow bg-base-100 rounded-box w-44">
                                        <li class="posisi-opsi">
                                            <label >
                                                <a style={{display: 'flex'}}>
                                                    <input type="checkbox" value="Customer" 
                                                    checked={selectedItems().includes("Customer")}
                                                    onChange={(e) => {
                                                        setSelectedItems((prevSelectedItems) => {
                                                            if (e.target.checked) {
                                                                return [...prevSelectedItems, "Customer"];
                                                            } else {
                                                                return prevSelectedItems.filter(role => role !== "Customer");
                                                            }
                                                        });
                                                
                                                        // Perbarui formData
                                                        setFormData((prevFormData) => {
                                                            return {
                                                                ...prevFormData,
                                                                role: selectedItems(),
                                                            };
                                                        });
                                                    }}
                                                    /> 
                                                    <p style={{"margin-left": '20px'}}>Customer</p>
                                                </a>
                                            </label>
                                        </li>
                                        <li class="posisi-opsi">
                                            <label>
                                                <a style={{display: 'flex'}}>
                                                    <input type="checkbox" value="Supplier" 
                                                    onChange={(e) => {
                                                        setSelectedItems((prevSelectedItems) => {
                                                            if (e.target.checked) {
                                                                return [...prevSelectedItems, "Supplier"];
                                                            } else {
                                                                return prevSelectedItems.filter(role => role !== "Supplier");
                                                            }
                                                        });
                                                
                                                        // Perbarui formData
                                                        setFormData((prevFormData) => {
                                                            return {
                                                                ...prevFormData,
                                                                role: selectedItems(),
                                                            };
                                                        });
                                                    }}
                                                    /> 
                                                    <p style={{"margin-left": '20px'}}>Supplier</p>
                                                </a>
                                            </label>
                                        </li>
                                        <li class="posisi-opsi">
                                            <label >
                                                <a style={{display: 'flex'}}>
                                                    <input type="checkbox" value="Employee" 
                                                    checked={selectedItems().includes("Employee")}
                                                    onChange={(e) => {
                                                        setSelectedItems((prevSelectedItems) => {
                                                            if (e.target.checked) {
                                                                return [...prevSelectedItems, "Employee"];
                                                            } else {
                                                                return prevSelectedItems.filter(role => role !== "Employee");
                                                            }
                                                        });
                                                
                                                        // Perbarui formData
                                                        setFormData((prevFormData) => {
                                                            return {
                                                                ...prevFormData,
                                                                role: selectedItems(),
                                                            };
                                                        });
                                                    }}
                                                    /> 
                                                    <p style={{"margin-left": '20px'}}>Employee</p>
                                                </a>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </div>

                            <p>
                                <label>Kategori*</label>
                                <br />
                                <input type="text" required
                                    value={formData().category}
                                    onInput={(e) => setFormData({ ...formData(), category: e.target.value })}
                                />
                            </p>

        
                        </div>

                        <br />
                        <div class="btn-add-acc">
                            <button onClick={saveChanges}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};


export default EditAkunMaster;