import { createSignal, type Component, onMount, createEffect, onCleanup } from 'solid-js';
import './nama-pengajuan-event.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation, useNavigate } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PengajuanEvent from './pengajuan-event';

interface NamaPengajuanEventProps {
    OnClose: () => void;
}

type RowData = {
    keterangan: string;
    totalplan?: number;
  };

  const [namaPengajuanEvent, setNamaPengajuanEvent] = createSignal("");

export {namaPengajuanEvent}

const NamaPengajuanEvent: Component<NamaPengajuanEventProps> = (props) => {
    const navigate = useNavigate();
    const [pageKeterangan, setPageKeterangan] = createSignal(false);

    function showPageKeterangan(){
        setPageKeterangan(true)
    }
    function closePageKeterangan(){
        setPageKeterangan(false)
    }

    const submitForm = () => {
        showPageKeterangan();
        // props.OnClose();
    };

  const location = useLocation();

  return (
    <div class="overlay">
      
      <div class="nama-pengajuan-1-event">
        <div class="keterangan-event">
            <h2>Event  <span>(*Tidak boleh kosong)</span></h2>
            <button onClick={props.OnClose}>✕</button>
        </div>
        <div class="nama-pengajuan-event" >

                <div class="tambah-nama-pengajuan-event">
                    <label>Nama Pengajuan</label>
                    <br />
                    <input type="text" 
                    value={namaPengajuanEvent()}
                    onInput={(e) => setNamaPengajuanEvent(e.target.value)}
                    />
                    <button onClick={submitForm}>Kirim</button>
                </div>


        </div>
    </div>
    {pageKeterangan() && <PengajuanEvent OnClose={props.OnClose} pengajuanevent={namaPengajuanEvent()}/>}
    </div>
  );
};

export default NamaPengajuanEvent;
