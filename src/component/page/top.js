import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { diffDate, serverUrl } from '../../common';
import RigthSideList from '../parts/rightSideList';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '0 auto',
        marginTop: '30px',
    },
    grid: {
        padding: '5px !important',
        display: 'grid !important',
    },
}));


export default function Top(props){

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid className={classes.grid} item xs={1} sm={1}>
                    <div>
                        <a href="" className="sns_form" ><TwitterIcon fontSize="small" /></a>
                    </div>
                </Grid>
                <Grid className={classes.grid} item xs={8} sm={8}>
                    <Paper>
                        <div className="page_title">
                            <h1>お知らせ・更新</h1>
                            <div className="update_date">
                                <p>最終更新日: 2021年**月**日</p>                         
                            </div>
                            <div className="articles">
                                {Object.keys(props.qiitaData).map(key => {
                                    return(
                                        <div className="article" key={key}>
                                            <span className="create_date">{props.qiitaData[key].date+': '}</span>
                                            <a className="article_url" href={props.qiitaData[key].url}>
                                                {props.qiitaData[key].notice_content}
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid className={classes.grid} item xs={3} sm={3}>
                    <Paper>
                        <RigthSideList twitterData={props.twitterData} />
                    </Paper>
                </Grid>
          </Grid>
        </div>
    )
}