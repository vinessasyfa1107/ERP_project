import { createSignal, type Component, onMount, createEffect, onCleanup } from 'solid-js';
import './nama-pengajuan.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation, useNavigate } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PengajuanMonthly from './pengajuan-monthly';

interface NamaPengajuanProps {
    OnClose: () => void;
}

type RowData = {
    keterangan: string;
    totalplan?: number;
  };

  const [namaPengajuan, setNamaPengajuan] = createSignal("");

export {namaPengajuan}

const NamaPengajuan: Component<NamaPengajuanProps> = (props) => {
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
      
      <div class="nama-pengajuan-1">
        <div class="keterangan">
            <h2>Monthly  <span>(*Tidak boleh kosong)</span></h2>
            <button onClick={props.OnClose}>✕</button>
        </div>
        <div class="nama-pengajuan" >

                <div class="tambah-nama-pengajuan">
                    <label>Nama Pengajuan</label>
                    <br />
                    <input type="text" 
                    value={namaPengajuan()}
                    onInput={(e) => setNamaPengajuan(e.target.value)}
                    />
                    <button onClick={submitForm}>Kirim</button>
                </div>


        </div>
    </div>
    {pageKeterangan() && <PengajuanMonthly OnClose={props.OnClose} pengajuan={namaPengajuan()}/>}
    </div>
  );
};

export default NamaPengajuan;
