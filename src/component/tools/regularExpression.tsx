import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import '../../css/tools/regularExpression.css';
import '../../css/tools/tools.css';
import Header from '../parts/header';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import Grid from '@material-ui/core/Grid';

export const RegularExpression: React.FC = (props) => {

    var customRegularEexpression: string = ''; //正規表現パターン
    var optionFlag: string = ''; //正規表現パターン

    const [input_str, setInputStr] = useState('');
    const [result, setResult] = useState('');
    const [custom_regular_expression, setCustomRegularRxpression] = useState('');

    const [example_regularExpression_postalCode, setExample_regularExpression_postalCode] = useState(false);
    const [example_regularExpression_emailAddress, setExample_regularExpression_emailAddress] = useState(false);
    const [example_regularExpression_phoneNumber, setExample_regularExpression_phoneNumber] = useState(false);
    const [example_regularExpression_day, setExample_regularExpression_day] = useState(false);

    //オプションフラグ
    const [option_flag, set_option_flag] = useState('');
    const [option_flag_g, set_option_flag_g] = useState(false);
    const [option_flag_i, set_option_flag_i] = useState(false);
    const [option_flag_m, set_option_flag_m] = useState(false);
    const [option_flag_dot, set_option_flag_dot] = useState(false);

    //正規表現実行
    function run_regular_expression(customRegularEexpression: string, str: string = ''): void {
        const regexp = new RegExp(customRegularEexpression, optionFlag);
        const matchStr = str == '' ? input_str.match(regexp) : str.match(regexp);
        console.log(regexp);
        console.log(matchStr);
        if(matchStr !== null){
            matchStr.forEach(value =>
                setResult(value)
            )
        } else {
            setResult('');
        }
    }

    function set_regular_expression(e: any): void{

        var value: string = e.target.value;
        var name: string = e.target.name;
        var checked: boolean = e.target.checked;

        customRegularEexpression = custom_regular_expression;
        optionFlag = option_flag;

        if(name === 'input_str'){
            setInputStr(value);
            run_regular_expression(customRegularEexpression, value);
            return;
        } else if(name === 'custom_regular_expression'){
            customRegularEexpression = value;
            setCustomRegularRxpression(value);
        } else if(name === 'example_regularExpression_postalCode'){
            customRegularEexpression = checked === true ? custom_regular_expression + '[0-9]{3}-[0-9]{4}' : custom_regular_expression.replace('[0-9]{3}-[0-9]{4}', '');
            setCustomRegularRxpression(customRegularEexpression);
            setExample_regularExpression_postalCode(checked);
        } else if(name === 'example_regularExpression_emailAddress'){
            customRegularEexpression = checked === true ? custom_regular_expression + '^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\\.[A-Za-z0-9]{1,}' : custom_regular_expression.replace('^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\\.[A-Za-z0-9]{1,}', '');
            setCustomRegularRxpression(customRegularEexpression);
            setExample_regularExpression_emailAddress(checked);
        } else if(name === 'example_regularExpression_phoneNumber'){
            customRegularEexpression = checked === true ? custom_regular_expression + '^\\d{1,4}-\\d{1,4}-\\d{3,4}$' : custom_regular_expression.replace('^\\d{1,4}-\\d{1,4}-\\d{3,4}$', '');
            setCustomRegularRxpression(customRegularEexpression);
            setExample_regularExpression_phoneNumber(checked);
        } else if(name === 'example_regularExpression_day'){
            customRegularEexpression = checked === true ? custom_regular_expression + '\\d{4}/\\d{1,2}/\\d{1,2}' : custom_regular_expression.replace('\\d{4}/\\d{1,2}/\\d{1,2}', '');
            setCustomRegularRxpression(customRegularEexpression);
            setExample_regularExpression_day(checked);
        }

        //オプションフラグ
        else if(name === 'option_flag_g'){
            optionFlag = checked === true ? option_flag + 'g' : option_flag.replace('g', '');
            set_option_flag(optionFlag);
            set_option_flag_g(checked);
        } else if(name === 'option_flag_i'){
            optionFlag = checked === true ? option_flag + 'i' : option_flag.replace('i', '');
            set_option_flag(optionFlag);
            set_option_flag_i(checked);
        } else if(name === 'option_flag_m'){
            optionFlag = checked === true ? option_flag + 'm' : option_flag.replace('m', '');
            set_option_flag(optionFlag);
            set_option_flag_m(checked);
        } else if(name === 'option_flag_dot'){
            optionFlag = checked === true ? option_flag + '.' : option_flag.replace('.', '');
            set_option_flag(optionFlag);
            set_option_flag_dot(checked);
        }

        // console.log(name + ': ' + value);
        // console.log(input_str + ': ' + customRegularEexpression);
        run_regular_expression(customRegularEexpression, optionFlag);
    }

    function set_regular_expression_button(target_name: string): void{
        customRegularEexpression = custom_regular_expression + target_name;
        setCustomRegularRxpression(custom_regular_expression + target_name);
        run_regular_expression(customRegularEexpression);
    }

    function input_delete(inputName: string){
        if(inputName === 'input_str'){
            setInputStr('');
        } else if(inputName === 'custom_regular_expression'){
            setCustomRegularRxpression('');
        } else if(inputName === 'result'){
            setResult('');
        }
    }

    const styles = {
        resize:{'fontSize': '16px'},
    }

    return(
        <div>
            <Header location={props} />
                <div className="root">
                <TextField className="input_str" label="検証対象文字列" variant="outlined" size="small" name="input_str"
                    InputProps={{endAdornment:
                        <div className="input_icon">
                            <IconButton className="copy_btn" data-clipboard-text={input_str}>
                                <FileCopyOutlinedIcon fontSize="small" className="copy_icon" />
                            </IconButton>
                            <IconButton onClick={() => input_delete('input_str')}>
                                <BackspaceOutlinedIcon fontSize="small" className="copy_icon" />
                            </IconButton>
                        </div>
                    }}
                    InputLabelProps={{style: {fontSize: 17, paddingTop: 2}}}
                    onChange={(e) => set_regular_expression(e)}
                    value={input_str}
                />
                <TextField className="input_str" label="正規表現" variant="outlined" size="small" name="custom_regular_expression"
                    InputProps={{endAdornment:
                        <div className="input_icon">
                            <IconButton className="copy_btn" data-clipboard-text={custom_regular_expression}>
                                <FileCopyOutlinedIcon fontSize="small" className="copy_icon" />
                            </IconButton>
                            <IconButton onClick={() => input_delete('custom_regular_expression')}>
                                <BackspaceOutlinedIcon fontSize="small" className="copy_icon" />
                            </IconButton>
                        </div>
                    }}
                    InputLabelProps={{style: {fontSize: 17, paddingTop: 2}}}
                    onChange={(e) => set_regular_expression(e)}
                    value={custom_regular_expression}
                />
                    <Grid container spacing={3} className="input_regular_expression">
                        <Grid item xs={6} sm={6}>
                        <p className="input_regular_expression_title">【 正規表現パターン 】</p>
                                <div className="regular_expression_pattren_button_form readmore">
                                    <input id="check1" className="readmore-check" type="checkbox" />
                                    <div className="readmore-content">
                                        <div className="regular_expression_pattren_button_group">
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('/')}>\: 次の文字をエスケープ</Button>
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('^')}>^: 行の先頭にマッチ</Button>
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('$')}>$: 行の末尾にマッチ</Button>
                                        </div>
                                        <div className="regular_expression_pattren_button_group">
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('*')}>*: 直前の文字の0回以上の繰り返しにマッチ</Button>
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('+')}>+: 直前の文字の1回以上の繰り返しにマッチ</Button>
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('?')}>?: 直前の文字の0回か1回の出現にマッチ</Button>
                                        </div>
                                        <div className="regular_expression_pattren_button_group">
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('x|y')}>x|y: 'x',または'y'にマッチ</Button>
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('{n}')}>{'{n}: '}直前の文字がちょうどn回出現するものにマッチ</Button>
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('{n,}')}>{'{n,}: '}'直前の式の少なくともn回の出現にマッチ</Button>
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('{n,m}')}>{'{n,m}: '}直前の文字が少なくともn回、多くてもm回出現するものにマッチ</Button>
                                        </div>
                                        <div className="regular_expression_pattren_button_group">
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('ABC')}>ABC: 「ABC」という文字列にマッチ</Button>
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('[ABC]')}>[ABC]: A,B,Cのいずれか１文字にマッチ</Button>
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('[^ABC]')}>[^ABC]: A,B,C以外のいずれか１文字にマッチ</Button>
                                        </div>
                                        <div className="regular_expression_pattren_button_group">
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('\\d')}>&#092;d: 数字にマッチ。[0-9]に相当</Button>
                                            <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('\\D')}>&#092;D: 数字以外の文字にマッチ。[^0-9]に相当</Button>
                                        </div>
                                    </div>
                                    <label className="readmore-label" htmlFor="check1"></label>
                                </div>

                                <div className="option_flag_input_form">
                                    <p className="input_regular_expression_title">【 オプションフラグ 】</p>
                                    <label>
                                        <Checkbox name="option_flag_g" checked={option_flag_g} color="default" onClick={(e) => set_regular_expression(e)} size="small" />
                                        <span>グローバルサーチ</span>
                                    </label>
                                    <label>
                                        <Checkbox name="option_flag_i" checked={option_flag_i} color="default" onClick={(e) => set_regular_expression(e)} size="small" />
                                        <span>大文字・小文字を区別しない検索</span>
                                    </label>
                                    <label>
                                        <Checkbox name="option_flag_m" checked={option_flag_m} color="default" onClick={(e) => set_regular_expression(e)} size="small" />
                                        <span>複数行検索</span>
                                    </label>
                                    <label>
                                        <Checkbox name="option_flag_dot" checked={option_flag_dot} color="default" onClick={(e) => set_regular_expression(e)} size="small" />
                                        <span>.を改行文字と一致させる</span>
                                    </label>
                                </div>
                        </Grid>

                        <Grid className="exmple_form" item xs={6} sm={6}>
                            <div>
                                <p className="input_regular_expression_title">【 パターン例 】</p>
                                <div className="regular_expression_pattren_button_form">
                                    <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('[A-Za-z]')}>[A-Za-z]: アルファベット</Button>
                                    <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('[ぁ-ん]')}>[ぁ-ん]: 全角ひらがな</Button>
                                    <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('[ァ-ヴ]')}>[ァ-ンヴー]: 全角カタカナ</Button>
                                    <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('^[0-9]*$')}>^[0-9]*$: 半角数値のみ</Button>
                                    <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('^[a-zA-Z]*$')}>^[a-zA-Z]*$: 半角英字のみ</Button>
                                    <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('^[0-9a-zA-Z]*$')}>^[0-9a-zA-Z]*$: 半角英数字のみ</Button>
                                    <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('^([0-9]{5,})$')}>{'^([0-9]{5,})$'}: 5文字以上の半角英数字</Button>
                                    <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('^([0-9]{0,5})$')}>{'^([0-9]{0,5})$'}: 5文字以内の半角英数字</Button>
                                    <Button variant="outlined" size="small" color="primary" onClick={() => set_regular_expression_button('^([a-zA-Z0-9]{5,10})$')}>{'^([a-zA-Z0-9]{5,10})$'}: 5文字以上10文字以内の半角英数字</Button>
                                </div>
                            </div>
                            <div>
                                <p className="input_regular_expression_title">【 代表的な正規表現例 】</p>
                                <details>
                                    <summary>
                                        <label className="regularExpression_detail">
                                            <div className="regularExpression_detail_title">
                                                <Checkbox name="example_regularExpression_postalCode" color="default" checked={example_regularExpression_postalCode} onClick={(e) => set_regular_expression(e)} size="small" />
                                                <p>郵便番号</p>
                                            </div>
                                            <div className="regularExpression_detail_display">
                                                <p>{'[0-9]{3}-[0-9]{4}'}</p>
                                            </div>
                                        </label>
                                    </summary>
                                    <div className="example_regularExpression_explanation">
                                        <ul>
                                            <li>{'[0-9]は0から9の半角数字が一つあることを意味しています。'}</li>
                                            <li>{'{3}は直前の[0-9]のパターンが３回繰り返されることを意味しています。'}</li>
                                            <li>{'-はハイフンがあることを意味しています。'}</li>
                                        </ul>
                                    </div>
                                </details>
                                <details>
                                    <summary>
                                        <label className="regularExpression_detail">
                                            <div className="regularExpression_detail_title">
                                                <Checkbox name="example_regularExpression_phoneNumber" color="default" checked={example_regularExpression_phoneNumber} onClick={(e) => set_regular_expression(e)} size="small" />
                                                <p>電話番号</p>
                                            </div>
                                            <div className="regularExpression_detail_display">
                                                <p>{'^\\d{1,4}-\\d{1,4}-\\d{3,4}$'}</p>
                                            </div>
                                        </label>
                                    </summary>
                                    <div className="example_regularExpression_explanation">
                                        <ul>
                                            <li>{'半角ハイフンを含んだ1〜4桁・1〜4桁・3〜4桁の半角数字を意味しています。'}</li>
                                        </ul>
                                    </div>
                                </details>
                                <details>
                                    <summary>
                                        <label className="regularExpression_detail">
                                            <div className="regularExpression_detail_title">
                                                <Checkbox name="example_regularExpression_day" color="default" checked={example_regularExpression_day} onClick={(e) => set_regular_expression(e)} size="small" />
                                                <p>日付</p>
                                            </div>
                                            <div className="regularExpression_detail_display">
                                                <p>{'\\d{4}/\\d{1,2}/\\d{1,2}'}</p>
                                            </div>
                                        </label>
                                    </summary>
                                    <div className="example_regularExpression_explanation">
                                        <ul>
                                            <li>{'\\d{4}は、数字４桁であることを意味しています。'}。</li>
                                            <li>{'\\d{1,2}は、数字1桁~2桁であること。'}。</li>
                                            <li>※フォーマットは"yyyy/m/d"のみとします。</li>
                                        </ul>
                                    </div>
                                </details>
                                <details>
                                    <summary>           
                                        <label className="regularExpression_detail">
                                            <div className="regularExpression_detail_title">
                                                <Checkbox name="example_regularExpression_emailAddress" color="default" checked={example_regularExpression_emailAddress} onClick={(e) => set_regular_expression(e)} size="small" />
                                                <p>Emailアドレス</p>
                                            </div>
                                            <div className="regularExpression_detail_display">
                                                <p>{'^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\\.[A-Za-z0-9]{1,}'}</p>
                                            </div>
                                        </label>
                                    </summary>
                                    <div className="example_regularExpression_explanation">
                                        <ul>
                                            <li>{'^[A-Za-z0-9]{1}は、アルファベット小文字/大文字/数字を意味しています。'}</li>
                                            <li>{'[A-Za-z0-9_.-]*は、アルファベット小文字/大文字/数字/アンダースコア/ピリオド/ハイフンを意味しています。(0文字以上)'}</li>
                                            <li>{'@{1}は、連続してはいけないことを意味しています。'}</li>
                                            <li>{'[A-Za-z0-9_.-]{1,}は、アルファベット小文字/大文字/数字/アンダースコア/ピリオド/ハイフンを意味しています。(1文字以上)'}</li>
                                            <li>{'\\.[A-Za-z0-9]{1,}$は、アルファベット小文字/大文字/数字を意味しています。(1文字以上)'}</li>
                                        </ul>
                                    </div>
                                </details>
                            </div>
                        </Grid>
                    </Grid>

                <TextField className="result_form" label="結果" rows={5} variant="outlined" multiline value={result}
                    InputProps={{endAdornment:
                        <div className="input_icon">
                            <IconButton className="copy_btn" data-clipboard-text={result}>
                                <FileCopyOutlinedIcon className="copy_icon" />
                            </IconButton>
                            <IconButton onClick={() => input_delete('result')}>
                                <BackspaceOutlinedIcon className="copy_icon" />
                            </IconButton>
                        </div>
                    }}
                />

                <div className="box_form">
                    <span className="box-title">ツール説明</span>
                    <p className="p1">
                        JavaScriptで動作する正規表現の生成/テストツールです。<br/>
                        ※JavaScript以外の言語では正常に動作しない可能性があります。<br/>
                        入力されている正規表現をmatchメソッドを実行し、マッチングした文字列を表示しています。
                    </p>
                    <p className="p2">
                        入力したデータはSPA処理をしているため、ページの読み込みが必要なく入力されたデータは常に正規表現チェックしております。<br/>
                        また外部との通信をしていないためデータの漏洩リスクはございません。
                    </p>
                    <blockquote>
                        <p>■参考リンク</p>
                        <cite>引用：<a target="_blank" href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions">正規表現 - JavaScript | MDN</a></cite>
                        <cite>引用：<a target="_blank" href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/RegExp">RegExp - JavaScript | MDN</a></cite>
                        <cite>引用：<a target="_blank" href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/match">String.prototype.match() - MDN</a></cite>
                    </blockquote>
                </div>

                <div className="box_form">
                    <span className="box-title">ツール使用方法</span>
                    <ul>
                        <li>1番上の入力フォームに確認したい文字列を入力。</li>
                        <li>2番目の入力フォームに正規表現を入力、もしくは「正規表現パターン」「代表的な正規表現例」から選択。</li>
                        <li>高度な検索が必要な場合はオプションフラグを選択。</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
