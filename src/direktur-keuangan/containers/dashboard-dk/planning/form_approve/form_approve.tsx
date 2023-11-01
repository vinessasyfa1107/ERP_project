import { onCleanup, type Component, createSignal } from 'solid-js';
import './form_approve.css';
import { Icon } from '@iconify-icon/solid';

interface EditPopUpProps {
    OnClose: () => void;
    data: {
      entry_ts: string;
      description: string;
      planningtype: string;
      category: string;
      amount: number;
      // Tambahkan properti lain yang sesuai
    };
    updateStatus: (status: string) => void;
  }

const Form_approve: Component<EditPopUpProps> = (props) => {

    const handleApprove = () => {
        props.updateStatus('approved'); // Call the function to update status as 'approved'
        props.OnClose(); // Close the popup
      };
    
      const handleReject = () => {
        props.updateStatus('rejected'); // Call the function to update status as 'rejected'
        props.OnClose(); // Close the popup
      };

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
                            <input type="text" value={props.data.entry_ts} readonly />


                            <p>
                                <label>Keterangan</label>
                                <br />
                                <textarea class="textarea textarea-bordered"
                                    style={{
                                        "background": '#F8F8F9',
                                        "box-shadow": "0px 2px 4px 0px rgb(0 0 0 / 25%) inset",
                                        "width": "78vh", "height": "12vh", margin: 'auto'
                                    }}
                                    value={props.data.description}
                                    readonly
                                >
                                </textarea>
                            </p>

                            <div style={{ "display": "flex", "justify-content":"space-between","padding-right":"10px" }}>
                                <div>
                                    <label>Kategori</label>
                                    <br />
                                    <input type="text" 
                                    value={props.data.planningtype}
                                    readonly style={{"width":"13rem"}} />
                                </div>

                                <div>
                                    <label>Jenis</label>
                                    <br />
                                    <input type="text" 
                                    value={props.data.category}
                                    readonly style={{"width":"13rem"}}/>
                                </div>

                            </div>

                            <p>
                                <label>Jumlah</label>
                                <br />
                                <input type="number" 
                                value={props.data.amount}
                                readonly />
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
                            "margin-right":"30px"}} onClick={handleApprove}>Approved</button>
                            <button style={{"background-color":"#F56D59", 
                            "border-radius":"5px", 
                            "width":"7rem",
                            "height":"2rem"}} onClick={handleReject}>Rejected</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Form_approve;
