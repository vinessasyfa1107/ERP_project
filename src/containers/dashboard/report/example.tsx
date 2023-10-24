import { Component, createSignal } from "solid-js";
// import 'tailwindcss/tailwind.css';
// import "daisyui/dist/full.css";
// import "./login.css";
import { useNavigate } from "@solidjs/router";
import { dataplanning } from "../../../api/planning/dataplanning";


const example: Component = () => {
    const [phonenumber, setphonenumber] = createSignal("");
    const [password, setpassword] = createSignal("");
    const navigate = useNavigate();
    const [Phone, setPhone] = createSignal("");
    const [inputClass, setInputClass] = createSignal("");
    // const [errorMessages, setErrorMessages] = createSignal<string[]>([]); // Initialize as an array of strings

    const [phones, setPhones] = createSignal(true);
    const [passwords, setPasswords] = createSignal(true);

    const [phonesG, setPhonesG] = createSignal();
    const [passwordsG, setPasswordsG] = createSignal();

    const PhoneNumbeR = (evt: any) => {
        const phoneRegex: any = /^(62)\d{11,12}$/;
        setPhones(phoneRegex.test(evt.currentTarget.value))
        // console.log("setPhone -> ", evt.currentTarget.value)
        setPhone(evt.currentTarget.value)
        // // console.log("setPhones -> ", phones())
        if (evt.currentTarget.value == '') {
            setPhones(true)
        }
        if (phones() === true) {
            setPhonesG(evt.currentTarget.value);
        }
    }

    const Passwordd = (evt: any) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        setPasswords(passwordRegex.test(evt.currentTarget.value))
        // console.log("setPasswords -> ", passwords())
        if (evt.currentTarget.value == '') {
            setPasswords(true)
        }
        if (passwords() === true) {
            setPasswordsG(evt.currentTarget.value);
        }
    }

    const fetchLogin = async () => {
        try {
            const response = await fetch(`${dataplanning}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phonenumber: phonenumber(),
                    password: password(),
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const loginWithCookie = async () => {
        try {
            const data = await fetchLogin();

            if (typeof data === "object") {
                const status: string = data.status;
                const info: string = data.info;

                if (status === "Success") {
                    const url = window.location.href;
                    const cek = url.split("?");
                    let noke = "";
                    let poke = "";

                    if (cek[2] !== undefined) {
                        noke = cek[2].split("?").toString();
                        poke = cek[3].split("?").toString();
                        localStorage.setItem('ccc', JSON.stringify({ "noke": noke.split("noke")[1], "poke": poke.split("pone")[1] }));
                    } else {
                        navigate("/dashboardreport", { replace: true });
                    }

                    let ls = localStorage.getItem('ccc');
                    if (ls) {
                        navigate("/description", { replace: true });
                    } else {
                        console.log("localstorage kosong");
                    }

                    localStorage.setItem("no_hp", Phone());
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    if (info === "Incorrect password") {
                        alert("Password anda salah");
                    } else if (info === "Phone number not found") {
                        alert("Phonenumber tidak ditemukan");
                    } else {
                        alert("Phonenumber dan Password anda salah");
                    }

                    setInputClass("error");
                }

            } else {
                alert("Phonenumber dan Password anda salah");
                setInputClass("error");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };





    return (
        <div>
            <div style={{ width: "100%", height: "100%" }}>
                <div>
                    <div class="content">
                        <div class="card flex-shrink-0 w-2/3 max-w-md shadow-2xl bg-base-100 " style={{ "background-color": 'white' }}>
                            <div style={{ "justify-content": "center", "align-items": "center", display: "flex", "margin-top": "2vh" }}>
                                <img src="src/assets/image/ME-TIME.png" alt="" style="height: 5vh; width: 7vw;" />
                            </div>
                            <div style={{ "text-align": "center", "font-weight": "bold", display: "flex", "justify-content": "center", "margin-top": "1vh" }}>
                                <h1 class="font-roboto" style={{ "font-size": "16px", width: '20vw' }}>
                                    Selamat datang di Dashboard Report, silahkan login untuk akses
                                </h1>
                            </div>
                            <form class="card-body">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text" style={{ "font-size": "16px" }}>Phonenumber</span>
                                    </label>
                                    <input
                                        class={`Phonenbox input input-bordered ${inputClass()}`}
                                        type="text"
                                        id="phonenumber"
                                        placeholder="Masukan Nomer telpon anda"
                                        onkeyup={PhoneNumbeR}
                                        onchange={(a => { setphonenumber(a.currentTarget.value) })}
                                        style={{ "box-shadow": "0px 0px 3px 0px" }}
                                    />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text" style={{ "font-size": "16px" }}>Password</span>
                                    </label>
                                    <input
                                        class={`Phonenbox input input-bordered ${inputClass()}`}
                                        // class="input input-bordered" required
                                        type="password"
                                        id="password"
                                        placeholder="Masukan Kata sandi anda"
                                        onchange={(a => { setpassword(a.currentTarget.value) })}
                                        onkeyup={Passwordd}
                                        style={{ "box-shadow": "0px 0px 3px 0px" }}
                                    // value={password()}
                                    // onInput={handlePasswordChange}
                                    />
                                    <label class="label">
                                        <a href="#" class="label-text-alt link link-hover text-red-500 mt-2" style={{ "font-size": "16px" }}>Forgot password?</a>
                                    </label>
                                </div>
                                <div class="form-control mt-6">
                                    <button class="btn" type="button" style={{ "background-color": "red", color: "white" }} onClick={loginWithCookie}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default example;
