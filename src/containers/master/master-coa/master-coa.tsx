import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './master-coa.css'
import TabelCOAMaster from './table-coa-master';
import FormTambahCOA from './forms/form-tambah-coa';

const MasterCOA: Component = () => {
  const location = useLocation();

  return (
    <div>
      <div class="top-master-btn">
        <A href='/master/master' classList={{ active: location.pathname === '/master/master' }}>Master</A>
        <A href='/master/mastercoa' classList={{ active: location.pathname === '/master/mastercoa' }}>Master COA</A>
        <A href='/master/masterakun' classList={{ active: location.pathname === '/master/masterakun' }}>Master Akun</A>
      </div>

        <div class="master-coa">
          <h1>COA Master</h1>
          <TabelCOAMaster/>
        </div>
    </div>
  );
};

export default MasterCOA;
