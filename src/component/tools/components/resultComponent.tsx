import * as React from 'react';
import { useState } from 'react';

type Props = {
    code: string;
    method: string;
    language: string;
}

export const Result: React.FC<Props> = ({code, method, language}) => {

    const [resultCode, setResultCode] = useState([]);
    const [oonloadendCode, setOonloadendCode] = useState('');
    const [errorCode, setErrorCode] = useState([]);
    const [copyButtontitle, setCopyButtontitle] = useState('Copy');
    const [processingTime, setProcessingTime] = useState(0);

    const closure = `
    (function (data) {
        return data;
    }(result));`;
    //返り値取得の為即時関数をつける / 整形もする
    var after_code = '';
    var run_code = '';

    if(language === 'JavaScript'){
        after_code = code.replace('*send_space*', '').replace('*open_space*', '').replace('*result_space*', '');
        run_code = method === 'STR' ? code + closure : after_code.replace('*setResultCode_space*', 'setResultCode(result)').replace('*setOnloadendCode_space*', 'setOonloadendCode(onloadend)').replace('*setErrorCode_space*', 'setErrorCode(errors)');
    } else if(language === 'PHP'){
        after_code = code.replace('*method*', '').replace('*curl_setopts*', '').replace('*curl_error*', '').replace('*curl_errno*', '').trim();
        run_code = after_code;
    }

    function changeCopyButtontitle(){
        setCopyButtontitle('Copied');
        setTimeout(() => {
            setCopyButtontitle('Copy')
        }, 700);
    }

    function run(run_code: string){
        //始まりの時間を記録
        var start = performance.now();
        if(language === 'JavaScript'){
            setResultCode(eval(run_code))
        } else {
            var result: string = '';
            var formData = new FormData() ;
            formData.append( 'run_code', run_code ) ;

            var xhr = new XMLHttpRequest();
            var url = "https://kudohayatoblog.com/api/run_php";
            xhr.open("POST", url);
            xhr.send(formData);

            xhr.onreadystatechange = function () {
                if(xhr.readyState === xhr.DONE) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        setResultCode(xhr.response);
                    }
                }
            };
        }
        //終わりの時間を記録
        var end = performance.now();
        setProcessingTime(end - start);
    }

    function reset(){
        setResultCode([]);
        setErrorCode([]);
        setOonloadendCode('');
        setProcessingTime(0);
    }

    return (
        <div className="row">
            <div className="col-md-2">
                <button className="program_run_button" onClick={() => run(run_code)}>Run</button>
                <button className="program_reset_button" onClick={() => reset()}>Reset</button>
            </div>
            <div className="col-md-10">
                <pre className="prettyprint linenums lang-js program_result_form">
                    <code className="program_btn">
                        <span>処理時間: {processingTime} ms</span>
                        <button className="copy_btn" data-clipboard-text={resultCode} onClick={() => changeCopyButtontitle()}>{copyButtontitle}</button>
                    </code>
                    {Object.keys(errorCode).map(key => {
                        return(
                            errorCode[key] != '' &&
                            <div key={key}>
                                <code className="program_error_code">{'>  '}</code>
                                <code className="program_error_code">{errorCode[key]}</code>
                            </div>
                        )
                    })}
                    {Array.isArray(resultCode) ?
                        Object.keys(resultCode).map(key => {
                            if(resultCode[key] == ''){
                                return;
                            }
                            return(
                                <div key={key}>
                                    <code className="program_result_code">{'>  '}</code>
                                    <code className="program_result_code">{resultCode[key]}</code>
                                </div>
                            )
                        })
                    :
                        <div>
                            <code className="program_result_code">{'>  '}</code>
                            <code className="program_result_code">{resultCode}</code>
                        </div>
                    }
                    {
                        Object.keys(oonloadendCode).map(key => {
                            return(
                                <div key={key}>
                                    <code className="program_result_code">{'>  '}</code>
                                    <code className="program_result_code">{oonloadendCode[key]}</code>
                                </div>
                            )
                        })
                    }
                </pre>
            </div>
        </div>
    )
}