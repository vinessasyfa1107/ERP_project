import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import './semua_laporanNavbar.css';

const Semua_laporanNavbar: Component = () => {
  const location = useLocation();

  return (
    <div>
      <div class="navbar-semuaLaporan">
        <A href='/report/semua_laporan' classList={{ active: location.pathname === '/report/semua_laporan' }}>Semua Laporan</A>
        <A href='/report/kas_besar' classList={{ active: location.pathname === '/report/kas_besar' }}>Kas Besar</A>
        <A href='/report/pemasukan' classList={{ active: location.pathname === '/report/pemasukan' }}>Pemasukan</A>
        <A href='/report/pengeluaran' classList={{ active: location.pathname === '/report/pengeluaran' }}>Pengeluaran</A>
      </div>
    </div>
  );
};

export default Semua_laporanNavbar;
