import React, {useState, useEffect} from 'react';
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

export default function Top(props){

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
                                <h1>お知らせ・更新</h1>
                                <div className="update_date">
                                    <p>最終更新日: 2021年1月8日</p>
                                </div>
                                <div className="articles">
                                    {Object.keys(JSON.parse(User.getLocalStorage('qiitaData'))).map(key => {
                                        return(                                        
                                            <div className="article" key={key}>
                                                <span className="create_date">{JSON.parse(User.getLocalStorage('qiitaData'))[key].date+': '}</span>
                                                <a className="article_url" href={JSON.parse(User.getLocalStorage('qiitaData'))[key].url}>
                                                    {'【Qiita】' + JSON.parse(User.getLocalStorage('qiitaData'))[key].notice_content}
                                                </a>
                                            </div>
                                        )
                                    })}
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