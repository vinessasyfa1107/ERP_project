import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './tambah-akun-master.css'

interface TambahAkunMasterProps {
    OnClose: () => void;
}

const TambahAkunMaster: Component<TambahAkunMasterProps> = (props) => {

    const [formData, setFormData] = createSignal({
        username: '',
        email: '',
        access: '',
        category: '',
        password: '',
    });

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        };
    

    return (
        <div class="tambah-acc-master">
         
                <div class="tambah-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Tambah Akun <span>(*Required)</span></h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-form">

                            <p>
                                <label>Username*</label>
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

                            <p>
                                <label>Password*</label>
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
    );
};


export default TambahAkunMaster;