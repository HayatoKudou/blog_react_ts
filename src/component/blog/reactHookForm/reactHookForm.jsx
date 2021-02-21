import React, {useState, useEffect, useRef} from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { diffDate, serverUrl } from '../../../common';
import RigthSideList from '../../parts/rightSideList';
import Sns from '../../parts/sns';
import {TableOfContents} from '../../parts/tableOfContents';
import Breadcrumb from '../../parts/breadcrumb';
import Header from '../../parts/header';
import User from '../../auth/User';
import ReactHookForm_sample_1 from './reactHookForm_sample_1';
import ReactHookForm_sample_2 from './reactHookForm_sample_2';
import ReactHookForm_sample_3 from './reactHookForm_sample_3';

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

export default function ReactHookForm(props){

    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => alert(JSON.stringify(data));
    const onSubmit2 = data => alert(JSON.stringify(data));

    function componentDidMount() {
        document.title = 'React Hookでバリデーション付きのフォームを実装';
    }

    useEffect(() => {
        componentDidMount();
    });

    const tableOfContentsData = [
        '目的', 'react-hook-formとは', '使用環境', '手順',
        '1.react-hook-formインストール',
        '2.完成図の確認',
        '3.register',
        '4.errors',
        '5.handleSubmit',
        '終わり',
    ];
    const els = useRef([]);
    tableOfContentsData.map(i => {
        els.current[i] = React.createRef();
    })

    const exmple_code =
`import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => alert(data);

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input name="example" defaultValue="test" ref={register} />
        <input name="exampleRequired" ref={register({ required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
    </form>
    );
}
`;

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
                                <h1>React Hookでバリデーション付きのフォームを実装</h1>
                                <div className="update_date"><p>投稿日: 2021年2月16日</p></div>

                                <h2 ref={els.current['目的']}>目的</h2>
                                <p className="blog_p">react-hook-formライブラリを用いて、バリデーション付きのフォームを実装する。</p>

                                <h3 ref={els.current['react-hook-formとは']}>react-hook-formとは</h3>
                                <a target="blank" href="https://react-hook-form.com/jp/">公式ドキュメント</a>
                                <p className="blog_p">
                                    公式ドキュメントによると、<span className="bold">【高性能で柔軟かつ拡張可能な使いやすいフォームバリデーションライブラリ】</span>とあります。
                                    ライブラリを導入するメリットとして、個人的には下記あたりが大きいと思います。
                                    <ul>
                                        <li>バリデーション処理をシンプルに書ける</li>
                                        <li>レンダリングを削減できる(onChangeで逐一レンダリングする必要がない)</li>
                                        <li>高速なマウント</li>
                                    </ul>
                                </p>

                                <h3 ref={els.current['使用環境']}>使用環境</h3>
                                <ul>
                                    <li>React (17.0.1)</li>
                                    <li>react-hook-form (6.15)</li>
                                </ul>

                                <h3 ref={els.current['手順']}>手順</h3>
                                <h4 ref={els.current['1.react-hook-formインストール']}>1.react-hook-formインストール</h4>
                                <pre className="blog_code">
                                    <code>npm install react-hook-form</code>
                                </pre>
                                <pre className="blog_code">
                                    <code>yarn add react-hook-form</code>
                                </pre>

                                <h4 ref={els.current['2.完成図の確認']}>2.完成図の確認</h4>
                                <p className="blog_p">
                                    下記を例とし、解説します。<br/>
                                    2つ目のフォームはrequiredとしていますので、試しに動きを確認してみてください。
                                </p>
                                <ReactHookForm_sample_1 />
                                <pre className="blog_code">
                                    <code>{exmple_code}</code>
                                </pre>

                                <h4 ref={els.current['3.register']}>3.register</h4>
                                <p className="blog_p">
                                    registerメソッドは、Refとバリデーションルールを登録することができます。<br/>
                                    提供されているバリデーションルールは<a target="blank" href="https://react-hook-form.com/jp/api/#register">公式</a>を確認してください。
                                </p>
                                <pre className="blog_code">
                                    <code>{'<input name="example" defaultValue="test"'} <span className="color_code">{'ref={register}'}</span> {'/>'}</code><br/>
                                    <code>{'<input name="exampleRequired"'} <span className="color_code">{'ref={register({ required: true })}'}</span> {'/>'}</code>
                                </pre>
                                <br/>
                                <p className="blog_p">
                                    バリデーションのエラーメッセージも設定できます。<br/>
                                    例のrequiredにのラーメッセージを「入力必須です」に設定してみます。<br/>
                                    (エラーメッセージはerrorsオブジェクトのmessageに入ります。)
                                </p>
                                <ReactHookForm_sample_2 />
                                <pre className="blog_code">
                                    <code>{'<input name="exampleRequired"'} <span className="color_code">{`ref={register({ required: '入力必須です' })}`}</span> {'/>'}</code><br/>
                                    <code>{'{errors.exampleRequired && '}<span className="color_code">{'<span>{errors.exampleRequired.message}</span>}'}</span></code>
                                </pre>

                                <h4 ref={els.current['4.errors']}>4.errors</h4>
                                <p className="blog_p">
                                    errorsオブジェクトは、各inputフォームのエラーまたはエラーメッセージが含まれています。<br/>
                                    例ではrequireのみ設定しているため、エラーが発生した場合はrequireのエラーメッセージを返せばいいです。
                                </p>
                                <pre className="blog_code">
                                    <code>{'{errors.exampleRequired && <span>This field is required</span>}'}</code><br/>
                                </pre>
                                <br/>
                                <p className="blog_p">
                                    しかし、単一のフィールドで複数のルールを設定している場合、エラー内容によってエラーメッセージを変える必要があります。<br/>
                                    その場合は、typesを使用してエラー内容を特定します。<br/>
                                    ルールをrequiredとmaxLengthを指定して試してみます。
                                </p>
                                <ReactHookForm_sample_3 />
                                <pre className="blog_code">
                                    <code>{'<input name="exampleRequired" ref={register({ required: true, maxLength: 5 })} />'}</code><br/>
                                    <code>{'{errors.exampleRequired?.type === "required" && "入力必須です。"}'}</code><br/>
                                    <code>{'{errors.exampleRequired?.type === "maxLength" && "5文字以内で入力してください。"}'}</code>
                                </pre>


                                <h4 ref={els.current['5.handleSubmit']}>5.handleSubmit</h4>
                                <p className="blog_p">
                                    handleSubmit関数は、フォームバリデーションに成功するとフォームデータを渡します。
                                    例では onSubmit にフォームデータを渡し、アラート表示しています。
                                </p>
                                <pre className="blog_code">
                                    <code>{'const onSubmit = data => alert(data);'}</code><br/>
                                    <code>{'<form onSubmit={handleSubmit(onSubmit)}>'}</code><br/>
                                </pre>


                                <h3 ref={els.current['終わり']}>終わり</h3>
                                <p className="blog_p">
                                    ここまでお疲れ様でした。<br/>
                                    react-hook-formはいかがだったでしょうか？<br/>
                                    私はこれまでフォームの実装はReduxで実装することが多かったため、レンダリングの少なさに驚きました。<br/>
                                    早くて、簡単で、個人的にはフォームライブラリの決定版です。
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