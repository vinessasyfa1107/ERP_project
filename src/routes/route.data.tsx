import { Router, Routes, Route, Navigate, hashIntegration } from '@solidjs/router';
import { Component, lazy } from 'solid-js';

const getPath = ({navigate, location}) => {    
    return "/dashboard/barchart_report";
}

const Plan = lazy(() => import('../containers/dashboards/plannings/plan'));
const Admin = lazy(() => import('../containers/dashboards/teams/admin'));
const Login = lazy(() => import('../containers/login/login'));
const Barchart_report = lazy(() => import('../containers/dashboards/report/barchart_report/barchart_report'));
const Table_report = lazy(() => import('../containers/dashboards/report/table_report/table_report'));

const RouteData: Component = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate href={getPath}/>}/>
            <Route path="/login" component={Login} />
            <Route path="/dashboard">
                <Route path="/plan" component={Plan}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/barchart_report" component={Barchart_report}/>
                <Route path="/table_report" component={Table_report}/>
            </Route>
        </Routes>
    )
}

export default RouteData;