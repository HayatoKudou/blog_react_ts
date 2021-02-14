import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { diffDate, serverUrl, update_date } from '../../common';
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
    // const [qiitaData, set_qiitaData] = useState('');
    // const [articleData, set_articleData] = useState('');
    const [article_data, set_article_data] = useState('');

    function componentDidMount() {
        document.title = '駆け出しエンジニアの開発ブログ';
    }

    function getData(){
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
                        set_article_data(data.articleData);
                    }
                });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        componentDidMount();
        getData();
    }, []);

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
                                    <p>最終更新日: {update_date}</p>
                                </div>
                                <div className="articles">
                                    {article_data && (
                                        Object.keys(article_data).map(key => {
                                            return(                                                
                                                (article_data[key].type === 'notice' || article_data[key].type === 'qiita') && (
                                                    <div className="article" key={key}>
                                                        <span className="create_date">{article_data[key].date+': '}</span>
                                                        {article_data[key].url ? (
                                                            <a href={article_data[key].url} target="blank">{article_data[key].content}</a>) 
                                                        : 
                                                            <span className="article_url">{article_data[key].content}</span>
                                                        }                                                        
                                                    </div>
                                                )
                                            )
                                        })
                                    )}
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