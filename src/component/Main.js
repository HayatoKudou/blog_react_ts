import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { serverUrl } from '../common';

import Login from './auth/Login';
import Register from './auth/Register';
import Reset from './auth/Reset';
import Auth from './auth/Auth';
import User from './auth/User';
import Top from './page/top';
import Post from './page/post';
import Portfolio from './page/portfolio';
import Contact from './page/contact';
import {Admin} from './page/admin'
import MenuAppBar from './parts/header';
import ToolsTop from './tools/top';
import {RegularExpression} from './tools/regularExpression';
import {ProgramGenerate} from './tools/programGenerate';

import BlogTop from './blog/top';
import ReactUnity from './blog/react_unity';
import ReactUnity_sample from './blog/reactUnity_sample';
import LaravelAuthApi from './blog/LaravelAuthApi';

function usePageViews() {
    //デバイスの登録
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        User.set('device', 'smartphone');
    } else {
        User.set('device', 'pc');
    }

    //記事の登録
    fetch(serverUrl + '/api/topData', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
    })
    .then(response => {
        if (!response.ok) {
            console.log(response);
        } else {
            return response.json().then(data => {
                if('errors' in data){
                    console.log(data.errors);
                } else {
                    User.setArr('qiitaData', data.qiitaData);
                    User.setArr('twitterData', data.twitterData);
                    User.setArr('articleData', data.articleData);
                }
            });
        }
    }).catch(error => {
        console.log(error);
    })

}

function RouterApp() {
    usePageViews();
    return (
        <Switch>
                <Route exact path="/" component={Top} />
                <Route exact path="/blog" component={BlogTop} />
                <Route exact path="/tools" component={ToolsTop} />
                {/* <Route exact path="/portfolio" component={Portfolio} /> */}
                <Route exact path="/contact" component={Contact} />

                <Route exact path="/tools/programGenerate" component={ProgramGenerate} />
                <Route exact path="/tools/regularExpression" component={RegularExpression} />

                <Route exact path="/blog/reactUnity" component={ReactUnity} />
                <Route exact path="/blog/reactUnity_sample" component={ReactUnity_sample} />
                <Route exact path="/blog/LaravelAuthApi" component={LaravelAuthApi} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/reset" component={Reset} />
                <Route exact path="/register" component={Register} />
            <Auth>
                {/* ログイン必須ページ */}
                <Switch>
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/admin/post" component={Post} />
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