import { useNavigate, A, Navigate, useLocation } from '@solidjs/router';
import { Component, JSX, createSignal, onMount } from "solid-js";
import PT_PopUp from "./pop-up/pt-pop-up";
import './navbar.css';

interface NavbarProps {
    children: JSX.Element
}

const Navbar: Component<NavbarProps> = (props) => {

  const [popUpPT, setpopUpPT] =  createSignal(false);

  function handlepopUpPT() {
    setpopUpPT(!popUpPT());
  }


    return (
        <div
  class="overflow-hidden bg-white absolute flex flex-row justify-between pr-12 w-full items-center"
  >
  <div class="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] w-5 h-5 absolute top-12 left-[1116px]" />
  <div class="w-[244px] h-full bg-[rgba(217,_217,_217,_0.2)] fixed top-0 left-20 flex flex-col gap-4 items-start pl-4 py-[176px]">
    {/* <div class="bg-[url(https://file.rendit.io/n/KnFssyjy2Ca4u0YmJVli.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center mr-6 pt-1 gap-16 w-48 h-8 shrink-0 items-start"> */}
    {/* <div class='selection'> */}
    <A href='/master/master' classList={{ active: location.pathname === '/dashboard/report' }}>
      <div class="bg-[url(https://file.rendit.io/n/3Oz8sPZKMis9XytlmxZe.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center pt-1 gap-8 w-48 items-start">
        <div class="flex flex-row mt-1 gap-5 w-24 shrink-0 items-start">
          <img
            src="https://file.rendit.io/n/XxDPo7KbyfNGiflc38gM.svg"
            class="w-5 shrink-0"
          />
          <div class="font-['Inter'] font-bold text-black/42 mt-px">
            Master
          </div>
        </div>
        <img
          src="https://file.rendit.io/n/cskiYUMZe9YQ7CIv3wiM.svg"
          id="Radixiconscaretdown5"
          class="mt-1 w-6 shrink-0"
        />
      </div>
    </A>
    {/* </div> */}
    <A href='/dashboard/report' classList={{ active: location.pathname === '/dashboard/report' }}>
      <div class="bg-[url(https://file.rendit.io/n/3Oz8sPZKMis9XytlmxZe.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center pt-1 gap-8 w-48 items-start">
        <div class="flex flex-row mt-1 gap-3 w-3/5 items-start">
          <img
            src="https://file.rendit.io/n/phvOR3utndnvwetYe4BM.svg"
            class="w-6 shrink-0"
          />
          <div class="font-['Inter'] font-bold text-black/42 mt-px">
            Dashboard
          </div>
        </div>
        <img
          src="https://file.rendit.io/n/cskiYUMZe9YQ7CIv3wiM.svg"
          id="Radixiconscaretdown4"
          class="w-6 shrink-0 my-1"
        />
      </div>
    </A>
    <A href='/plannings/planning' classList={{ active: location.pathname === '/dashboard/report' }}>
      <div class="bg-[url(https://file.rendit.io/n/seiGpSyeGKUt0Ci1XUPM.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center ml-px pt-1 gap-10 w-48 items-center">
        <div class="flex flex-row gap-2 w-3/5 items-center">
          <img
            src="https://file.rendit.io/n/h8cBAvKlGb8aqqxR1I9z.svg"
            class="self-start w-5 shrink-0"
          />
          <div class="font-['Inter'] font-bold text-black/42">Pengajuan</div>
        </div>
        <img
          src="https://file.rendit.io/n/ecNIkV3GbrJy8rFTPryt.svg"
          id="Radixiconscaretdown"
          class="self-start w-6 shrink-0 my-1"
        />
      </div>
    </A>
    <A href='/report/semua_laporan' classList={{ active: location.pathname === '/dashboard/report' }}>
      <div class="bg-[url(https://file.rendit.io/n/B5ZaiUNOFUaJYcBMasZR.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center ml-px pt-1 gap-16 w-48 items-start">
        <div class="flex flex-row gap-3 w-24 shrink-0 items-start mt-px mb-1">
          <img
            src="https://file.rendit.io/n/b0a3emC0YfSakhwnz7gH.svg"
            id="Tablerreport"
            class="w-6 shrink-0"
          />
          <div class="font-['Inter'] font-bold text-black/42 mt-px">
            Report
          </div>
        </div>
        <img
          src="https://file.rendit.io/n/ecNIkV3GbrJy8rFTPryt.svg"
          id="Radixiconscaretdown3"
          class="w-6 shrink-0"
        />
      </div>
    </A>
    <A href='/keuangan/grafik-keuangan' classList={{ active: location.pathname === '/dashboard/report' }}>
      <div class="bg-[url(https://file.rendit.io/n/yShtUn5D8WEq3JSbuTET.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center ml-px pt-1 gap-10 w-48 items-center">
        <div class="self-start flex flex-row mb-1 gap-3 w-3/5 items-start">
          <div class="relative flex flex-col w-6 shrink-0 items-start">
            <div class="w-6 h-5 overflow-hidden bg-white/0 absolute top-px left-px" />
            <img
              src="https://file.rendit.io/n/K14vRo6zZFSYrAFWgSk5.svg"
              class="relative w-6"
            />
          </div>
          <div class="font-['Inter'] font-bold text-black/42 mt-1">
            Keuangan
          </div>
        </div>
        <img
          src="https://file.rendit.io/n/ecNIkV3GbrJy8rFTPryt.svg"
          id="Radixiconscaretdown2"
          class="w-6 shrink-0"
        />
      </div>
    </A>
    <A href='/kontak/tabel_kontak' classList={{ active: location.pathname === '/dashboard/report' }}>
      <div class="bg-[url(https://file.rendit.io/n/oSM21HgnJDbezXnmDN0k.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center ml-px pt-1 gap-16 w-48 items-center">
        <div class="flex flex-row gap-2 w-20 shrink-0 items-center">
          <img
            src="https://file.rendit.io/n/RPwE1JFYLgOmgr7ppOEa.svg"
            id="Icroundcontactpage"
            class="self-start w-5 shrink-0"
          />
          <div class="font-['Inter'] font-bold text-black/42">Kontak</div>
        </div>
        <img
          src="https://file.rendit.io/n/ecNIkV3GbrJy8rFTPryt.svg"
          id="Radixiconscaretdown1"
          class="self-start w-6 shrink-0 my-1"
        />
      </div>
    </A>
  </div>
  <div class="w-full h-24 bg-[#f7f7f7] fixed top-[-15px] left-1 flex flex-row justify-between items-end pb-4 pl-[113px] pr-24">
    <div class="flex flex-row justify-between gap-32 items-start">
      <div class="flex flex-row mb-2 gap-2 items-start">
        <div class="text-4xl font-['Exo_2'] font-bold text-[#6e49e9] mb-px">
          ERP
          <div id="ERP" class="contents">
            {" "}
          </div>
        </div>
        <div class="text-2xl font-['Exo_2'] font-bold text-[#9f9f9f] self-end">
          TUS
        </div>
      </div>
      <div class="text-4xl font-['Inter'] font-bold text-[#a892f2] mt-2">
        Report
      </div>
    </div>
    <div class="flex flex-row mb-px gap-12 items-start">
      <div class="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] flex flex-col items-start">
        <div class="bg-[#f56d59] flex flex-col justify-center w-32 h-10 shrink-0 items-center rounded-[23px]">
          <div class="text-xl font-['Inter'] font-bold text-white">
            + Create
          </div>
        </div>
      </div>
      <div class="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] flex flex-col w-64 shrink-0">
        <div class="shadow-[inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] bg-white flex flex-row justify-end gap-3 h-10 shrink-0 items-start pt-3 px-5 rounded-[20px]">
          <img
            src="https://file.rendit.io/n/JR4Z8I7HectTAgV0sox6.svg"
            id="Uimcalender1"
            class="w-5 shrink-0"
          />
          <div class="text-sm font-['Inter'] text-[#909090] mt-1">
            09.25.2023 - 10.01.2023
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-[#ebebeb] self-start fixed flex flex-col justify-between mb-[147px] w-20 shrink-0 h-full items-start pt-5 pb-[270px] pl-3"
  style={{"padding-bottom":"6vh"}}>
    <div
      id="Ellipse"
      class="bg-[url(https://file.rendit.io/n/uDD9S64MFEoBlI4Pt9yw.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col ml-1 w-12 items-start p-1 cursor-pointer"
      onClick={handlepopUpPT}
    >
       <PT_PopUp isOpen={popUpPT()} onClose={handlepopUpPT} />
      <img
        src="https://file.rendit.io/n/hlAlQ9Tuj0B7xjGjoFd1.svg"
        id="Mdiinternet"
        class="w-10"
      />
    </div>
    <img
      src="https://file.rendit.io/n/W6GYZbOZRXaNodBHmwjY.svg"
      class="ml-3 w-8"
      onClick={handlepopUpPT}
    />
  </div>
  <div class="flex flex-col ml-88 mt-25 w-[full]">
    {props.children}
    {/* <div class="w-[1450px] h-[687px] bg-[#efefef] absolute top-20 left-px flex flex-col gap-4 items-start pt-3 pb-[177px] px-4 rounded-lg mt-[110px] ml-[350px]">
      <div class="text-lg font-['Manrope'] font-bold text-[#414141] ml-2">
        Navbar Master
      </div>
      <div class="shadow-[0px_3px_2px_0px_rgba(0,_0,_0,_0.01),_0px_7px_5px_0px_rgba(0,_0,_0,_0.01),_0px_13px_10px_0px_rgba(0,_0,_0,_0.01),_0px_22px_18px_0px_rgba(0,_0,_0,_0.01),_0px_42px_33px_0px_rgba(0,_0,_0,_0.01),_0px_100px_80px_0px_rgba(0,_0,_0,_0.02)] self-stretch flex flex-col justify-between mr-1 gap-2">
        
      </div>
    </div>
    <div class="bg-[#f5f5f5] flex flex-row mr-px gap-20 h-20 shrink-0 items-center px-24 rounded-lg mt-[110px] ml-[350px] w-[1450px]">
      <div
        id="Master"
        class="text-lg font-['Inter'] font-bold text-[#8a8a8b] mr-2"
      >
        Master{" "}
      </div>
      <div class="text-lg font-['Inter'] font-bold text-[rgba(132,_103,_255,_0.8)]">
        Master Navbar
      </div>
      <div class="text-xl font-['Inter'] font-bold text-[#949494]">
        Master Akun
      </div>
    </div> */}
  </div>
</div>
    )
}

export default Navbar;