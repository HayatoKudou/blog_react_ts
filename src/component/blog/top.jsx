import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { diffDate, serverUrl } from '../../common';
import RigthSideList from '../parts/rightSideList';
import Sns from '../parts/sns';
import Breadcrumb from '../parts/breadcrumb';
import Header from '../parts/header';
import User from '../auth/User';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '0 auto',
        marginTop: '20px',
        padding: '15px',
    },
    grid: {
        padding: '5px !important',
        display: 'grid !important',
    },
}));

export default function BlogTop(props){

    const classes = useStyles();

    function componentDidMount() {
        document.title = '駆け出しエンジニアの開発ブログ';
    }

    useEffect(() => {
        componentDidMount();
    });

    return (
        <div>
            <Header location={props} />
            <Breadcrumb location={props} />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {User.get('device') === 'pc' &&
                        <Grid item xs={1} sm={1}>
                            <Sns />
                        </Grid>
                    }
                    <Grid className={classes.grid} item xs={User.get('device') === 'pc' ? 8 : 12}>
                        <Paper>
                            <div className="page_title">
                                <h1>ブログ</h1>
                                <div className="update_date">
                                    <p>最終更新日: 2021年1月8日</p>
                                </div>
                                <div className="articles">
                                    <div className="article">
                                        <span className="create_date">2020-08-15: </span>
                                        <Link className="article_url" to="/blog/reactUnity">react-unity-webglでReact × Unityを動かす方法</Link>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid className={classes.grid} item xs={User.get('device') === 'pc' ? 3 : 12}>
                        <Paper>
                            <RigthSideList twitterData={props.twitterData} />
                        </Paper>
                    </Grid>
              </Grid>
            </div>
        </div>
    )
}