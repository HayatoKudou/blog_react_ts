import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        color: 'inherit',
        textDecoration: 'none',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    now: {
        display: 'flex',
        textDecoration: 'none',
        color: '#444444',
        fontWeight: 'bold',
    }
}));

export default function Breadcrumb(props){

    const classes = useStyles();
    const pathname = props.location.location.pathname;

    return(
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/" className={classes.link}>
                <HomeIcon className={classes.icon} />サイトトップ
                </Link>
                {pathname === '/blog' &&
                    <Link to={pathname} className={classes.now}>ブログ</Link>
                }
                {pathname === '/tools' &&
                    <Link to={pathname} className={classes.now}>WEBツール</Link>
                }
                {pathname === '/portfolio' &&
                    <Link to={pathname} className={classes.now}>ポートフォリオ</Link>
                }
                {pathname === '/contact' &&
                    <Link to={pathname} className={classes.now}>お問い合わせ</Link>
                }
            </Breadcrumbs>
        </div>
    )
}