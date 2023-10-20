import { A, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import './pengajuan_navbar.css';

const Pengajuan_navbar: Component = () => {
  const location = useLocation();

  return (
    <div>
      <div class="navbar-pengajuan">
        <A href='/pengajuan/pengajuan_dashboard' classList={{ active: location.pathname === '/pengajuan/pengajuan_dashboard' }}>Dashboard</A>
        <A href='/pengajuan/pengajuan_laporan' classList={{ active: location.pathname === '/pengajuan/pengajuan_laporan' }}>Laporan</A>
      </div>
    </div>
  );
};

export default Pengajuan_navbar;
