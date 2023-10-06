import type { Component } from 'solid-js';
import './master.css'
import TableListCOA from './table-list-coa';
import TableListAkun from './table-list-akun';
import { Icon } from '@iconify-icon/solid';


const Master: Component = () => {
  return (
    <div>
        ini master
        <div class="master">

            <div class="content">
                <div class="content-1">
                    <div class="list-coa">
                        List COA
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>

                    <TableListCOA/>
                </div>
                <div class="content-1">
                    <div class="list-coa">List Akun</div>
                    <TableListAkun/>
                </div>
            </div>

        </div>
    </div>
  );
};

export default Master;
