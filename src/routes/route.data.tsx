import { Router, Routes, Route, Navigate, hashIntegration } from '@solidjs/router';
import { Component, lazy } from 'solid-js';

const getPath = ({navigate, location}) => {    
    return "/dashboard/planning";
}

const Plan = lazy(() => import('../containers/dashboards/plannings/plan'));
const Admin = lazy(() => import('../containers/dashboards/teams/admin'));
const Login = lazy(() => import('../containers/login/login'));

const Planning = lazy(() => import('../containers/dashboards/plannings/planning'));
const Master = lazy(() => import('../containers/master/master/master'));

const RouteData: Component = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate href={getPath}/>}/>
            <Route path="/login" component={Login} />
            <Route path="/dashboard">
                <Route path="/plan" component={Plan}/>
                <Route path="/admin" component={Admin}/>

                <Route path="/planning" component={Planning}/>
            </Route>
            <Route path="/master">
                <Route path="/master" component={Master}/>
            </Route>
        </Routes>
    )
}

export default RouteData;