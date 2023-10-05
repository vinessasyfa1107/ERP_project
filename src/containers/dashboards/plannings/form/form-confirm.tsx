import type { Component } from 'solid-js';
import './form-confirm.css'
import { Icon } from '@iconify-icon/solid';

interface EditPopUpProps {
    OnClose: () => void;
}

const FormConfirm: Component<EditPopUpProps> = (props) => {
  return (
    <div>
        <div class="form-confirm">
         
         <div class="modal-form">
             <form method="dialog">
                 <div class="headakun">
                     <h2>Form Confirm <span>(*Required)</span></h2>
                     <button onClick={props.OnClose}>✕</button>
                 </div>

                 <div class="isian-form">

                         <label>ID Perencanaan*</label>
                         <br />
                         <input type="text" required />

                  
                     <p>
                         <label>Keterangan*</label>
                         <br />
                         <input type="text" required />
                     </p>

                     <p>
                         <label>Status*</label>
                         <br />
                         <input type="text" required />
                     </p>

                    <div>
                        <label>Bukti*</label>
                        <div class="container-bukti">
                            <div class="box-bukti">
                                Tes
                            </div>
                            <div>
                                <p>Pilih file dengan format .png atau .jpg ke dalam form atau tarik & lepas file tersebut.</p>
                            </div>
                        </div>
                    </div>



                 </div>

                 <br />
                 <div class="btn-add-acc">
                     <button><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                 </div>
             </form>
         </div>
 </div>
    </div>
  );
};

export default FormConfirm;
