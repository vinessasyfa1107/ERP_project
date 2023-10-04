import { Component, onMount } from "solid-js";
import { useNavigate, A, Navigate } from '@solidjs/router';
// import type { Component } from 'solid-js';

import './teams.css'
import TableTeams from './table-teams';
import { Icon } from '@iconify-icon/solid';



const Admin: Component = () => {
    const navigate = useNavigate();

    onMount(() => {
        console.log('sudah pindah ke halaman dashboard')
    })
    
    const changePage = () => {
        navigate('/dashboard/plan')
    }

    const ActionLogout = () => {
        console.log('clear storage ');
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <div class="teams">
            <div class="box-1">
                <div class="nameheader">
                    <div class="accountmaster">Account Master</div>
                    <div class="rightcp">
                        <input type="text" placeholder="Search.." name="search"/>
                            <span class="search-icon">
                            <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
                            </span>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                </div>
                    <div>
                        <TableTeams/>
                    </div>
            </div>
        </div>
    )
}

export default Admin;