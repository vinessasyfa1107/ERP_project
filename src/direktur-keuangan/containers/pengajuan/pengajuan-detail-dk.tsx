import { createSignal, type Component, onMount } from 'solid-js';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';
// import './pengajuan_detail.css'
// import { namaPengajuanEvent } from '../../navbars/create/kategori_pengajuan/pengajuan_event/pengajuan-event/nama-pengajuan-event';
import { A } from '@solidjs/router';
import { getNamaPengajuanEvent, getNamaPengajuanMonthly, getNamaPengajuanWeekly } from '../../../store/Pengajuan/nama-pengajuan';
import TableWeeklyDK from './table-weekly-dk';
import TableMonthlyDK from './table-monthly-dk';
import TableEventDK from './table-event-dk';
import TableDetailPlan from '../dashboard-dk/planning/table-detail-plan/table-detail-plan';
import TablePengajuanBaru from '../../../containers/dashboard/plannings/table/table-pengajuan-baru';
import TablePengajuanBaruDK from '../dashboard-dk/planning/table-detail-plan/table-pengajuan-baru-dk';
const [selectedCategory, setSelectedCategory] = createSignal('');

export {selectedCategory, setSelectedCategory}

const PengajuanDetailDK: Component = () => {

    const [, { changeSubTitleNavbar }] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Pengajuan Tersimpan");
    })

    const [showWeekly, setShowWeekly] = createSignal(true);


    return (
        <div>
            <div class="pengajuan-detail-container">
                {/* <TableDetailPlan/> */}
                <TablePengajuanBaruDK/>
                <TableWeeklyDK/>
                <TableEventDK/>
                <TableMonthlyDK/>
                {/* <div style={{ "margin-top": "20px" }}>
                    <h1 style={{ "font-size": "18px" }}>Detail Pengajuan Monthly</h1>
                    <TablePengajuanDetailDK />
                </div>

                <div style={{ "margin-top": "20px" }}>
                    <h1 style={{ "font-size": "18px" }}>Detail Pengajuan Weekly</h1>
                    <TablePengajuanDetailDKWeekly />
                </div>

                <div style={{ "margin-top": "20px" }}>
                    <h1 style={{ "font-size": "18px" }}>Detail Pengajuan Event</h1>
                    <Table_event_detail />
                </div> */}
                
                {/* {selectedCategory() === 'Weekly' && <TablePengajuanDetailDKWeekly />}
                {selectedCategory() === 'Event' && <Table_event_detail />}
                {selectedCategory() === 'Monthly' && <TablePengajuanDetailDK />} */}

                {/* {showWeekly() && (<TablePengajuanDetailDK /> || <TablePengajuanDetailDKWeekly /> || <Table_event_detail />)} */}
            </div>

        </div>
    );
};


export default PengajuanDetailDK;