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
                     <h2>Form Confirm</h2>
                     <button onClick={props.OnClose}>✕</button>
                 </div>

                 <div class="isi-form">

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
                                <Icon icon="bxs:image" class="icon-file" width="50" height="50" />
                            </div>
                            <div class="container-2">
                                <p>Pilih file dengan format .png atau .jpg ke dalam form atau tarik & lepas file tersebut.</p>
                                <button class="btn-upload"><Icon icon="ic:baseline-folder" color="white" width="30" height="30" /></button>
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
