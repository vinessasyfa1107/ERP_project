import { Router, Routes, Route, Navigate, hashIntegration } from '@solidjs/router';
import { Component, lazy } from 'solid-js';

const getPath = ({ navigate, location }) => {
    return "/dashboard/report";
}

const Plan = lazy(() => import('../containers/dashboards/plannings/plan'));
const Admin = lazy(() => import('../containers/dashboards/teams/teams'));
const Login = lazy(() => import('../containers/login/login'));
const Planning = lazy(() => import('../containers/dashboards/plannings/planning'));
const TimeTracking = lazy(() => import('../containers/dashboards/time-tracking/time-tracking'));
const Accounting = lazy(() => import('../containers/dashboards/accounting/accounting'));
const Barchart_report = lazy(() => import('../containers/dashboards/report/barchart_report/barchart_report'));
const Table_report = lazy(() => import('../containers/dashboards/report/table_report/table_income_report'));
const Piechart_expenses_report = lazy(() => import('../containers/dashboards/report/piechart_report/piechart_report'));
const Table_income_report = lazy(() => import('../containers/dashboards/report/table_report/table_income_report'));
const Table_expenses_report = lazy(() => import('../containers/dashboards/report/table_report/table_expenses_report'));
const Report = lazy(() => import('../containers/dashboards/report/report'));
const Tabel_kontak = lazy(() => import('../containers/kontak/tabel_kontak'));
const Grafik_keuangan = lazy(() => import('../containers/keuangan/grafik-keuangan/grafik-keuangan'));
const Master = lazy(() => import('../containers/master/master/master'));

const RouteData: Component = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate href={getPath} />} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard">
                <Route path="/plan" component={Plan} />
                <Route path="/admin" component={Admin} />
                <Route path="/planning" component={Planning} />
                <Route path="/time-tracking" component={TimeTracking} />
                <Route path="/accounting" component={Accounting} />
                <Route path="/barchart_report" component={Barchart_report} />
                <Route path="/table_report" component={Table_report} />
                <Route path="/piechart_expenses_report" component={Piechart_expenses_report} />
                <Route path="/table_income_report" component={Table_income_report} />
                <Route path="/table_expenses_report" component={Table_expenses_report} />
                <Route path="/report" component={Report} />
            </Route>
            <Route path="/master">
                <Route path="/master" component={Master} />
            </Route>
            <Route path="/kontak">
                <Route path="/tabel_kontak" component={Tabel_kontak} />
            </Route>
            <Route path={"/keuangan"}>
                <Route path="/grafik-keuangan" component={Grafik_keuangan}></Route>
            </Route>
        </Routes>
    )
}

export default RouteData;