import { onMount, type Component, onCleanup, createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './logout-pop-up.css'
import { useStore } from '../../../store';
import { dataaccountmaster } from '../../../api/master/data-account-master';

interface UserData {
  id: number;
  account_name: string;
  // Add any other properties here if they exist in your object
}

const LogoutPopUp: Component = () => {
  // const [{ sessionStore }] = useStore();

  // const userDataString = sessionStore.sessionData as unknown as string; // Ensure sessionData is a string
  // const userData = JSON.parse(userDataString) as UserData; // Parse the JSON string to an object

  // const fetchAdminEmail = async () => {
  //   try {
  //     // Use userData.id to fetch the email for the logged-in user
  //     const response = await fetch(`/api/account/`); // Replace with your BE endpoint URL

  //     if (response.ok) {
  //       const data = await response.json();
  //       const email = data.email;

  //       // Use the email as needed
  //       console.log('Email pengguna: ', email);
  //     } else {
  //       console.error('Failed to fetch admin data');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching admin data', error);
  //   }
  // };

  // onMount(() => {
  //   fetchAdminEmail(); // Fetch the user's email when the component mounts
  // });
  
  const ActionLogout = () => {
    console.log('hallo logout');
    sessionStorage.clear();
    window.location.reload();
  }

  const userEmail = sessionStorage.getItem('userEmail');

  console.log('ini email', userEmail)


  return (
    <div>
      <div class="pop-up-logout" style={{display:'flex', "flex-direction":"column", "justify-content":"space-between"}}>
          <div style={{display:'flex', "align-items":"center"}}>
          <Icon icon="clarity:user-line"  width="15" class="mr-1"/>
     
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
