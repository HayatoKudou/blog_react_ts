import * as React from 'react';
import { useState } from 'react';

type Props = {
    className?: string;
    name: string;
    value: string;
    onClick: any;
    option: string;
    state?: any;
}

export var Radio: React.FC<Props> = ({className = '', name, value, onClick, option, state = null}) => {
    var checked_state = state === value ? true: false;
    //onChangeはエラー回避のためのダミー
    const [checked, setChecked] = useState(checked_state);
    function checkedManagement(){
        if(checked_state){
            setChecked(true);
        } else {
            setChecked(false);
        }
    }
    return(
        <label className={className}>
            <input type="radio" name={name} value={value} onClick={onClick} onChange={() => checkedManagement()} checked={checked_state}/>
            <span>{option}</span>
        </label>
    )
}