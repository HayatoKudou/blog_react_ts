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
    },
}));

export default function ReactUnity(props){

    function componentDidMount() {
        document.title = 'react-unity-webglでReact × Unityを動かす方法';
    }

    useEffect(() => {
        componentDidMount();
    });

    const classes = useStyles();
    const code =
`import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";

const unityContent = new UnityContent(
    "/Build/2D_Action_Game.json",
    "/Build/UnityLoader.js",
);

export const Game = () => {
    return <Unity unityContent={unityContent} />;
};`;

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
                    <Grid item className={classes.grid} xs={User.get('device') === 'pc' ? 8 : 12}>
                        <Paper>
                            <div className="page_title">
                                <h1>react-unity-webglでReact × Unityを動かす方法</h1>
                                <div className="update_date"><p>投稿日: 2021年1月8日</p></div>

                                <h2>目的</h2>
                                <p className="blog_p">UnityをWebGL形式で出力し、React上で動かす</p>
                                <Link to="/blog/reactUnity_sample">2Dアクションゲームのサンプル</Link>

                                <h3>使用環境</h3>
                                <ul>
                                    <li>React (17.0.1)</li>
                                    <li>Unity (2019.419f1)</li>
                                    <li>react-unity-webgl</li>
                                </ul>

                                <h3>手順</h3>
                                <h4>1.react-unity-webglインストール</h4>
                                <p className="blog_p">
                                    Unityのバージョンに対応するパッケージをダウンロード<br/>
                                    ※Unityのバージョンは、【HELP → Check for Updates】もしくは【Unity Hub】から確認できます。
                                </p>
                                <pre className="prettyprint linenums lang-js blog_code">
                                    <code>$ npm install react-unity-webgl@8.x  # For Unity 2020 and 2021 </code><br/>
                                    <code>$ npm install react-unity-webgl@7.x  # For Unity 2018 and 2019 (LTS) </code><br/>
                                    <code>$ npm install react-unity-webgl@6.x  # For Unity 2017 (LTS) </code><br/>
                                    <code>$ npm install react-unity-webgl@5.x  # For Unity 5.6 (LTS) </code>
                                </pre>
                                <a href="https://github.com/elraccoone/react-unity-webgl">公式GitHub</a>

                                <h4>2.UnityをWebGL形式でビルド</h4>
                                <ul className="blog_ul">
                                    <li>【File → Build Settings】からビルドページを開く</li>
                                    <li>Platformから「WebGL」を選択し、Switch Platformを押す。</li>
                                    <li>ビルド対象シーンを選択し、Build実行</li>
                                </ul>
                                <span>参考: </span><a href="https://blog.naichilab.com/entry/2017/04/29/125527">【unity】WebGLビルド方法 - naichi's lab</a>
                                <p className="blog_p">
                                    ビルドされたディレクトリから、「Build」ディレクトリを確認してください。画像のような構造になっているかと思います。<br/>
                                    このBuildディレクトリを、Reactプロジェクトのpublicフォルダーに置いてください。
                                </p>
                                <img className="blog_img" src="/React_Unity.png" alt=""/>

                                <h4>3.React側でUnityオブジェクトの作成</h4>
                                <p className="blog_p">
                                    UnityWebGLライブラリからUnityおよびUnityContentクラスをインポート、<br/>
                                    新しいコンテンツオブジェクトを作成し、レンダリング関数で割り当てます。
                                </p>
                                <pre className="prettyprint linenums lang-js blog_code">
                                    <code>{code}</code>
                                </pre>

                                <h3>終わり</h3>
                                <p className="blog_p">
                                    ここまでお疲れ様でした。<br/>
                                    ReactでUnityを扱えるって燃えませんか？私は燃えました。<br/>
                                    便利なパッケージを作ってくれた方に感謝です！
                                </p>

                            </div>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.grid} xs={User.get('device') === 'pc' ? 3 : 12}>
                        <Paper>
                            <RigthSideList twitterData={props.twitterData} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}