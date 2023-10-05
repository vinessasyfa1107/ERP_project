import type { Component } from 'solid-js';
import './planning.css'
import TablePlanning from './table/table-planning';
import ChartPlanning from './chart-planning';
import TableDetailPlan from './table/table-detail-plan';
import { Icon } from '@iconify-icon/solid';
import FormPlanning from './form/form-planning';

const Planning: Component = () => {
  return (
    <div class="plan">
        <div class="box-1">

            <div class="component-1">
                <ChartPlanning/>
                <div class="tabel-keterangan">
                    <div class="rightcp">
                        <input type="text" placeholder="Search.." name="search"/>
                            <span class="search-icon">
                            <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
                            </span>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                    <br />
                    <h1>Keterangan</h1>                
                    <TablePlanning/>
                </div>
            </div>

            <div>
                <h1>List Rencana Pengajuan</h1>
                <TableDetailPlan/>
                <FormPlanning/>
            </div>
            
            </div>
    </div>
  );
};

export default Planning;
