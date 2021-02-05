import * as React from 'react';
import { useState } from 'react';

type Props = {
    code: string;
    language?: string;
}

export const Code: React.FC<Props> = ({code, language}) => {
    const [copyButtontitle, setCopyButtontitle] = useState('Copy');
    var after_code = '';
    if(language === 'JavaScript'){
        after_code = code.replace('*send_space*', '').replace('*open_space*', '').replace('*result_space*', '').replace('*setResultCode_space*', '').replace('*setOnloadendCode_space*', '').replace('*setErrorCode_space*', '').trim();
    } else if(language === 'PHP'){
        after_code = code.replace('*method*', '').replace('*curl_setopts*', '').replace('*curl_error*', '').replace('*curl_errno*', '').trim();
    }
    after_code = after_code.replace(/^\s*\n/gm, '');

    function changeCopyButtontitle(){
        setCopyButtontitle('Copied');
        setTimeout(() => {
            setCopyButtontitle('Copy')
        }, 700);
    }

    return (
        <div>
            <pre className="prettyprint linenums lang-js program_pre_form">
                <code className="program_btn">
                    <p className="program_language_title">{language}</p>
                    <p><button className="copy_btn" data-clipboard-text={after_code} onClick={() => changeCopyButtontitle()}>{copyButtontitle}</button></p>
                </code>
                {/* <code contentEditable={true}>{after_code}</code> */}
                <code>{after_code}</code>
            </pre>
        </div>
    )
}