import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

import index from '../Component/index'; //首页
import login from '../Component/login'; //登录
import search from '../Component/search'; //登录
import editTrains from '../Component/editTrains'; //登录
class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

// const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

const history = hashHistory;


const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={login} />//首页
            <Route path="index" component={index} />
            <Route path="login" component={login} /> //登录
            <Route path="search" component={search} /> //登录
            <Route path="editTrains/:id" component={editTrains} />
            <Redirect from='*' to='login'  />
        </Route>
    </Router>
);

export default RouteConfig;