import { createSignal, type Component, onMount } from 'solid-js';
import RouteData from './routes/route.data';
import { useStore } from './store';
import { useNavigate } from '@solidjs/router';
import Login from './containers/login/login';
import Navbar from './containers/navbars/navbar';

interface UserData {
  id: number;
  account_name: string;
  access: string;
  email: string;
}

const App: Component = () => {
  const [{ sessionStore }] = useStore();
  const navigate = useNavigate();
  const [needLogin, setNeedLogin] = createSignal(true);

    onMount(() => {
    console.log('session ', sessionStore.sessionData);
    if (sessionStore.sessionData) {

      setNeedLogin(false);
      console.log('need login ' + needLogin());

      // const userDataString = sessionStore.sessionData as unknown as string; // Ensure sessionData is a string
      // const userData = JSON.parse(userDataString) as UserData; // Parse the JSON string to an object
      // const userAccess = userData.access;

      // // Redirect the user based on their access role
      // switch (userAccess) {
      //   case 'admin':
      //     navigate('/dashboard/report', { replace: true });
      //     break;
      //   case 'direktur_keuangan':
      //     navigate('/dashboard-dk/report_dk', { replace: true });
      //     break;
      //   case 'direktur_utama':
      //     navigate('/dashboard-du/report', { replace: true });
      //     break;
      //   // Add more cases for other roles as needed
      //   default:
      //     // Handle unknown or unsupported roles here
      //     break;
      // }


      setNeedLogin(!needLogin());
    }
    console.log('need login ' + needLogin());
    if (needLogin()) {
      navigate('/dashboard/login', { replace: true });

    }
  });
  // onMount(() => {
  //   console.log('session ', sessionStore.sessionData);
  //   if (sessionStore.sessionData) {
  //     setNeedLogin(false);
  //     console.log('need login ' + needLogin());

  //     const userDataString = sessionStore.sessionData as unknown as string; // Ensure sessionData is a string
  //     const userData = JSON.parse(userDataString) as UserData; // Parse the JSON string to an object
  //     const userAccess = userData.access;

  //     // Redirect the user based on their access role
  //     switch (userAccess) {
  //       case 'admin':
  //         navigate('/dashboard/report', { replace: true });
  //         break;
  //       case 'direktur_keuangan':
  //         navigate('/dashboard/direktur_keuangan', { replace: true });
  //         break;
  //       case 'direktur_utama':
  //         navigate('/dashboard-du/report', { replace: true });
  //         break;
  //       // Add more cases for other roles as needed
  //       default:
  //         // Handle unknown or unsupported roles here
  //         break;
  //     }

  //   }
  // });

  return (
    <>
      {!needLogin() ? <Navbar><RouteData /></Navbar> : <Login />}
    </>
  );
};

export default App;



// import { createSignal, type Component, onMount } from 'solid-js';
// import RouteData from './routes/route.data';
// import { useStore } from './store';
// import { useNavigate } from '@solidjs/router';
// import Login from './containers/login/login';
// import Navbar from './containers/navbars/navbar';

// const App: Component = () => {
//   const [{ sessionStore }] = useStore();
//   const navigate = useNavigate();
//   const [needLogin, setNeedLogin] = createSignal(true);

//   onMount(() => {
//     console.log('session ', sessionStore.sessionData);
//     if (sessionStore.sessionData) {
//       setNeedLogin(!needLogin());
//     }
//     console.log('need login ' + needLogin());
//     if (needLogin()) {
//       navigate('/dashboard/admin', { replace: true });
//     }
//   });
//   return (
//     <>
//       {!needLogin() ? <Navbar><RouteData /></Navbar> : <Login />}
//     </>
//   );
// };

// export default App;
