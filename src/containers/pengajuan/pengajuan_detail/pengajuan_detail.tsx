import { createSignal, type Component, onMount } from 'solid-js';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';
import Pengajuan_navbar from '../pengajuan_navbar';
import './pengajuan_detail.css'
import { namaPengajuan } from '../../navbars/create/kategori_pengajuanmonthly/nama-pengajuan';
import NamaPengajuanWeekly, { namaPengajuanWeekly } from '../../navbars/create/kategori_pengajuanweekly/penguanweekly-rutin/pengajuanweekly-insentif/popup/nama-pengajuan-weekly';
import { namaPengajuanEvent } from '../../navbars/create/kategori_pengajuan/pengajuan_event/pengajuan-event/nama-pengajuan-event';
import { A } from '@solidjs/router';
import { getNamaPengajuanMonthly } from '../../../store/Pengajuan/Event/event-pengajuan';

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
                    <p>{namaPengajuanEvent()}</p>
                </div>
                </A>

                <A href="/pengajuan-weekly/pengajuanweekly-insentif">
                <div>
                    <h1>Pengajuan Weekly:</h1>
                    <p>{namaPengajuanWeekly()}</p>
                </div>
                </A>

                <A href="/pengajuan-monthly/operasional-rutin-tamanhas">
                <div>
                    <h1>Pengajuan Monthly:</h1>
                    <p>{getNamaPengajuanMonthly()}</p>
                </div>
                </A>
            </div>
        </div>
    );
};


export default PengajuanDetail;