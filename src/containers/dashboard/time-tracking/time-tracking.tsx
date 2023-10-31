import { createSignal, type Component, onMount } from 'solid-js';
import './time-tracking.css';
import TableTime from './table-time';
import { Icon } from '@iconify-icon/solid';
import Header from '../../header/header';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';



const TimeTracking: Component = () => {
  const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Approval Tracker");
    })
    
  const [selectedRow, setSelectedRow] = createSignal<{ id: any; status: any; } | null>(null);

  const [showText, setShowText] = createSignal(true);

  const [showSteps, setShowSteps] = createSignal(false);


  function handleSteps() {
    setShowSteps(!showSteps());
  }

  // const handleRowClick = (event: { data: any; node: any; }) => {
  //   const { data, node } = event;
  //   setSelectedRow(() => ({ id: node.data.number, status: data.approved_by }));
  //   setShowText(false);
  // };

  const handleRowClick = (event: { data: any; node: any; }) => {
    const { data, node } = event;
    setSelectedRow(() => ({ id: node.data.NO, status: data.Status }));
    setShowText(!showText());
    handleSteps();
  };

  const getStatusSteps = (status: any) => {
    switch (status) {
      case "Waiting":
        return (
          <div class="step-status">
            <div class="step-bar">
              <div class="bar success"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
            <div class="step-bar">
              <div class="step-label">Transmit Request/Planning For Status</div>
              <div class="step-label">Approval by Direktur Keuangan</div>
              <div class="step-label">Approval by Direktur Utama</div>
            </div>
          </div>
        );
      case "Approved":
        return (
          <div class="step-status">
            <div class="step-bar">
              <div class="bar success"></div>
              <div class="bar success"></div>
              <div class="bar success"></div>
            </div>
            <div class="step-bar">
              <div class="step-label">Transmit Request/Planning For Status</div>
              <div class="step-label">Approval by Direktur Keuangan</div>
              <div class="step-label">Approval by Direktur Utama</div>
            </div>
          </div>
        );
      case "Rejected":
        return (
          <div class="step-status">
            <div class="step-bar">
              <div class="bar reject"></div>
              <div class="bar reject"></div>
              <div class="bar reject"></div>
            </div>
            <div class="step-bar">
              <div class="step-label">Transmit Request/Planning For Status</div>
              <div class="step-label">Approval by Direktur Keuangan</div>
              <div class="step-label">Approval by Direktur Utama</div>
            </div>
          </div>
        );
      case "In Process":
        return (
          <div class="step-status">
            <div class="step-bar">
              <div class="bar success"></div>
              <div class="bar success"></div>
              <div class="bar"></div>
            </div>
            <div class="step-bar">
              <div class="step-label">Transmit Request/Planning For Status</div>
              <div class="step-label">Approval by Direktur Keuangan</div>
              <div class="step-label">Approval by Direktur Utama</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div class="time-tracking">
      <Header />
      <div class="teams">
        {/* <div class="card-module">
          <div style={{ "font-family":"Manrope","font-size": "20px", "font-weight": "800", "margin-top": "2vh", "margin-left": "2vw" }}>
            Time Trackings
          </div>
          <div style={{ "font-size": "20px", "margin-left": "0.5vw", "margin-top": "2vh" }}>status Tracker</div>
        </div> */}
        <div class="card-time">
          <div class="nameheader">
            <div class="rightcp">
              <input type="text" placeholder="Search.." name="search" />
              <span class="search-icon">
                <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11" />
              </span>
              <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
            </div>
          </div>
          <div>
            <TableTime onRowClicked={handleRowClick} />
          </div>
          <div class="card-bar">
            {showText() && <p>Klik barisan untuk melihat tracker</p>}
            {showSteps() && selectedRow()?.status && getStatusSteps(selectedRow()?.status)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTracking;