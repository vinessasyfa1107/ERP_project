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
        id: 0,
        account_name: '',
        email: '',
        access: '',
        role: '',
        category: ''
    });


    //fungsi untuk dropdown posisi
    const [selectedItems, setSelectedItems] = createSignal<string[]>([]);
    const [isDropdownOpen, setDropdownOpen] = createSignal(false);
  
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
                                <input type="text"  
                                value={formData().account_name}
                                onInput={(e) => setFormData({ ...formData(), account_name: e.target.value})}
                                />
                            </p>

                         
                            <p>
                                <label>Email*</label>
                                <br />
                                <input type="text"  
                                value={formData().email}
                                onInput={(e) => setFormData({ ...formData(), email: e.target.value})}
                                />
                            </p>

                            <div class="options">
                            <p>
                                <label>Access*</label>
                                <br />
                                <select id="access" name="access">
                                    <option value="admin">Admin</option>
                                    <option value="supplier">Direktur Keuangan</option>
                                    <option value="employee">Direktur Utama</option>
                                </select>
                            </p>
                        

                                <div style={{display:'flex', "flex-direction":"column"}}>
                                <label>Posisi*</label>
                                <div class={`dropdown ${isDropdownOpen() ? "show" : ""}`}>
                                    <button id="dropdown-toggle" class="drop-posisi" > {selectedItems().length > 0 ? selectedItems().join(", ") : "Pilih posisi"}</button>
                                    <div class="dropdown-content" id="dropdown-content">
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
                                </div>
                            
                            </div>

                            <p>
                                <label>Kategori*</label>
                                <br />
                                <input type="text"  
                                value={formData().category}
                                onInput={(e) => setFormData({ ...formData(), category: e.target.value})}
                                />
                            </p>

                            <p>
                                <label>Password*</label>
                                <br />
                                <input type="text"  
                                />
                            </p>
                
                        </div>

                        <br />
                        <div class="btn-add-acc">
                            <button><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};


export default TambahAkunMaster;