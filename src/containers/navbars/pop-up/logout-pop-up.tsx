import { onMount, type Component, onCleanup } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './logout-pop-up.css'


const ActionLogout = () => {
  console.log('hallo logout');
  sessionStorage.clear();
  window.location.reload();
}

const LogoutPopUp: Component = () => {
  return (
    <div>
      <div class="pop-up-logout" style={{display:'flex', "flex-direction":"column", "justify-content":"space-between"}}>
          <div style={{display:'flex', "align-items":"center"}}>
          <Icon icon="clarity:user-line"  width="15" class="mr-1"/>admin@admin
          </div>
          <div style={{display:'flex', "justify-content":'space-between'}}>
              <Icon icon="carbon:user-avatar-filled" color="#40444b" width="30" height="30" />
              <div class="logout-btn" onClick={ActionLogout}>
              <Icon icon="tabler:logout" color="#8b8b8b" width="17" height="17" class="logout-icon"/>Logout
              </div>
          </div>
      </div>
    </div>
  );
};

export default LogoutPopUp;
