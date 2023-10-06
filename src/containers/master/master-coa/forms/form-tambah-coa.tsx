import type { Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './form-tambah-coa.css'

const FormTambahCOA: Component = () => {

    const handleCloseClick = () => {
        const modal = document.getElementById('form_modal_1') as HTMLDialogElement;
        modal.close();
    };

    return (
        <div class="form-coa">
            <div class="btn-tambah-rencana">
                <button onClick={() => (document.getElementById('form_modal_1') as HTMLDialogElement).showModal()}><Icon icon="fa:plus" color="white" width="10" height="11" /></button>
            </div>

            <dialog id="form_modal_1" class="modal">
                <div class="modal-form-coa">
                    <form method="dialog">
                        <div class="headrencana">
                            <h2>Tambah COA Master <span>(*Tidak boleh kosong)</span></h2>
                            <button onClick={handleCloseClick}>✕</button>
                        </div>

                        <div class="isian-form">

                        <p>
                                <label>ID*</label>
                                <br />
                                <input type="text" required />
                            </p>

                         
                            <p>
                                <label>Kode Akun*</label>
                                <br />
                                <input type="text" required />
                            </p>

                            <p>
                                <label>Nama COA*</label>
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
                        <div class="btn-kirim">
                            <button><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};


export default FormTambahCOA;