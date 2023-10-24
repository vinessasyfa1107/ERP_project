import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './master-coa.css'
import TabelCOAMaster from './table-coa-master';
import FormTambahCOA from './forms/form-tambah-coa';
import NavbarMaster from '../navbar-master';

const MasterCOA: Component = () => {

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
