import { createSignal, type Component } from 'solid-js';
import './master.css'
import TableListCOA from './table-list-coa';
import TableListAkun from './table-list-akun';
import { Icon } from '@iconify-icon/solid';
import { A, useLocation } from '@solidjs/router';


const Master: Component = () => {

    const [Table1, setTable1] = createSignal(false);

    const [Table2, setTable2] = createSignal(false);

    function handleTable1() {
        setTable1(!Table1())
    }

    function handleTable2() {
        setTable2(!Table2())
    }

  const location = useLocation();

  return (
    <div>
      <div class="top-master-btn">
        <A href='/master/master' classList={{ active: location.pathname === '/master/master' }}>Master</A>
        <A href='/master/mastercoa' classList={{ active: location.pathname === '/master/mastercoa' }}>Master COA</A>
        <A href='/master/masterakun' classList={{ active: location.pathname === '/master/masterakun' }}>Master Akun</A>
      </div>

        <div class="master">
            <div class="content">
                <div class="content-1">
                    <div class="list-coa" onClick={handleTable1}>
                        <p>List COA</p>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                    {Table1() && <TableListCOA/>}
                </div>
                <div class="content-2"  onClick={handleTable2}>
                    <div class="list-akun">
                        <p>List Akun</p>
                        <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                    </div>
                    {Table2() && <TableListAkun/>}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Master;
