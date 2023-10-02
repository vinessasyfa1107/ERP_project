import { Router, Routes, Route, Navigate, hashIntegration } from '@solidjs/router';
import { Component, lazy } from 'solid-js';
// import Plan from '../containers/dashboards/plannings/plan';
// import Admin from '../containers/dashboards/teams/admin';
// import Dashboard from '';

const getPath = ({navigate, location}) => {    
    return "/dashboard/admin";
}

const Plan = lazy(() => import('../containers/dashboards/plannings/plan'));
const Admin = lazy(() => import('../containers/dashboards/teams/admin'));

const RouteData: Component = () => {
    return (
            <Routes>
                <Route path="/" element={<Navigate href={getPath}/>}/>
                <Route path="/dashboard">
                    <Route path="/plan" component={Plan}/>
                    <Route path="/admin" component={Admin}/>
                </Route>
            </Routes>
    )
}

export default RouteData;