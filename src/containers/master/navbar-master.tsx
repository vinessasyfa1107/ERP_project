import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import './navbar-master.css'

const NavbarMaster: Component = () => {
    const location = useLocation();
  return (
    <div>
        <div class="top-master-btn">
        <A href='/master/master' classList={{ active: location.pathname === '/master/master' }}>Master</A>
        <A href='/master/mastercoa' classList={{ active: location.pathname === '/master/mastercoa' }}>Master COA</A>
        <A href='/master/masterakun' classList={{ active: location.pathname === '/master/masterakun' }}>Master Akun</A>
      </div>
    </div>
  );
};

export default NavbarMaster;
