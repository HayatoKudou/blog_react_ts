export var JavaScript_Ajax_Default: string = 
`var xhr = new XMLHttpRequest();
var url = "https://kudohayatoblog.com/api/exmple";
var result = [];

xhr.open("GET", url);
xhr.send();
`;

export var JavaScript_Ajax_option_header_content_type_flag: string = 
`xhr.send();
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");`;

export var JavaScript_Ajax_option_property_onreadystatechange: string = `
xhr.onreadystatechange = function () {
    if(xhr.readyState === xhr.DONE) {
        if (xhr.status >= 200 && xhr.status < 400) {
            *result_space*
            result.push(xhr.response);
            *setResultCode_space*
        }
    }
};
`;

export var JavaScript_Ajax_option_property_readyState: string = `
            result.push(xhr.readyState);`;

export var JavaScript_Ajax_option_property_response: string = `
            result.push(xhr.response);`;

export var JavaScript_Ajax_option_property_responseText: string = `
            result.push(xhr.responseText);`;

export var JavaScript_Ajax_option_property_status: string = `
            result.push(xhr.status);`;

export var JavaScript_Ajax_option_property_statusText: string = `
            result.push(xhr.statusText);`;

export var JavaScript_Ajax_option_property_onerror: string = `
xhr.onerror = function ( event ) {
    var errors = [];
    errors.push(event);
    *setErrorCode_space*
};`;

export var JavaScript_Ajax_option_property_onloadend: string = `
xhr.onloadend = function ( event ) {
    var onloadend = [];
    onloadend.push(xhr.response);
    *setOnloadendCode_space*
};`;

export var JavaScript_Ajax_option_method_abort: string = `
if (OH_NOES_WE_NEED_TO_CANCEL_RIGHT_NOW_OR_ELSE) {
    xhr.abort();
}`;

export var JavaScript_Ajax_option_method_getAllResponseHeaders: string = `
            result.push(xhr.getAllResponseHeaders());`;



export var JavaScript_STR_Default: string = 
`var str = "javascript文字列";`;

export var JavaScript_STR_substr: string = 
`var str = "javascript文字列";
var result = str.substr(0, 5);`;

export var JavaScript_STR_substring: string = 
`var str = "javascript文字列";
var result = str.substring(0, 5);`;

export var JavaScript_STR_slice: string = 
`var str = "javascript文字列";
var result = str.slice(0, 5);`;

export var JavaScript_STR_split: string = 
`var str = "javac, script, 文字列";
var result = str.split(',');`;




export var PHP_Ajax_Default: string = 
`$url = "https://kudohayatoblog.com/api/exmple";
$curl = curl_init($url);
*method*
*curl_setopts*
*curl_error*
*curl_errno*
$responce = curl_exec($curl);
curl_close($curl);
`;

export var PHP_Ajax_option_method: string = 
`curl_setopt($curl,CURLOPT_POST, TRUE);`;

export var PHP_Ajax_CURLOPT_BINARYTRANSFER: string = 
`curl_setopt($curl, CURLOPT_BINARYTRANSFER, true);`;

export var PHP_Ajax_option_curl_error: string = 
`if(curl_exec($curl) === false){
    $responce = curl_error($curl);
}`;

export var PHP_Ajax_option_curl_errno: string = 
`if(curl_errno($curl)){
    $responce = curl_error($curl);
}`;