import { createSignal, type Component } from 'solid-js';
import './time-tracking.css'
import TableTime from './table-time';
import { Icon } from '@iconify-icon/solid';
import Header from '../../header/header';



const TimeTracking: Component = () => {
    const [selectedRow, setSelectedRow] = createSignal<{ id: any; approval: any; } | null>(null);

    const [showText, setShowText] = createSignal(true);

    const [showSteps, setShowSteps] = createSignal(false);


    function handleSteps(){
      setShowSteps(!showSteps());
    }

    // const handleRowClick = (event: { data: any; node: any; }) => {
    //   const { data, node } = event;
    //   setSelectedRow(() => ({ id: node.data.number, approval: data.approved_by }));
    //   setShowText(false);
    // };

    const handleRowClick = (event: { data: any; node: any; }) => {
      const { data, node } = event;
      setSelectedRow(() => ({ id: node.data.No, approval: data.Approval }));
      setShowText(!showText());
      handleSteps();
    };
  
    const getStatusSteps = (approval: any) => {
      switch (approval) {
        case "admin":
          return (
            <ul class="steps">
              <li data-content="✓" class="step step-accent">Transmit Request/Planning <br />For Approval</li>
              <li class="step">Approval By <br />VP</li>
              <li class="step">Approval By <br />Direktur</li>
              <li class="step">Finish</li>
            </ul>
          );
        case "Approve":
          return (
            <ul class="steps">
              <li data-content="✓" class="step step-accent">Transmit Request/Planning <br />For Approval</li>
              <li data-content="✓" class="step step-accent">Approval By <br />VP</li>
              <li data-content="✓" class="step step-accent">Approval By <br />Direktur</li>
              <li data-content="✓" class="step step-accent">Finish</li>
            </ul>
          );
        case "Reject":
          return (
            <ul class="steps">
              <li data-content="✓" class="step step-secondary">Transmit Request/Planning <br />For Approval</li>
              <li data-content="✕" class="step step-secondary">Approval By <br />VP</li>
              <li data-content="✕" class="step step-secondary">Approval By <br />Direktur</li>
              <li data-content="✕" class="step step-secondary">Rejected</li>
            </ul>
          );
        case "In Process":
          return (
            <ul class="steps">
              <li data-content="✓" class="step step-accent">Transmit Request/Planning <br />For Approval</li>
              <li data-content="✓" class="step step-accent">Approval By <br />VP</li>
              <li class="step">Approval By <br />Direktur</li>
              <li class="step">Finish</li>
            </ul>
          );
        default:
          return null;
      }
    };

    return (
        <div class="time-tracking">
                <Header/>
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
                        <TableTime onRowClicked={handleRowClick}/>
                    </div>
                    <div class="card-bar">
                        <div style={{"margin-right":"1vw"}}>

                            <progress class="progress progress-success w-50 h-7" value="100" max="100"></progress>
                            <div style={{"font-weight": "600"}}>Transmit Request/Planning</div>
                            <div style={{"font-weight": "600"}}>For Approval</div>
                        </div>
                        <div>
                            <progress class="progress progress-success w-50 h-7" value="100" max="100"></progress>
                            <div style={{"font-weight": "600"}}>Approval By</div>
                            <div style={{"font-weight": "600"}}>Direktur Keuangan</div>
                        </div>
                        <div style={{"margin-left": "1vw"}}>

                            <progress class="progress progress-success w-50 h-7" value="0" max="100"></progress>
                            <div style={{"font-weight": "600"}}>Approval By</div>
                            <div style={{"font-weight": "600"}}>Direktur Utama</div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default TimeTracking;