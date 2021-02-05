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


export default function ToolsTop(){
    const classes = useStyles();

    window.onload = () => {
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
                        console.log(data);
                    }
                });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid className={classes.grid} item xs={1} sm={1}>
                    <div>
                        <a href="" className="sns_form" >
                            <TwitterIcon fontSize="small" />
                        </a>
                    </div>
                </Grid>
                <Grid className={classes.grid} item xs={8} sm={8}>
                    <Paper>
                        <div className="page_title">
                            <h1>WEBツール</h1>
                        </div>
                    </Paper>
                </Grid>
                <Grid className={classes.grid} item xs={3} sm={3}>
                  <Paper>
                        <RigthSideList />
                  </Paper>
                </Grid>
          </Grid>
        </div>
    )
}