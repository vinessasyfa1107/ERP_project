import { createSignal, type Component, onMount } from 'solid-js';
import './pengajuan-event.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';

interface PengajuanEventProps {
    OnClose: () => void;
}

const PengajuanEvent: Component<PengajuanEventProps> = (props) => {



    const [Table1, setTable1] = createSignal(false);

    const [Table2, setTable2] = createSignal(false);

    function handleTable1() {
        setTable1(!Table1())
    }

    function handleTable2() {
        setTable2(!Table2())
    }

  const location = useLocation();

  return (
    <div class="overlay">
      
      <div class="pengajuan-event-1">
    <div class="headakun">
        <h2>Event  <span>(*Tidak boleh kosong)</span></h2>
        <button onClick={props.OnClose}>✕</button>
    </div>
    <div class="pengajuan-event">
    <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Keterangan</th>
                    <th>Plan</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><A href='/pengajuan-weekly/operasional-rutin-tamanhas'>Operasional Rutin Tamanhas</A></td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><A href='/pengajuan-weekly/operasional-rutin-purwokerto'>Operasional Rutin Purwokerto</A></td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Kebutuhan Project</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Kebutuhan Marketing</td>
                    <td>Rp</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Kebutuhan Maintenance & Tools</td>
                    <td>Rp</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div>
  );
};

export default PengajuanEvent;
