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

//   function redirectBasedOnRole(role: string) {
//     if (role === 'Admin') {
//       window.location.href = '/dashboard/report'; // Arahkan ke halaman admin
//     } else if (role === 'Direktur Utama') {
//       window.location.href = '/dashboard/direktur-utama'; // Arahkan ke halaman direktur utama
//     } else if (role === 'Direktur Keuangan') {
//       window.location.href = '/dashboard/direktur-keuangan'; // Arahkan ke halaman direktur keuangan
//     } else {
//       window.location.href = '/'; // Arahkan ke halaman awal
//     }
//   }

//   onMount(() => {
//     console.log('session ', sessionStore.sessionData);
//     if (sessionStore.sessionData) {
//       redirectBasedOnRole('');
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


// import { createSignal, Component, onCleanup } from 'solid-js';
// import { useStore } from './store';
// import { useNavigate } from '@solidjs/router';
// import Login from './containers/login/login';
// import Navbar from './containers/navbars/navbar';
// import Confirm_role from './containers/confirm_role/confirm_role'; // Import ConfirmRole component
// import RouteData from './routes/route.data';

// const App: Component = () => {
//   const [{ sessionStore }] = useStore();
//   const navigate = useNavigate();
//   const [needLogin, setNeedLogin] = createSignal(true);

//   onCleanup(() => {
//     // Cleanup code if needed
//   });

//   if (sessionStore.sessionData) {
//     setNeedLogin(false);
//   }

//   if (needLogin()) {
//     navigate('/dashboard/admin', { replace: true });
//   }

//   return (
//     <div>
//       {!needLogin() ? (
//         <Navbar>
//           <RouteData />
//         </Navbar>
//       ) : (
//         <>
//           <Confirm_role />
//           <Login />
//         </>
//       )}
//     </div>
//   );
// };

// export default App;


import { createSignal, type Component, onMount } from 'solid-js';
import RouteData from './routes/route.data';
import { useStore } from './store';
import { useNavigate } from '@solidjs/router';
import Login from './containers/login/login';
import Navbar from './containers/navbars/navbar';

const App: Component = () => {
  const [{ sessionStore }] = useStore();
  const navigate = useNavigate();
  const [needLogin, setNeedLogin] = createSignal(true);

  onMount(() => {
    console.log('session ', sessionStore.sessionData);
    if (sessionStore.sessionData) {
      setNeedLogin(!needLogin());
    }
    console.log('need login ' + needLogin());
    if (needLogin()) {
      navigate('/dashboard/admin', { replace: true });
    }
  });
  return (
    <>
      {!needLogin() ? <Navbar><RouteData /></Navbar> : <Login />}
    </>
  );
};

export default App;
