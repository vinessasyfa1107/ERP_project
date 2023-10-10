import { Component, onMount } from "solid-js";
import { useNavigate, A, Navigate } from '@solidjs/router';
import { Icon } from '@iconify-icon/solid';
import './header.css';



const Header: Component = () => {

    return (
        <div class="header">
            <div class="report">
                <img src="src/assets/img/dashboard-report.png"/>
            </div>
            <div class="planning">
                <img src="src/assets/img/dashboard-planning.png"/>
            </div>
            <div class="time-tracking">
                <img src="src/assets/img/dashboard-time-tracking.png"/>
            </div>
            <div class="arus-kas">
                <img src="src/assets/img/dashboard-arus-kas.png"/>
            </div>
            <div class="teams">
                <img src="src/assets/img/dashboard-teams.png"/>
            </div>
            <div class="accounting">
                <img src="src/assets/img/dashboard-accounting.png"/>
            </div>
        </div>
    )
}

export default Header;