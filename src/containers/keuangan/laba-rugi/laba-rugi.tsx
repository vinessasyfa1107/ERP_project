import type { Component } from 'solid-js';
import './laba-rugi.css'
import { Icon } from '@iconify-icon/solid';
import { A } from '@solidjs/router';
import NeracaNavbar from '../keuangan-navbar';
import TableLabaRugi from './table-laba-rugi';


const LabaRugi: Component = () => {
  return (

    <div class="laba-rugi">
        <NeracaNavbar/>
        <div class="box-1">
            <div class="top-1">
                <h1>Laba Rugi</h1>
                <div class="rightcp">
                    <input type="text" placeholder="Search.." name="search"/>
                        <span class="search-icon">
                        <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
                        </span>
                    <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                </div>
            </div>
            <TableLabaRugi/>
        </div>
    </div>
  );
};

export default LabaRugi;
