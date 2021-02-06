import { makeStyles } from '@material-ui/core/styles';

import {TwitterShareButton,} from "react-share";
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    icon: {margin: '0 auto',},
    sns_icon: {
        height: '40px',
        marginBottom: '15px',
    }
}));

export default function Sns(){
    const classes = useStyles();
    return(
        <div>
            <div className={classes.sns_icon}>
                <TwitterShareButton className="sns_twitter_form" via="@metalic_kudo_h" url="https://twitter.com/metalic_kudo_h">
                    <TwitterIcon className={classes.icon} fontSize="small" />
                </TwitterShareButton>
            </div>
            <div className={classes.sns_icon}>
                <a href="https://github.com/HayatoKudou" className="sns_git_form" >
                    <GitHubIcon className={classes.icon} fontSize="small" />
                </a>
            </div>
            <div className={classes.sns_icon}>
                <a href="https://qiita.com/metal_kentucky" className="sns_qiita_form" >
                    <SearchIcon className={classes.icon} />
                </a>
            </div>
        </div>
    )
}