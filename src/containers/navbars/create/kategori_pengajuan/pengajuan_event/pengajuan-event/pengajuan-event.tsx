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
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div>
  );
};

export default PengajuanEvent;
