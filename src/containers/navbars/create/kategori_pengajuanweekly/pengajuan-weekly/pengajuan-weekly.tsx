import { createSignal, type Component, onMount } from 'solid-js';
import './pengajuan-weekly.css'
import { Icon } from '@iconify-icon/solid';
import { A, useLocation } from '@solidjs/router';
import { Totall2 } from '../../../../../store/Pengajuan/Weekly-satu/weekly-insen-satu';

interface PengajuanWeeklyProps {
  OnClose: () => void;
  total?: number,
  total2?: number
}

const PengajuanWeekly: Component<PengajuanWeeklyProps> = (props) => {

  const [Table1, setTable1] = createSignal(false);

  const [Table2, setTable2] = createSignal(false);

  function handleTable1() {
    setTable1(!Table1())
  }

  function handleTable2() {
    setTable2(!Table2())
  }

  const CalculateAllTotal = () => {
    let AllTotal = Totall2()
    return AllTotal;
  };

  const location = useLocation();

  return (
    <div class="overlay">

      <div class="pengajuan-weekly-1">
        <div class="keterangan">
          <h2>Weekly  <span>(*Tidak boleh kosong)</span></h2>
          <button onClick={props.OnClose}>✕</button>
        </div>
        <div class="pengajuan-weekly">
          <div class="create">
            <label tabindex="0" class="btn m-auto bg-[#f56d59] text-white rounded-10 capitalize ">+ Tambah</label>
          </div>

          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Keterangan</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><A href='/pengajuan-weekly/pengajuanweekly-insentif' onClick={props.OnClose}>Keperluan Rutin Bulanan</A></td>
                <td>Rp{Totall2()}</td>
              </tr>
              <tr>
                <td>2</td>
                <td><A href='/pengajuan-weekly/operasional-rutin-purwokerto'>Keperluan Reimburse (Project & Marketing)</A></td>
                <td>Rp{props.total2}</td>
              </tr>
              <tr>
                <td></td>
                <td>TOTAL</td>
                <td>Rp{CalculateAllTotal()}</td>
              </tr>
            </tbody>
          </table>
          
          {/* Add the Submit button here */}
          <button class="submit-button" onClick={() => console.log("Submit clicked")}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PengajuanWeekly;
