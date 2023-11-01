import { A, useLocation } from '@solidjs/router';
import { onMount, type Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './master-coa.css'
import TabelCOAMaster from './table-coa-master';
import FormTambahCOA from './forms/form-tambah-coa';
import NavbarMaster from '../navbar-master';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';

const MasterCOA: Component = () => {
  const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

  onMount(() => {
      changeSubTitleNavbar("Master COA");
  })
  
  return (
    <div>
      <NavbarMaster/>

        <div class="master-coa">
          <h1 style={{"font-family":"Exo"}}>COA Master</h1>
          <TabelCOAMaster/>
        </div>
    </div>
  );
};

export default MasterCOA;
