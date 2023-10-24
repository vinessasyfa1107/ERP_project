import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './master-akun.css'
import TableAkunMaster from './table-master-akun';
import NavbarMaster from '../navbar-master';

const MasterAkun: Component = () => {
  const location = useLocation();

  return (
    <div>
      <NavbarMaster/>

        <div class="master-akun">
          <h1 style={{"font-family":"Exo"}}>Akun Master</h1>
          <TableAkunMaster/>
        </div>
    </div>
  );
};

export default MasterAkun;
