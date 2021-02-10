import React, { useState } from 'react';
import { serverUrl } from '../../common';
import Header from '../parts/header';
import Breadcrumb from '../parts/breadcrumb';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '0 auto',
        marginTop: '20px',
        padding: '15px',
    },
    form: {
        width: '80%',
        margin: '0 auto',
    },
}));

export const Admin = (props) => {

    const classes = useStyles();

    return(
        <div>
            <Header location={props}  />
            <Breadcrumb location={props} />
            <div className={classes.root}>
                <p>アクセス数: </p>
            </div>
        </div>
    )
}