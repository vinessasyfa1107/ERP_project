
import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './edit-monthly-plan.css'
import { RowData } from '../operasional-tamanhas';

interface EditMonthlyPlanProps {
    OnClose: () => void;
    rowData: RowData | null;
    handleEdit: () => void; 
    // balance: number; // Tambahkan properti balance

}

const EditMonthlyPlan: Component<EditMonthlyPlanProps> = (props) => {

    const { rowData } = props;
    const [editedData, setEditedData] = createSignal({
      kebutuhan: rowData ? rowData.kebutuhan : '',
      coa: rowData ? rowData.coa : '',
      qty: rowData ? rowData.qty : 0,
      uom: rowData ? rowData.uom : '',
      price: rowData ? rowData.price : 0,
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    // const handleEdit = () => {
    //     // Anda bisa mengganti kondisi ini sesuai dengan kebutuhan validasi Anda
    //     if (
    //       editedData().kebutuhan !== '' &&
    //       editedData().coa !== '' &&
    //       editedData().qty !== 0 &&
    //       editedData().uom !== '' &&
    //       editedData().price !== 0
    //     ) {
    //       // Lakukan proses edit di sini
    //       if (props.rowData) {
    //         setRowData((prevData) => {
    //           const updatedData = prevData.map((row) =>
    //             areRowsEqual(row, props.rowData) ? { ...row, ...editedData() } : row
    //           );
      
    //           localStorage.setItem('tableData', JSON.stringify(updatedData));
      
    //           // Hitung kembali total setelah edit
    //           calculateTotal();
      
    //           // Setelah proses edit selesai, Anda mungkin ingin menutup popup
    //           props.OnClose();
      
    //           return updatedData;
    //         });
    //       }
    //     } else {
    //       alert('Semua kolom harus diisi');
    //     }
    //   };
      

    return (
        <div class="overlay">


        <div class="edit-monthly-plan">
         
                <div class="form-edit">
                    <form method="dialog">
                        <div class="head-acc">
                            <h2>Edit Data Pengajuan</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="form-pengajuan">
                         
                            <p>
                                <label>Kebutuhan*</label>
                                <br />
                                <input
                                type="text"
                                name="namaCOA"
                                />
                            </p>

                            <p>
                                <label>COA*</label>
                                <br />
                                <input
                                type="text"
                                name="kodeCOA" 
                                />
                            </p>

                            <p>
                                <label>Qty*</label>
                                <br />
                                <input
                                type="number"
                                name="kodeCOA" 
                                />
                            </p>

                            <p>
                                <label>Unit*</label>
                                <br />
                                <input
                                type="number"
                                name="kodeCOA" 
                                />
                            </p>

                            <p>
                                <label>Price*</label>
                                <br />
                                <input
                                type="number"
                                name="kodeCOA" 
                                />
                            </p>
                
                        </div>

                        <br />
                        <div class="btn-save-edit">
                            <button ><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
    );
};


export default EditMonthlyPlan;