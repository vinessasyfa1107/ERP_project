import type { Component } from 'solid-js';
import './time-tracking.css'
import TableTime from './table-time';
import { Icon } from '@iconify-icon/solid';



const TimeTracking: Component = () => {
    return (
        <div class="time-tracking">
                <div class="card-module">
                    <div style={{"font-size": "20px","font-weight": "800","margin-top": "2vh", "margin-left": "2vw"}}>
                        Time Trackings
                    </div>
                    <div style={{"font-size": "20px","margin-left": "0.5vw","margin-top": "2vh"}}>Approval Tracker</div>
                </div>
            <div class="card-time">
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
                    <div class="card-bar">
                        <div style={{"margin-right":"1vw"}}>
                            <progress class="progress progress-success w-60 h-7" value="100" max="100"></progress>
                            <div style={{"font-weight": "600"}}>Transmit Request/Planning</div>
                            <div style={{"font-weight": "600"}}>For Approval</div>
                        </div>
                        <div>
                            <progress class="progress progress-success w-60 h-7" value="100" max="100"></progress>
                            <div style={{"font-weight": "600"}}>Approval By</div>
                            <div style={{"font-weight": "600"}}>Direktur Keuangan</div>
                        </div>
                        <div style={{"margin-left": "1vw"}}>
                            <progress class="progress progress-success w-60 h-7" value="0" max="100"></progress>
                            <div style={{"font-weight": "600"}}>Approval By</div>
                            <div style={{"font-weight": "600"}}>Direktur Utama</div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default TimeTracking;