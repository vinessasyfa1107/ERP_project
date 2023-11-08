import { Component, onMount } from "solid-js";
import { useNavigate, A, Navigate } from '@solidjs/router';
// import type { Component } from 'solid-js';

import './transfer_dana.css';
import Header from "../header/header";
import { Icon } from '@iconify-icon/solid';
import Tabel_transfer_dana from "./tabel_transfer_dana";
import { useSubNavbarStore } from "../../../../store/Navbar/SubNavbarStore";
import Table_time from "../time_tracking/table_time";
import Bar_time from "../time_tracking/bar_time";



const Arus_kas: Component = () => {

    const [, { changeSubTitleNavbar }] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Transfer Dana");
    })

    return (
        <div class="arus-kas">
            <Header />
            {/* <div class="card-module">
                    <div style={{"font-family":"Manrope","font-size": "20px","font-weight": "800","margin-top": "2vh", "margin-left": "2vw"}}>
                        Arus Kas
                    </div>
                </div> */}
            <div class="card-arus-kas">
                <div class="nameheader">
                    <div class="rightcp">
                        <input type="text" placeholder="Search.." name="search" />
                        <span class="search-icon">
                            <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
                        </span>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                </div>
                <div class="tableteams">
                    <Tabel_transfer_dana />
                </div>
            </div>

            {/* <div class="time-tracking-td">
                <div class="table-time-td">
                    <Table_time />
                </div>

                <div class="bar-time-td">
                    <Bar_time />
                </div>
            </div> */}
        </div>
    )
}

export default Arus_kas;