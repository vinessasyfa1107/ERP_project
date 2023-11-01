import { A, useLocation } from '@solidjs/router';
import { onMount, type Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './master-akun.css'
import TableAkunMaster from './table-master-akun';
import NavbarMaster from '../navbar-master';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';

const MasterAkun: Component = () => {
  const location = useLocation();

  const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Master Akun");
    })

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
