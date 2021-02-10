import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { diffDate, serverUrl } from '../../common';
import RigthSideList from '../parts/rightSideList';
import Sns from '../parts/sns';
import Breadcrumb from '../parts/breadcrumb';
import Header from '../parts/header';
import User from '../auth/User';
import {Game} from '../parts/game';

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
    game: {height: '500px'}
}));

export default function ReactUnity_sample(props){

    const classes = useStyles();

    return (
        <div>
            <Header location={props} />
            <Breadcrumb location={props} />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {User.get('device') === 'pc' &&
                        <Grid item xs={1}>
                            <Sns />
                        </Grid>
                    }
                    <Grid className={classes.grid} item xs={User.get('device') === 'pc' ? 8 : 12}>
                        <Paper className={classes.game}>
                            <Game />
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