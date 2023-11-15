import { createSignal, type Component, onMount, createEffect, onCleanup } from 'solid-js';
import './nama-pengajuan-weekly.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation, useNavigate } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PengajuanWeekly from '../../../pengajuan-weekly/pengajuan-weekly';

interface NamaPengajuanWeeklyProps {
    OnClose: () => void;
}

type RowData = {
    keterangan: string;
    totalplan?: number;
  };

  const [namaPengajuanWeekly, setNamaPengajuanWeekly] = createSignal("");

export {namaPengajuanWeekly}

const NamaPengajuanWeekly: Component<NamaPengajuanWeeklyProps> = (props) => {
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
      
      <div class="nama-pengajuan-1-weekly">
        <div class="keterangan-weekly">
            <h2>Weekly  <span>(*Tidak boleh kosong)</span></h2>
            <button onClick={props.OnClose}>✕</button>
        </div>
        <div class="nama-pengajuan-weekly" >

                <div class="tambah-nama-pengajuan-weekly">
                    <label>Nama Pengajuan</label>
                    <br />
                    <input type="text" 
                    value={namaPengajuanWeekly()}
                    onInput={(e) => setNamaPengajuanWeekly(e.target.value)}
                    />
                    <button onClick={submitForm}>Kirim</button>
                </div>


        </div>
    </div>
    {pageKeterangan() && <PengajuanWeekly OnClose={props.OnClose} pengajuanweekly={namaPengajuanWeekly()}/>}
    </div>
  );
};

export default NamaPengajuanWeekly;
