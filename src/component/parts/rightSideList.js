import { TwitterTweetEmbed } from 'react-twitter-embed'

export default function RigthSideList(props){

    var twitterData = props.twitterData;

    return(
        <div className="latest_info">
            <h3>最新投稿</h3>
            <ul>
                <li><a href=""></a></li>
            </ul>
            {Object.keys(twitterData).map(key => {
                console.log(String(twitterData[key].id));
                return(
                    <div key={key}>
                        <TwitterTweetEmbed tweetId={twitterData[key].id.toString(10)} />
                    </div>
                )
            })}
        </div>
    )
}