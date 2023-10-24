import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'daisyui/dist/full.css';
import { Icon } from '@iconify-icon/solid';
import { createEffect, createSignal } from 'solid-js';
import './tabel_kontak.css';


const Tabel_kontak: Component = () => {
    const columnDefs = [
        { headerName: 'Nama', field: 'Nama' },
        { headerName: 'Nama Perusahaan', field: 'Nama_Perusahaan' },
        { headerName: 'Alamat', field: 'Alamat' },
        { headerName: 'Email', field: 'Email' },
        { headerName: 'No. HP', field: 'No_HP' },
        { headerName: 'NPWP', field: 'NPWP' },
        { headerName: 'Saldo', field: 'Saldo' }
    ];

    const rowData = [
        {
            Nama: 'Albert Flores',
            Nama_Perusahaan: 'PT. Braincode',
            Alamat: '3 Place de la Bourse - 33000 Bordeaux',
            Email: 'tranthuy.nute@gmail.com',
            No_HP: '0889373569253',
            NPWP: '101058348365',
            Saldo: '725.000.000.000'
        },

        {
            Nama: 'Leslie Alexander',
            Nama_Perusahaan: 'PT. Braincode',
            Alamat: '2 Rue des Francs-Bourgeois - 67000 Strasbourg',
            Email: 'tranthuy.nute@gmail.com',
            No_HP: '0889373569253',
            NPWP: '101058348365',
            Saldo: '725.000.000.000'
        },

        {
            Nama: 'Devon Lane',
            Nama_Perusahaan: 'PT. astra',
            Alamat: '5 Rue Michel Rondet - 42000 Saint-Étienne',
            Email: 'trungkienspktnd@gamail.com',
            No_HP: '085123456789',
            NPWP: '101024624468',
            Saldo: '490.000.000.000'
        },

        {
            Nama: 'Kristin Watson',
            Nama_Perusahaan: 'PT. Braincode',
            Alamat: '20 Rue de Paris - 76600 Le Havre',
            Email: 'vuhaithuongnute@gmail.com',
            No_HP: '0877412346547',
            NPWP: '101058656372',
            Saldo: '102.000.000.000'
        },

        {
            Nama: 'Dianne Russell',
            Nama_Perusahaan: 'PT. Braincode',
            Alamat: '25 Rue Sainte-Cécile - 13006 Marseille',
            Email: 'tienlapspktnd@gmail.com',
            No_HP: '0895376358392',
            NPWP: '101064483858',
            Saldo: '170.000.000.000'
        },

        {
            Nama: 'Arlene McCoy',
            Nama_Perusahaan: 'PT. astra',
            Alamat: '1 Rue de la Préfecture - 44000 Nantes',
            Email: 'ckctm12@gmail.com',
            No_HP: '0857374466502',
            NPWP: '101086476672',
            Saldo: '12.000.000.000'
        },

        {
            Nama: 'Kristin Watson',
            Nama_Perusahaan: 'PT. Braincode',
            Alamat: '20 Rue de Paris - 76600 Le Havre',
            Email: 'vuhaithuongnute@gmail.com',
            No_HP: '0877412346547',
            NPWP: '101058656372',
            Saldo: '102.000.000.000'
        },

        {
            Nama: 'Dianne Russell',
            Nama_Perusahaan: 'PT. Braincode',
            Alamat: '25 Rue Sainte-Cécile - 13006 Marseille',
            Email: 'tienlapspktnd@gmail.com',
            No_HP: '0895376358392',
            NPWP: '101064483858',
            Saldo: '170.000.000.000'
        },

        {
            Nama: 'Albert Flores',
            Nama_Perusahaan: 'PT. Braincode',
            Alamat: '3 Place de la Bourse - 33000 Bordeaux',
            Email: 'tranthuy.nute@gmail.com',
            No_HP: '0889373569253',
            NPWP: '101058348365',
            Saldo: '725.000.000.000'
        }
    ];

    const defaultColDef = {
        flex: 1,
        filter: 'agTextColumnFilter',
    };

    const gridOptions = {
        pagination: true,
        paginationPageSize: 6,
    };


    return (
        <div>
            <div class="tabel-kontak-container">
                <div class="top-container" style={{
                    "color": "black",
                    "font-size": "20px",
                    "font-style": "normal", "font-weight": "700", "line-height": "normal",
                    "margin": "20px"
                }}>
                    <p>Informasi</p>
                </div>
                <div class="table-kontak-container">
                    <div class="ag-theme-alpine" style={{ width: '68vw', height: '40.5vw', 
                    margin: 'auto' }}>
                        <AgGridSolid
                            columnDefs={columnDefs}
                            rowData={rowData}
                            defaultColDef={defaultColDef}
                            domLayout='autoHeight'
                            gridOptions={gridOptions}
                        />

                    </div>
                </div>

            </div>


        </div>
    );
};

export default Tabel_kontak;
