import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { diffDate, serverUrl } from '../../common';
import RigthSideList from '../parts/rightSideList';
import Sns from '../parts/sns';
import {TableOfContents} from '../parts/tableOfContents';
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
    tableOfContents: {
        display: 'flex',
        padding: '5px !important',
    }
}));

export default function LaravelAuthApi(props){

    function componentDidMount() {
        document.title = 'LaravelでトークンベースのAPI認証';
    }

    useEffect(() => {
        componentDidMount();
    });

    const tableOfContentsData = [
        '目的', '使用環境', '手順',
        '1.DBの準備',
        '2.Guardの変更',
        '3.認証テスト',
        '終わり',
    ];
    const els = useRef([]);
    tableOfContentsData.map(i => {
        els.current[i] = React.createRef();
    })

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
                                <h1>LaravelでトークンベースのAPI認証</h1>
                                <div className="update_date"><p>投稿日: 2021年1月8日</p></div>

                                <h2 ref={els.current['目的']}>目的</h2>
                                <p className="blog_p">Laravelでユーザー登録・ログイン・ログアウト機能のAPI実装。</p>

                                <h3 ref={els.current['使用環境']}>使用環境</h3>
                                <ul>
                                    <li>Laravel (8.25.0)</li>
                                </ul>

                                <h3 ref={els.current['手順']}>手順</h3>
                                <h4 ref={els.current['1.DBの準備']}>1.DBの準備</h4>
                                <p className="blog_p">
                                    ユーザー管理用のテーブルを作成します。<br/>
                                    /database/migrationsディレクトリに標準で、***_create_users_table.php というmigrationファイルがあると思います。<br/>
                                    このファイルにapi_tokenのカラムを追加します。
                                    api_tokenはユニークでNULLを許容しないカラムとします。
                                </p>
                                <pre className="prettyprint linenums lang-php blog_code">
                                    <code>
{`public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
        $table->string('api_token',60)->unique()->nullable();  //追加
    });
}`}
                                    </code>                                    
                                </pre>

                                <p className="blog_p">
                                    migrationファイルができたら、migrateしテーブルを作成します。<br/>
                                    usersテーブルが作成されたことを確認してください。
                                </p>
                                <pre className="prettyprint linenums blog_code">
                                    <code>php artisan migrate</code>
                                </pre>

                                <h4 ref={els.current['2.Guardの変更']}>2.Guardの変更</h4>
                                <p className="blog_p">
                                    config/auth.phpのの中にguardsという項目があり、web guardとapi guardの２つが記載されていると思います。<br/>
                                    詳細な解説は割愛しますが、web guardはセッション、api guardはトークンを使った認証方式で、今回はapi guardを使用します。<br/>
                                    <br/>
                                    defaultsのguardをwebからapiに変更してください。<br/>
                                    ※configを修正しますので、変更後にキャッシュクリアをしておきましょう。
                                </p>
                                <pre className="prettyprint linenums blog_code">
                                    <code>
{`'defaults' => [
    'guard' => 'api',
    'passwords' => 'users',
],`}
                                    </code>
                                </pre>

                                <h4 ref={els.current['3.認証テスト']}>3.認証テスト</h4>
                                <p className="blog_p">
                                    routes/api.phpにデフォルトで定義されているルーティングで確認してみます。<br/>
                                </p>
                                <pre className="prettyprint linenums blog_code">
                                    <code>
{`Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});`}
                                    </code>
                                </pre>
                                <p className="blog_p">
                                    今回はfetchを使い、Authorization: Bearer でトークン渡してみます。<br/>
                                    トークンの渡し方は他にも、GETパラメータで渡す方法などもあります。
                                </p>
                                <pre className="prettyprint linenums lang-js blog_code">
                                    <code>
{`
fetch(serverUrl + '/api/user', {
    method: 'POST',
    headers: {'Authorization': 'Bearer:' + APIトークン},   //ここでトークンを渡します
})
.then(response => {
    if (!response.ok) {
        console.log(response);
    } else {
        return response.json().then(data => {
            if('errors' in data){
                console.log(data.errors);
            } else {
                console.log(data);  //認証が通るとここでデータが返されます。
            }
        });
    }
}).catch(error => {
    console.log(error);
})
`}
                                    </code>
                                </pre>

                                <h3 ref={els.current['終わり']}>終わり</h3>
                                <p className="blog_p">
                                    ここまでお疲れ様でした。<br/>
                                    今回の記事はLaravel標準のAPI認証処理を実装してみようという内容でした。<br/>
                                    今回は標準のGuardを使用しましたが、自作もできるみたいですね。<br/>
                                    ただ、セキュリティ周りの処理はセキュリティホールが怖いので、自作はちょっと怖いです（笑）<br/>
                                    <br/>
                                    Passportやjwt-authなどの外部ライブラリを使えばもっと簡単に強固な認証ができそうです。<br/>
                                    機会があればそちらも記事にしたいと思います。
                                </p>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.tableOfContents} xs={User.get('device') === 'pc' ? 3 : 12}>
                        <Paper className="tableOfContents">
                            <TableOfContents els={els} tableOfContentsData={tableOfContentsData} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}