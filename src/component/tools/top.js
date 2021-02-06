import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { diffDate, serverUrl } from '../../common';
import RigthSideList from '../parts/rightSideList';
import Header from '../parts/header';
import Sns from '../parts/sns';
import Breadcrumb from '../parts/breadcrumb';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TwitterIcon from '@material-ui/icons/Twitter';

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


export default function ToolsTop(props){
    const classes = useStyles();

    return (
        <div>
            <Header location={props} />
            <Breadcrumb location={props} />
            <div className={classes.root}>            
                <Grid container spacing={3}>
                    <Grid item xs={1} sm={1}>
                        <Sns />
                    </Grid>
                    <Grid className={classes.grid} item xs={8} sm={8}>
                        <Paper>
                            <div className="page_title">
                                <h1>WEBツール</h1>
                            </div>
                            <div className="articles">
                                <div className="article">
                                    <Link className="article_url" to="/tools/regularExpression">正規表現ツール</Link>
                                </div>
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
        </div>
    )
}