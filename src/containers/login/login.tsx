import { useLocation, useNavigate } from "@solidjs/router";
import { Component, createSignal, onMount } from "solid-js";
import { Key_Field, User_Field, User_Login, User_Top } from "../../components/Icons/Users/Icon_User";
import { datalogin } from "../../api/login/datalogin";



const Login: Component = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const ActionLogin = () => {
        console.log('hallo login button clicked');
        const dataUser = {username: "erp-last", email: "erp-last@gmail.com"};
        sessionStorage.setItem('userData', JSON.stringify(dataUser));
        window.location.assign('/');
    }

    // const [username, setUsername] = createSignal("");
    // const [password, setPassword] = createSignal("");

    // onMount(() => {
    //     console.log('ini halaman Login');
    // });

    // const ActionLogin = async () => {
    //     console.log('hallo login button clicked');
    //     const dataUser = { username: username(), password: password() };
    //     try {
    //       // Kirim dataUser ke server untuk proses login
    //       const response = await fetch('http://192.168.100.210:8080/login/query/', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(dataUser),
    //       });
      
    //       if (response.ok) {
    //         // Jika login berhasil, Anda dapat melakukan navigasi ke halaman yang sesuai.
    //         const responseData = await response.json();
    //         // responseData dapat berisi informasi tambahan yang Anda butuhkan dari server.
      
    //         // Contoh penggunaan responseData:
    //         console.log('Login berhasil:', responseData);
      
    //         // Di sini Anda bisa menentukan apa yang harus dilakukan setelah login berhasil,
    //         // seperti menavigasi ke halaman dashboard.
    //         navigate('/dashboard');
    //       } else {
    //         // Handle kesalahan jika login gagal
    //         console.error('Login gagal');
    //         // Tampilkan pesan kesalahan kepada pengguna jika perlu.
    //       }
    //     } catch (error) {
    //       // Handle kesalahan jika ada masalah koneksi atau lainnya
    //       console.error('Error selama proses login:', error);
    //       // Tampilkan pesan kesalahan kepada pengguna jika ada masalah koneksi.
    //     }
    //   };
      
      

    // onMount(async () => {
    //     const data_login = await datalogin ("data coa master");
    //     console.log("datalogin", data_login);
    //     setDataLogin(data_login);
    //   })

    // const ActionLogin = () => {
    //     console.log('hallo login button clicked');
    //     const dataUser = {username: `${username}`, password:`${password}`};
    //     sessionStorage.setItem('userData', JSON.stringify(dataUser));
    //     window.location.assign('/');
    // }

    return (
        <div
            id="LoginRoot"
            class="overflow-hidden bg-white flex flex-col justify-between w-full h-full items-end pt-8 pb-48 px-12 fixed"
        >
            <div class="flex flex-row gap-8 items-start">
                <div class="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] flex flex-col w-64 shrink-0">
                <div class="shadow-[inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] bg-white flex flex-row justify-center pt-3 gap-3 h-10 shrink-0 items-start rounded-[20px]">
                    <img
                    src="https://file.rendit.io/n/Q1vGwgsXbO1TkPP5ycuD.svg"
                    id="Uimcalender"
                    class="w-5 shrink-0"
                    />
                    <div class="text-sm font-['Inter'] text-[#909090] mt-1">
                    02.10.2023 - 12:00 WIB
                    </div>
                </div>
                </div>
                <User_Top class="mt-2 w-5 shrink-0"/>
            </div>
            <div class="shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.02),_0px_3px_5px_0px_rgba(0,_0,_0,_0.03),_0px_5px_10px_0px_rgba(0,_0,_0,_0.04),_0px_9px_18px_0px_rgba(0,_0,_0,_0.05),_0px_18px_33px_0px_rgba(0,_0,_0,_0.06),_0px_42px_80px_0px_rgba(0,_0,_0,_0.08)] self-stretch flex flex-col mx-[176px]">
                <div class="bg-[#efefef] flex flex-col gap-2 h-[653px] shrink-0 items-center pr-[288px] py-12 rounded-[21px]">
                <div class="flex flex-row mb-8 gap-2 items-start">
                    <div class="text-5xl font-['Exo_2'] font-bold text-[#6e49e9] mb-px">
                    ERP
                    <div id="ERP" class="text-4xl contents">
                        {" "}
                    </div>
                    </div>
                    <div class="text-4xl font-['Exo_2'] font-bold text-[#9f9f9f] self-end">
                    TUS
                    </div>
                </div>
                <User_Login class="mb-10 w-16"/>
                <div class="relative flex flex-col mb-5 w-3/5">
                    <User_Field class="w-5 h-5 absolute top-3 left-[620px]"/>
                    <div class="border-solid border-[#131313] relative flex flex-col h-10 shrink-0 items-start pl-3 py-2 border rounded">
                    <div class="font-['Manrope'] font-medium text-[rgba(128,_128,_128,_0.5)]">
                        Username
                    </div>
                    </div>
                </div>
                <div class="relative flex flex-col w-3/5">
                    <div class="font-['Manrope'] font-medium text-[rgba(128,_128,_128,_0.5)] absolute top-2 left-4 h-5 w-20">
                    Password
                    </div>
                    <Key_Field class="w-5 h-5 absolute top-3 left-[620px]"/>
                    <div class="border-solid relative h-10 shrink-0 border-black border rounded" />
                </div>


                <div class="text-right text-sm font-['Manrope'] font-medium text-[#6e49e9] self-end mb-5 mr-px">
                    forget Password?
                </div>
                <button class="btn shadow-[0px_2px_4px_0px_rgba(0,_0,_0,_0.25)] bg-white flex flex-col justify-center h-12 shrink-0 items-center rounded" onclick={() => ActionLogin()}>
                    <span class="text-xl font-['Manrope'] font-bold text-[#6e49e9] mx-32">
                    Log in
                    </span>
                </button>
                </div>
            </div>
        </div>

    )

}

export default Login;