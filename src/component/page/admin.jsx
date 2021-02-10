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
    const [access, set_access] = useState();

    const getAdminData = () => {
        fetch(serverUrl + '/api/getAdminData', {
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
                        set_access(data.access);
                    }
                });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return(
        <div>
            <Header location={props}  />
            <Breadcrumb location={props} />
            <button onClick={getAdminData}>取得</button>
            <div className={classes.root}>
                <p>アクセス数: {access}</p>
            </div>
        </div>
    )
}