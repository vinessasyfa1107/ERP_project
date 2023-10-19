import { createSignal, type Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './form-tambah-coa.css'

const FormTambahCOA: Component = () => {

    const handleCloseClick = () => {
        const modal = document.getElementById('form_modal_1') as HTMLDialogElement;
        modal.close();
    };

    const [formData, setFormData] = createSignal({
        id: 0,
        coa_kd: '',
        coa_name: '',
        category: '',
        balance: 0,
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch('/api/coa/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData()),
        });
    
        if (response.ok) {
          console.log('Data berhasil diinput'); // Tampilkan pesan sukses
          alert('Data berhasil ditambah');
          window.location.reload();
          const modal = document.getElementById('form_modal_1') as HTMLDialogElement;
          modal.close();          // Reset form
          setFormData({
            id: 0,
            coa_kd: '',
            coa_name: '',
            category: '',
            balance: 0,
          });
        } else {
            const errorMessage = await response.text();
            alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
            console.error('Gagal mengubah data:', errorMessage);
        }
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
                                <label>Kode Akun*</label>
                                <br />
                                <input type="text" required 
                                value={formData().coa_kd} 
                                onInput={(e) => setFormData({ ...formData(), coa_kd: e.target.value })}
                                />
                            </p>

                            <p>
                                <label>Nama COA*</label>
                                <br />
                                <input type="text" required
                                value={formData().coa_name} 
                                onInput={(e) => setFormData({ ...formData(), coa_name: e.target.value })} 
                                />
                            </p>

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
                        <div class="btn-kirim">
                            <button onClick={handleSubmit}><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};


export default FormTambahCOA;