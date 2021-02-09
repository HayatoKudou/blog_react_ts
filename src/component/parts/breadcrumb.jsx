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
    },
    breadcrumb: {margin: '10px 0'}
}));

export default function Breadcrumb(props){

    const classes = useStyles();
    const pathname = props.location.location.pathname;

    return(
        <div>
            <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
                <Link to="/" className={classes.link}>
                <HomeIcon className={classes.icon} />サイトトップ
                </Link>
                {pathname === '/blog' &&
                    <Link to={pathname} className={classes.now}>ブログ</Link>
                }
                {pathname === '/blog/reactUnity' &&
                    <Link to={'/blog'} className={classes.link}>ブログ</Link>
                }
                {pathname === '/blog/reactUnity' &&
                    <Link to={pathname} className={classes.now}>react-unity-webglでReact × Unityを動かす方法</Link>
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
                {pathname === '/tools/regularExpression' &&
                    <Link to={'/tools'} className={classes.link}>WEBツール</Link>
                }
                {pathname === '/tools/regularExpression' &&
                    <Link to={pathname} className={classes.now}>正規表現ツール</Link>
                }
                {pathname === '/tools/programGenerate' &&
                    <Link to={'/tools'} className={classes.link}>WEBツール</Link>
                }
                {pathname === '/tools/programGenerate' &&
                    <Link to={pathname} className={classes.now}>プログラム生成ツール</Link>
                }
            </Breadcrumbs>
        </div>
    )
}