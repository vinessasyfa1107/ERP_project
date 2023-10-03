import { useLocation, useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";


const Login: Component = () => {
    const navigate = useNavigate();
    const location = useLocation();

    onMount(() => {
        console.log('ini halaman Login');
    });

    const ActionLogin = () => {
        console.log('hallo login button clicked');
        const dataUser = {username: "erp-last", email: "erp-last@gmail.com"};
        sessionStorage.setItem('userData', JSON.stringify(dataUser));
        window.location.assign('/');
    }

    return (
        <>
            <p class="text-4xl text-green-700 text-center py-20">Halaman Login</p>
            <div class="text-center">
                <button class="btn btn-ghost btn-primary" onclick={() => ActionLogin()}>Tombol Login</button>
            </div>
        </>
    );
}

export default Login;