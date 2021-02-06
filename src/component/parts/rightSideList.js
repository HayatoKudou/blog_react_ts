import { TwitterTimelineEmbed } from 'react-twitter-embed'

export default function RigthSideList(props){

    var twitterData = props.twitterData;

    return(
        <div className="latest_info">
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="metalic_kudo_h"
                options={{height: 400}}
            />
        </div>
    )
}