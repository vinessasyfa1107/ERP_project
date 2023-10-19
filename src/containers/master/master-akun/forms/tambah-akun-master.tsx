import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './tambah-akun-master.css'


const TambahAkunMaster: Component = () => {
    const handleCloseClick = () => {
        const modal = document.getElementById('form_modal_1') as HTMLDialogElement;
        modal.close();
    };

    const [formData, setFormData] = createSignal({
        account_id: 0,
        id: 0,
        username: '',
        account_name: '',
        email: '',
        access: '',
        role: [],
        category: '',
        password: ''
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Mendapatkan data dari form
        const formValues = formData();

        // Memisahkan data form untuk masing-masing tabel
        const DataLogin = {
            account_id: formValues.account_id,
            username: formValues.username,
            password: formValues.password,
        };

        const DataAccounRead = {
            id: formValues.id,
            account_name: formValues.account_name,
            email: formValues.email,
            access: formValues.access,
            role: formValues.role,
            category: formValues.category,
        };

        console.log(DataLogin);
        console.log(DataAccounRead);
        // Selanjutnya, Anda dapat mengirim data ke server untuk insert ke dua tabel
        // Misalnya, Anda bisa menggunakan fetch atau library seperti axios.

        const resetForm = () => {
            setFormData({
                account_id: 0,
                id: 0,
                username: '',
                account_name: '',
                email: '',
                access: '',
                role: [],
                category: '',
                password: ''
            });
        };

        try {
            const responseTable1 = await fetch('/api/accountread/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(DataAccounRead),
              });
            // Kirim data ke tabel pertama
            const responseTable2 = await fetch('/api/login/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(DataLogin),
            });
        
            // Kirim data ke tabel kedua
        
            if (responseTable1.ok && responseTable2.ok) {
              console.log('Data berhasil diinput');
              alert('Data berhasil ditambah');
              window.location.reload();
              const modal = document.getElementById('form_modal_1') as HTMLDialogElement;
              modal.close();
              
            } else {
              const errorMessageTable1 = await responseTable1.text();
              const errorMessageTable2 = await responseTable2.text();
              const errorMessage = `Gagal mengubah data. Pesan kesalahan (Tabel 1): ${errorMessageTable1}, (Tabel 2): ${errorMessageTable2}`;
              alert(errorMessage);
              console.error('Gagal mengubah data:', errorMessage);
            }
          } catch (error) {
            console.error('Gagal mengirim permintaan:', error);
          }

    };



    //fungsi untuk dropdown posisi
    const [selectedItems, setSelectedItems] = createSignal<string[]>([]);
    const [isDropdownOpen, setDropdownOpen] = createSignal(false);

    const toggleDropdown = () => {
        setDropdownOpen(isDropdownOpen());
    };

    onMount(() => {
        const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];

        const updateSelectedItems = () => {
            const selectedItemsText = checkboxes
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);
            setSelectedItems(selectedItemsText);
        };

        //   const closeDropdown = () => {
        //     setDropdownOpen(false);
        //   };

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", updateSelectedItems);
        });

        onCleanup(() => {
            checkboxes.forEach((checkbox) => {
                checkbox.removeEventListener("change", updateSelectedItems);
            });
        });

        // Initial update
        updateSelectedItems();

        // Handle closing dropdown when clicking outside
        //   document.addEventListener("click", (event) => {
        //     const target = event.target as HTMLElement; // Cast 'event.target' to HTMLElement
        //     if (!target.closest || !target.closest(".multiselect-container")) {
        //       closeDropdown();
        //     }
        //   });
    });

    // const toggleDropdown = () => {
    //   setDropdownOpen(!isDropdownOpen());
    // };


    return (
        <div class="tambah-acc-master">
            <div class="btn-tambah-akun">
                <button onClick={() => (document.getElementById('form_modal_1') as HTMLDialogElement).showModal()}><Icon icon="fa:plus" color="white" width="10" height="11" /></button>
            </div>

            <dialog id="form_modal_1" class="modal">
                <div class="tambah-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Tambah Akun <span>(*)</span></h2>
                            <button onClick={handleCloseClick}>✕</button>
                        </div>

                        <div class="isi-form">

                            <p>
                                <label>Username*</label>
                                <br />
                                <input type="text" required
                                    value={formData().username}
                                    onInput={(e) => setFormData({ ...formData(), username: e.target.value })}
                                />
                            </p>

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

                            <div class="options">
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


                                {/* <div style={{ display: 'flex', "flex-direction": "column" }}>
                                    <label>Posisi*</label>
                                    <div>
                                        <button class="drop-posisi" onChange={toggleDropdown}> {selectedItems().length > 0 ? selectedItems().join(", ") : "Pilih posisi"}</button>
                                        <div class="dropdown-content" >
                                            <div class="posisi-opsi">
                                                <label for="customer">Customer</label>
                                                <input type="checkbox" id="customer" value="Customer" />
                                            </div>

                                            <div class="posisi-opsi">
                                                <label for="supplier">Supplier</label>
                                                <input type="checkbox" id="supplier" value="Supplier" />
                                            </div>

                                            <div class="posisi-opsi">
                                                <label for="employee">Employee</label>
                                                <input type="checkbox" id="employee" value="Employee" />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
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

                            <p>
                                <label>Password*</label>
                                <br />
                                <input type="text" required
                                value={formData().password}
                                onInput={(e) => setFormData({ ...formData(), password: e.target.value })}
                                />
                            </p>

                        </div>

                        <br />
                        <div class="btn-add-acc">
                            <button onClick={handleFormSubmit}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};


export default TambahAkunMaster;