import { createSignal, type Component, onMount } from 'solid-js';
import RouteData from './routes/route.data';
import { useStore } from './store';
import { useNavigate } from '@solidjs/router';
import Login from './containers/login/login';

const App: Component = () => {
    const[{sessionStore}] = useStore();
    const navigate = useNavigate();
    const [needLogin, setNeedLogin] = createSignal(true);

    onMount(() => {
        console.log('session ', sessionStore.sessionData);
        if(sessionStore.sessionData){
            setNeedLogin(!needLogin());
        }
        console.log('need login '+ needLogin());
        if(needLogin()){
            navigate('/dashboard/admin', {replace: true});
        }
    });
    return (
      <>
        {!needLogin() ? <RouteData/> : <Login />}
      </>
    );
};

export default App;
