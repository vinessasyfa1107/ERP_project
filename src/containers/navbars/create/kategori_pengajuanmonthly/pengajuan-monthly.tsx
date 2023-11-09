import { createSignal, type Component, onMount } from 'solid-js';
import './pengajuan-monthly.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation } from '@solidjs/router';
// import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
// import { useSubNavbarStore } from '../../../../../../store/Navbar/SubNavbarStore';

interface PengajuanMonthlyProps {
    OnClose: () => void;
    total: number,
    total2: number,
    total3: number,
    total4: number,
    total5: number
}

const PengajuanMonthly: Component<PengajuanMonthlyProps> = (props) => {



    const [Table1, setTable1] = createSignal(false);

    const [Table2, setTable2] = createSignal(false);

    function handleTable1() {
        setTable1(!Table1())
    }

    function handleTable2() {
        setTable2(!Table2())
    }

    const CalculateAllTotal = () => {
        let AllTotal = props.total + props.total2 + props.total3 + props.total4 + props.total5;
        return AllTotal;
    };

  const location = useLocation();

  return (
    <div class="overlay">
      
      <div class="pengajuan-monthly-1">
    <div class="keterangan">
        <h2>Monthly  <span>(*Tidak boleh kosong)</span></h2>
        <button onClick={props.OnClose}>✕</button>
    </div>
    <div class="pengajuan-monthly">
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
                    <td><A href='/pengajuan-monthly/operasional-rutin-tamanhas' onClick={props.OnClose}>Operasional Rutin Tamanhas</A></td>
                    <td>Rp{props.total}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><A href='/pengajuan-monthly/operasional-rutin-purwokerto' onClick={props.OnClose}>Operasional Rutin Purwokerto</A></td>
                    <td>Rp{props.total2}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td><A href='/pengajuan-monthly/kebutuhan-project' onClick={props.OnClose}>Kebutuhan Project</A></td>
                    <td>Rp{props.total3}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td><A href='/pengajuan-monthly/kebutuhan-marketing' onClick={props.OnClose}>Kebutuhan Marketing</A></td>
                    <td>Rp{props.total4}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td><A href='/pengajuan-monthly/kebutuhan-maintenance-tools' onClick={props.OnClose}>Kebutuhan Maintenance & Tools</A></td>
                    <td>Rp{props.total5}</td>
                </tr>
                <tr class="isi-total-monthly">
                    <td></td>
                    <td>TOTAL ESTIMASI</td>
                    <td>Rp{CalculateAllTotal()}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div>
  );
};

export default PengajuanMonthly;
