import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './master-akun.css'
import TableAkunMaster from './table-master-akun';

const MasterAkun: Component = () => {
  const location = useLocation();

  return (
    <div>
      <div class="top-master-btn">
        <A href='/master/master' classList={{ active: location.pathname === '/master/master' }}>Master</A>
        <A href='/master/mastercoa' classList={{ active: location.pathname === '/master/mastercoa' }}>Master COA</A>
        <A href='/master/masterakun' classList={{ active: location.pathname === '/master/masterakun' }}>Master Akun</A>
      </div>

        <div class="master-akun">
          <h1>Akun Master</h1>
          <TableAkunMaster/>
        </div>
    </div>
  );
};

export default MasterAkun;
