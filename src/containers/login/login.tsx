import { useLocation, useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { Key_Field, User_Field, User_Login, User_Top } from "../../components/Icons/Users/Icon_User";



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
        <div class="bg-[#ffffff] w-full h-full fixed overflow-hidden">
            <User_Top class="absolute left-[1376px] top-[42px] overflow-visible"/>
            <div class="absolute" style="inset: 0">
                <div
                class="bg-[#ffffff] rounded-[20px] w-[253px] h-11 absolute left-[1087px] top-[35px]"
                style="box-shadow: inset 0px 4px 4px 0px rgba(0, 0, 0, 0.1)"
                ></div>
                <div
                class="text-[#909090] text-left absolute left-[1147px] top-[49px]"
                style="font: 400 15px 'Inter', sans-serif"
                >
                02.10.2023 - 12:00 WIB
                </div>
            </div>
            <div class="absolute" style="inset: 0">
                <div class="w-[998px] h-[652.98px] static">
                <div
                    class="bg-[#efefef] rounded-[21px] w-[998px] h-[652.98px] absolute left-[221px] top-[186px]"
                ></div>
                <div class="w-[420px] h-[248.51px] static">
                    <div
                    class="text-[#6e49e9] text-right absolute left-[815px] top-[565.51px]"
                    style="font: 500 14px 'Manrope', sans-serif"
                    >
                    forget Password?
                    </div>
                    <div class="w-[420px] h-10 static">
                    <div
                        class=" w-5 h-5 absolute left-[896px] top-[456.51px] overflow-hidden"
                    >
                        <div class="absolute" style="inset: 0">
                        <User_Field class="absolute left-[3.33px] top-[1.67px] overflow-visible"/>
                        </div>
                    </div>
                    <div
                        class="rounded-md border-solid border-[#131313] border w-[420px] h-10 absolute left-[510px] top-[446.51px]"
                    ></div>
                    <div
                        class="text-[rgba(128,128,128,0.50)] text-left absolute left-[524px] top-[455.51px]"
                        style="font: 500 16px 'Manrope', sans-serif"
                    >
                        Username
                    </div>
                    </div>
                    <User_Login class="absolute left-[687.47px] top-[336px] overflow-visible"/>

                    <div class="w-[420px] h-10 static">
                    <div
                        class="text-[rgba(128,128,128,0.50)] text-left absolute left-[524px] top-[525.51px]"
                        style="font: 500 16px 'Manrope', sans-serif"
                    >
                        Password
                    </div>
                    <Key_Field class="absolute right-[910px] top-[526.51px] overflow-visible"/>

                    <div
                        class="rounded-md border-solid border-[#000000] border w-[420px] h-10 absolute left-[510px] top-[516.51px]"
                    ></div>
                    </div>
                </div>
                </div>
                <div class="w-[300px] h-[50px] static">
                <div
                    class="btn bg-white rounded w-75 h-12 absolute left-[570px] top-[611px]"
                    style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
                    onClick={() => ActionLogin()}
                ></div>
                    <div class="text-[#6e49e9] text-left absolute left-[691px] top-[622.51px]" style="font: 700 20px 'Manrope', sans-serif">Log in</div>
                
                </div>
                <div class="w-[171px] h-[61px] static">
                <div class="w-[119px] h-[54px] absolute left-[635px] top-[236px]">
                    <div class="absolute" style="inset: 0">
                    <div class="w-[94px] h-[60px] static">
                        <div class="w-[94px] h-[60px] static">
                        <div class="text-[#fcd35c] text-left absolute left-0 top-0">
                            <span><span class="erp-span">ERP</span><span class="erp-span2"> </span></span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div
                    class="text-[#9f9f9f] text-left absolute left-[739px] top-[255px]"
                    style="font: 800 italic 35px 'Exo 2', sans-serif"
                >
                    TUS
                </div>
                </div>
            </div>
        </div>
    );
}

export default Login;