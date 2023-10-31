import { onCleanup, type Component, createSignal } from 'solid-js';
import './form_approve.css';
import { Icon } from '@iconify-icon/solid';

interface EditPopUpProps {
    OnClose: () => void;
}

const Form_approve: Component<EditPopUpProps> = (props) => {

    return (
        <div class="overlay">
            <div class="form-confirm">

                <div class="modal-form">
                    <form method="dialog">
                        <div class="headakun">
                            <h2>Draft Pengajuan</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="isi-form">

                            <label>Tanggal</label>
                            <br />
                            <input type="date" readonly />


                            <p>
                                <label>Keterangan</label>
                                <br />
                                <textarea class="textarea textarea-bordered"
                                    style={{
                                        "background": '#F8F8F9',
                                        "box-shadow": "0px 2px 4px 0px rgb(0 0 0 / 25%) inset",
                                        "width": "78vh", "height": "12vh", margin: 'auto'
                                    }}
                                    readonly
                                >
                                </textarea>
                            </p>

                            <div style={{ "display": "flex", "justify-content":"space-between","padding-right":"10px" }}>
                                <div>
                                    <label>Kategori</label>
                                    <br />
                                    <input type="text" readonly style={{"width":"13rem"}} />
                                </div>

                                <div>
                                    <label>Jenis</label>
                                    <br />
                                    <input type="text" readonly style={{"width":"13rem"}}/>
                                </div>

                            </div>

                            <p>
                                <label>Jumlah</label>
                                <br />
                                <input type="number" readonly />
                            </p>

                            <p>
                                <label>Tag*</label>
                                <br />
                                <input type="text" readonly />
                            </p>

                        </div>

                        <br />
                        <div class="btn-add-acc">
                            <button style={{"background-color":"rgba(132, 103, 255, 0.80)", 
                            "border-radius":"5px", 
                            "width":"7rem",
                            "height":"2rem", 
                            "margin-right":"30px"}}>Approved</button>
                            <button style={{"background-color":"#F56D59", 
                            "border-radius":"5px", 
                            "width":"7rem",
                            "height":"2rem"}}>Rejected</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Form_approve;
