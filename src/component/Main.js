import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { serverUrl } from '../common';

import App from './App';
import Login from './auth/Login';
import Register from './auth/Register';
import Reset from './auth/Reset';
import MenuAppBar from './parts/header';
import Auth from './auth/Auth';
import User from './auth/User';
import Contact from './page/contact';

function usePageViews() {
    //デバイスの登録
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        User.set('device', 'smartphone');
    } else {
        User.set('device', 'pc');
    }
}

function RouterApp() {
    usePageViews();
    return (
        <Switch>
                <Route exact path="/" component={MenuAppBar} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/reset" component={Reset} />
                <Route exact path="/register" component={Register} />
            <Auth>
                {/* ログイン必須ページ */}
                <Switch>
                    <Route exact path="/profile" component={App} />
                </Switch>
            </Auth>
        </Switch>
    );
}

export default class Main extends Component {
  render() {
    return (
        <Router>
            <RouterApp />
        </Router>
    );
  }
}