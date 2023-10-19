import { onMount, type Component, onCleanup } from 'solid-js';
import './logout-pop-up.css'

interface Logout_PopUpProps {
    isOpen: boolean;
    onClose: () => void;
  }

const PT_PopUp: Component<Logout_PopUpProps> = (props) => {
  return (
    <div>
        <div class={`logout-pop-up ${props.isOpen ? "opened" : "closed"}`}>
          <img src="https://file.rendit.io/n/W6GYZbOZRXaNodBHmwjY.svg" class="ml-3 w-8"/>
        </div>
    </div>
  );
};

export default PT_PopUp;
