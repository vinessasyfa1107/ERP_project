import type { Component } from 'solid-js';
import './time-tracking.css'
import TableTime from './table-time';
import { Icon } from '@iconify-icon/solid';


const TimeTracking: Component = () => {
    return (
        <div class="teams">
                <div class="module">
                    <div style={{"font-size": "20px","font-weight": "800","margin-top": "2vh", "margin-left": "6vw"}}>
                        Time Trackings
                    </div>
                    <div style={{"font-size": "20px","margin-left": "0.5vw","margin-top": "2vh"}}>Approval Tracker</div>
                </div>
            <div class="box-1">
                <div class="nameheader">
                    <div class="rightcp">
                        <input type="text" placeholder="Search.." name="search"/>
                            <span class="search-icon">
                            <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
                            </span>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                </div>
                    <div>
                        <TableTime/>
                    </div>
            </div>
        </div>
    )
}

export default TimeTracking;