import React, {useState, Component,useEffect} from 'react';
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

    function componentDidMount() {
        document.title = 'WEBツール';
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
                    <Grid item xs={1} sm={1}>
                        <Sns />
                    </Grid>
                    <Grid className={classes.grid} item xs={8} sm={8}>
                        <Paper>
                            <div className="page_title">
                                <h1>WEBツール</h1>
                                <div className="update_date">
                                    <p>最終更新日: 2021年1月8日</p>
                                </div>
                            </div>
                            <div className="tools">
                                <Link to="/tools/regularExpression">
                                    <img border="1px" src="/regularExpression.png" alt=""/>
                                    <p>
                                        <span>正規表現ツール</span><br/><br/>
                                        JavaScriptで動作する正規表現の生成/テストツールです。<br/>
                                        ※JavaScript以外の言語では正常に動作しない可能性があります。<br/>
                                        入力されている正規表現をmatchメソッドを実行し、マッチングした文字列を表示しています。
                                    </p>
                                </Link>
                            </div>
                            <div className="tools">
                                <Link to="/tools/programGenerate">
                                    <img border="1px" src="/programGenerate.png" alt=""/>
                                    <p>
                                        <span>プログラム生成ツール</span><br/><br/>
                                        JavaScriptで動作するプログラム生成ツールです。<br/>
                                        設定されたコードを実行し、実行結果を表示します。<br/>
                                    </p>
                                </Link>
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