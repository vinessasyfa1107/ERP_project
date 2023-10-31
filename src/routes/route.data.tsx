import { Router, Routes, Route, Navigate, hashIntegration } from '@solidjs/router';
import { AsyncResource } from 'async_hooks';
import { Component, lazy } from 'solid-js';

const getPath = ({ navigate, location }) => {
    return "/dashboard/report";
}

//============= path untuk direktur utama ============= //

const Du = lazy(() => import('../containers/master/master/master'));

const ReportDU = lazy(() => import('../direktur-utama/containers/dashboard/report/report-du'));


//============= path untuk direktur keuangan ============= //



//============= path untuk admin ============= //

const Master = lazy(() => import('../containers/master/master/master'));
const MasterCOA = lazy(() => import('../containers/master/master-coa/master-coa'));
const MasterAkun = lazy(() => import('../containers/master/master-akun/master-akun'));

const Plan = lazy(() => import('../containers/dashboard/plannings/plan'));
// const Confirm_role = lazy(() => import('../containers/confirm_role/confirm_role'));
const Admin = lazy(() => import('../containers/dashboard/teams/teams'));
const Login = lazy(() => import('../containers/login/login'));
const Planning = lazy(() => import('../containers/dashboard/plannings/planning'));
const TimeTracking = lazy(() => import('../containers/dashboard/time-tracking/time-tracking'));
const Keuangan_dashboard = lazy(() => import('../containers/dashboard/accounting/keuangan_dashboard'));
const ArusKas = lazy(() => import('../containers/dashboard/arus-kas/arus-kas'));
const Report = lazy(() => import('../containers/dashboard/report/report'));
const Header = lazy(() => import('../containers/header/header'));

const Pengajuan_dashboard = lazy(() => import('../containers/pengajuan/pengajuan_dashboard/pengajuan_dashboard'));
const Pengajuan_laporan = lazy(() => import('../containers/pengajuan/pengajuan_laporan/pengajuan_laporan'));

const Kas_besar = lazy(() => import('../containers/report/kas_besar/kas_besar'));
const Semua_laporan = lazy(() => import('../containers/report/semua_laporan'));
const Pemasukan = lazy(() => import('../containers/report/pemasukan/pemasukan'));
const Pengeluaran = lazy(() => import('../containers/report/pengeluaran/pengeluaran'));


const Grafik_keuangan = lazy(() => import('../containers/keuangan/grafik-keuangan/grafik_keuangan'));
const KeuanganModul_dashboard = lazy(() => import('../containers/keuangan/dashboard/keuanganModul_dashboard'));
const Neraca = lazy(() => import('../containers/keuangan/neraca/neraca'));
const LabaRugi = lazy(() => import('../containers/keuangan/laba-rugi/laba-rugi'));
const Journal = lazy(() => import('../containers/keuangan/journal/journal'));
const JournalDetail = lazy(() => import('../containers/keuangan/journal-detail/journal-detail'));

const Tabel_kontak = lazy(() => import('../containers/kontak/tabel_kontak'));

const RouteData: Component = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate href={getPath} />} />
            <Route path="/" element={<Navigate href={getPath} />} />
            <Route path="/login" component={Login} />
            {/* <Route path="/confirm_role" component={Confirm_role} /> */}

            <Route path="/master">
                <Route path="/master" component={Master} />
                <Route path="/mastercoa" component={MasterCOA} />
                <Route path="/masterakun" component={MasterAkun} />
            </Route>

            <Route path="/dashboard">
                <Route path="/plan" component={Plan} />
                <Route path="/admin" component={Admin} />
                <Route path="/planning" component={Planning} />
                <Route path="/time-tracking" component={TimeTracking} />
                <Route path="/report" component={Report} />
                <Route path="/keuangan_dashboard" component={Keuangan_dashboard} />
                <Route path="/header" component={Header} />
                <Route path="/arus-kas" component={ArusKas} />
            </Route>

            <Route path="/report">
                <Route path="/semua_laporan" component={Semua_laporan} />
                <Route path="/kas_besar" component={Kas_besar} />
                <Route path="/pemasukan" component={Pemasukan} />
                <Route path="/pengeluaran" component={Pengeluaran} />
            </Route>

            <Route path="/pengajuan">
                <Route path="/pengajuan_dashboard" component={Pengajuan_dashboard} />
                <Route path="/pengajuan_laporan" component={Pengajuan_laporan} />
            </Route>

            <Route path="/keuangan">
                <Route path="/grafik-keuangan" component={Grafik_keuangan} />
                <Route path="/keuanganModul_dashboard" component={KeuanganModul_dashboard} />
                <Route path="/neraca" component={Neraca} />
                <Route path="/labarugi" component={LabaRugi} />
                <Route path="/journal" component={Journal} />
                <Route path="/journaldetail" component={JournalDetail} />
            </Route>

            <Route path="/kontak">
                <Route path="/tabel_kontak" component={Tabel_kontak} />
            </Route>


            <Route path="/dashboard-du">
                <Route path="/report" component={ReportDU} />

            </Route>
        </Routes>
    )
}

export default RouteData;