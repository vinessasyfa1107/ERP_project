import type { Component } from 'solid-js';
import Semua_laporanNavbar from '../semua_laporanNavbar';




const Pengeluaran: Component = () => {
  return (
    <div>
      <Semua_laporanNavbar />
      <div style={{"height":"90rem"}}>
        <p>halo ini pengeluaran</p>
      </div>
    </div>
  );
};


export default Pengeluaran;