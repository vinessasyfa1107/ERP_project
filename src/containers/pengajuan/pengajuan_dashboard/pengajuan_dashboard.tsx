import { onMount, type Component } from 'solid-js';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import AgGridSolid from 'ag-grid-solid';

import './pengajuan_dashboard.css';
import Pengajuan_navbar from '../pengajuan_navbar';
import ChartPlanning from '../../dashboard/plannings/chart-planning';
import TablePlanning from '../../dashboard/plannings/table/table-planning';
import TableDetailPlan from '../../dashboard/plannings/table/table-detail-plan';
import FormPlanning from '../../dashboard/plannings/form/form-planning';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';

const Pengajuan_dashboard: Component = () => {
    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Dashboard");
    })

    return (
        <div>
            <Pengajuan_navbar />
            <div class="pengajuanDashboard_container1">
                <div class="pengajuanDashboard_container2">
                    <div class="component-1">
                        <ChartPlanning />
                        <div>
                            <div style={{display:"flex", "flex-direction":"row", "justify-content":"space-between", "margin-bottom":"5px"}}>
                                <div>
                                    <h1 style={{"padding-top":"5px"}}>Keterangan</h1>
                                </div>
                                <div class="rightcp">
                                    <input type="text" placeholder="Search.." name="search" />
                                    <span class="search-icon">
                                        <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                                    </span>
                                    <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                                </div>
                            </div>
                            <TablePlanning />
                        </div>
                    </div>

                    <div class="rencanaPengajuan-container">
                        <h1>List Rencana Pengajuan</h1>
                        <TableDetailPlan />
                        {/* <FormPlanning /> */}
                    </div>

                </div>
            </div>
            
        </div>
    );
};


export default Pengajuan_dashboard;