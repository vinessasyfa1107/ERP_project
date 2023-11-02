import { onCleanup, type Component, createSignal } from 'solid-js';
import './form-approve-du.css';
import { Icon } from '@iconify-icon/solid';

interface FormApproveDUProps {
    OnClose: () => void;
    data: {
      id: number,
      entry_ts: string;
      description: string;
      planningtype: string;
      category: string;
      amount: number;
      coa_kd: string,
      // Tambahkan properti lain yang sesuai
    };
    // updateStatus: (status: string) => void;
  }

const FormApproveDU: Component<FormApproveDUProps> = (props) => {

    // const handleApprove = () => {
    //     props.updateStatus('approved'); // Call the function to update status as 'approved'
    //     props.OnClose(); // Close the popup
    //   };
    
    //   const handleReject = () => {
    //     props.updateStatus('rejected'); // Call the function to update status as 'rejected'
    //     props.OnClose(); // Close the popup
    //   };
    const [status, setStatus] = createSignal('');

    const handleInputChange = (e) => {
        const { value } = e.target; 
        setStatus(value);
        updateStatus(); 
      };
      

      const updateStatus = async () => {
        console.log("ini id ", props.data.id)
        const gebi = {
            id: props.data.id,
                entry_ts: props.data.entry_ts,
                description: props.data.description,
                planningtype: props.data.planningtype,
                category: props.data.category,
                amount: props.data.amount,
                coa_kd: props.data.coa_kd,
                status: status()
        }
        console.log("ini status", gebi);

          try {
            const response = await fetch (`/api/planning/${props.data.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: props.data.id,
                entry_ts: props.data.entry_ts,
                description: props.data.description,
                planningtype: props.data.planningtype,
                category: props.data.category,
                amount: props.data.amount,
                coa_kd: props.data.coa_kd,
                status: status()
              }),
            });
    
            if (response.ok) {
              // Data berhasil diubah, tampilkan alert
              alert('Data berhasil diubah');
            //   setPopUpOpen(false); // Close the popup
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
                            <button value='Approved' style={{"background-color":"rgba(132, 103, 255, 0.80)", 
                            "border-radius":"5px", 
                            "width":"7rem",
                            "height":"2rem", 
                            "margin-right":"30px"}} onClick={handleInputChange}>Approve</button>
                            <button value='Rejected' style={{"background-color":"#F56D59", 
                            "border-radius":"5px", 
                            "width":"7rem",
                            "height":"2rem"}} onClick={handleInputChange}>Reject</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default FormApproveDU;
