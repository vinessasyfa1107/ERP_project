import type { Component } from 'solid-js';
import Semua_laporanNavbar from '../semua_laporanNavbar';




const Pemasukan: Component = () => {
  return (
    <div>
      <Semua_laporanNavbar />
      <div style={{"height":"90rem"}}>
        <p>halo ini pemasukan</p>
      </div>
    </div>
  );
};


export default Pemasukan;