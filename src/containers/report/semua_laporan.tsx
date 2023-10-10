import type { Component } from 'solid-js';
import Kas_besar from './kas_besar/kas_besar';
import Semua_laporanNavbar from './semua_laporanNavbar';




const Semua_laporan: Component = () => {
  return (
    <div>
      <Semua_laporanNavbar />
      <div style={{"height":"90rem"}}>
        <p>halo ini semua laporan</p>
      </div>
    </div>
  );
};


export default Semua_laporan;