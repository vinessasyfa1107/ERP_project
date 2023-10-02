import { Component } from "solid-js";
import { useNavigate, A, Navigate } from '@solidjs/router';



const Admin: Component = () => {
    const navigate = useNavigate();

    const changePage = () => {
        navigate('/dashboard/plan')
    }

    return (
        <>
            <p class="text-4xl text-green-700 text-center py-20">Halaman Admin!</p>
            <A href="/dashboard/plan">
                <button class="btn btn-primary text-center btn-xs">Pindah Halaman - A</button>
            </A><br/><br/>
            <div class="text-center">
                <button class="btn btn-accent text-center btn-xs" onClick={() => changePage()}>Pindah Halaman - Button</button>
            </div>
        </>
    )
}

export default Admin;