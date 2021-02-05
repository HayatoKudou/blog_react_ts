import * as React from 'react';
import { useState } from 'react';
import {CheckBox} from './checkboxComponent';
import {Table} from './tableComponent';
import {Tooltip} from './tooltipComponent';

type Props = {
    name: string;
    value: any;
    onClick: any;
    option: string;
    state?: any;
    details?: any;
    disabled?: boolean;
    tool_tip_str?: string;
}

export var Details: React.FC<Props> = ({name, value, onClick, option, state = null, details = null, disabled = false, tool_tip_str = ''}) => {
    return(
        <details className="program_accordion_title_details">
            <summary className="program_accordion_title_summary">
                <CheckBox name={name} value={value} onClick={onClick} option={option} state={state} disabled={disabled} />
                {tool_tip_str.length > 0 && <Tooltip detail={tool_tip_str} />}
            </summary>
            <p>{details}</p>
            {name === 'option_property_readyState' && <Table />}
        </details>
    )
}