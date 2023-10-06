import { A } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './master-akun.css'
import TableAkunMaster from './table-master-akun';

const MasterAkun: Component = () => {
  return (
    <div>
        <div class="top-master-btn">
            <A href='/master/master'>Master</A>
            <A href='/master/mastercoa'>Master COA</A>
            <A href='/master/masterakun' class="active">Master Akun</A>
        </div>

        <div class="master-akun">
          <h1>Akun Master</h1>
          <TableAkunMaster/>
        </div>
    </div>
  );
};

export default MasterAkun;
