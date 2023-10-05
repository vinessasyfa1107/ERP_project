import { Router, Routes, Route, Navigate, hashIntegration } from '@solidjs/router';
import { Component, lazy } from 'solid-js';

const getPath = ({navigate, location}) => {    
    return "/dashboard/planning";
}

const Plan = lazy(() => import('../containers/dashboards/plannings/plan'));
const Admin = lazy(() => import('../containers/dashboards/teams/teams'));
const Login = lazy(() => import('../containers/login/login'));
const Planning = lazy(() => import('../containers/dashboards/plannings/planning'));
const TimeTracking = lazy(() => import('../containers/dashboards/time-tracking/time-tracking'));
const Accounting = lazy(() => import('../containers/dashboards/accounting/accounting'));



const RouteData: Component = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate href={getPath}/>}/>
            <Route path="/login" component={Login} />
            <Route path="/dashboard">
                <Route path="/plan" component={Plan}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/planning" component={Planning}/>
                <Route path="/time-tracking" component={TimeTracking}/>
                <Route path="/accounting" component={Accounting}/>

            </Route>
        </Routes>
    )
}

export default RouteData;