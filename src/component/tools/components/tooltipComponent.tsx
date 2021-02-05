import * as React from 'react';

type Props = {
    detail: string;
    detail2?: string;
}

export var Tooltip: React.FC<Props> = ({detail, detail2 = ''}) => {
    return(
        <div className="cp_tooltip program_cp_tooltip" >
            <i className="fas fa-info-circle tool_tip_icon"></i>
            <div className="cp_tooltiptext program_cp_tooltip_text">
                <span>{detail}</span>
                {detail2.length > 0 &&
                    <span className="program_cp_tooltip_text_2">
                        {detail2}
                    </span>
                }
            </div>
        </div>
    )
}