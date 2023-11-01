import { Component, onMount } from "solid-js";
import { useNavigate, A, Navigate } from '@solidjs/router';

import './kas-approval.css'
import { Icon } from '@iconify-icon/solid';
import { useSubNavbarStore } from "../../../../store/Navbar/SubNavbarStore";
import DashboardDU from "../dashboard-du";
import TableArusKas from "../../../../containers/dashboard/arus-kas/table-arus-kas";
import TableKasApproved from "./table/table-kas-approved";
import TableDaftarKas from "./table/table-kas-approved";



const KasApproval: Component = () => {
    
    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Kas Approval");
    }) 

    return (
        <div class="arus-kas">
            <DashboardDU/>
                {/* <div class="card-module">
                    <div style={{"font-family":"Manrope","font-size": "20px","font-weight": "800","margin-top": "2vh", "margin-left": "2vw"}}>
                        Arus Kas
                    </div>
                </div> */}
                
            <div class="card-arus-kas">
                <div style={{display:'flex', "flex-direction":"column", "gap":"11vh"}}>
                    <div>
                        <div class="nameheader">
                            <div class="rightcp">
                                <input type="text" placeholder="Search.." name="search"/>
                                    <span class="search-icon">
                                    <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
                                    </span>
                                <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                            </div>
                        </div>

                        <div class="tableteams">
                            <TableKasApproved/>
                        </div>
                    </div>

                    <div>
                        <TableDaftarKas/>
                    </div>
                </div>
                
            </div>    
        </div>
    )
}

export default KasApproval;