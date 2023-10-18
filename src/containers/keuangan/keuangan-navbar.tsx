import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import './keuangan-navbar.css'

const KeuanganNavbar: Component = () => {
  const location = useLocation();

  return (
    <div>
      <div class="navbar-keuangan">
        <A href='/keuangan/keuanganModul_dashboard' classList={{ active: location.pathname === '/keuangan/keuanganModul_dashboard' }}>Dashboard</A>
        <A href='/keuangan/journal' classList={{ active: location.pathname === '/keuangan/journal' }}>Jurnal</A>
        <A href='/keuangan/journaldetail' classList={{ active: location.pathname === '/keuangan/journaldetail' }}>Jurnal Detail</A>
        <A href='/keuangan/neraca' classList={{ active: location.pathname === '/keuangan/neraca' }}>Neraca</A>
        <A href='/keuangan/labarugi' classList={{ active: location.pathname === '/keuangan/labarugi' }}>Laba Rugi</A>
      </div>
    </div>
  );
};

export default KeuanganNavbar;
