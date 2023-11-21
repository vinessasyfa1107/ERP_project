import { createSignal, type Component, onMount } from 'solid-js';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';
import Pengajuan_navbar from '../pengajuan_navbar';
import './pengajuan_detail.css'
// import { namaPengajuanEvent } from '../../navbars/create/kategori_pengajuan/pengajuan_event/pengajuan-event/nama-pengajuan-event';
import { A } from '@solidjs/router';
import { getNamaPengajuanEvent, getNamaPengajuanMonthly, getNamaPengajuanWeekly } from '../../../store/Pengajuan/nama-pengajuan';
import TablePengajuanDetail from './table-pengajuan-detail';

const PengajuanDetail: Component = () => {

    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Pengajuan Tersimpan");
    })

    return (
        <div>
            <Pengajuan_navbar />
            <div class="pengajuan-detail-container">
                <A href="/pengajuan-event/pengajuan-event-detail">
                <div>
                    <h1>Pengajuan Event:</h1>
                    <p>{getNamaPengajuanEvent()}</p>
                </div>
                </A>

                <A href="/pengajuan-weekly/pengajuanweekly-insentif">
                <div>
                    <h1>Pengajuan Weekly:</h1>
                    <p>{getNamaPengajuanWeekly()}</p>
                </div>
                </A>

                <A href="/pengajuan-monthly/operasional-rutin-tamanhas">
                <div>
                    <h1>Pengajuan Monthly:</h1>
                    <p>{getNamaPengajuanMonthly()}</p>
                </div>
                </A>

                <div style={{"margin-top":"20px"}}>
                    <h1 style={{"font-size":"18px"}}>Detail Pengajuan Monthly</h1>
                    <TablePengajuanDetail/>
                </div>
            </div>

        </div>
    );
};


export default PengajuanDetail;