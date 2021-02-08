import User from '../auth/User';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
        backgroundColor: theme.palette.background.paper,
    },
    list_title: {
        textAlign: 'center',
    },
    list_title_span: {
        fontWeight: 'bold',
        fontSize: '20px',
        borderBottom: 'dotted 1px',
        paddingBottom: '15px',
    },
    list_checked: {
        color: '#1976d2',
        padding: '5px 0 0 0 !important',
    },
    list_nochecked: {
        padding: '0 0 0 30px !important',
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function SideList(){

    const classes = useStyles();

    return(
        <div className={classes.list}>
            <List>
                <ListItemText className={classes.list_title} primary={
                    <Typography type="body2" className={classes.list_title_span}>{"kudohayatoblog.com"}</Typography>
                }/>
                <ListItemLink href="/">
                    <ListItemText className={classes.list_checked} primary="駆け出しエンジニアの開発ブログ" />
                </ListItemLink>
                {User.isLoggedIn() ?
                <div>
                    <ListItemLink href="/" className={classes.list_nochecked}>
                        <ListItemText primary="サイトトップ" />
                    </ListItemLink>
                    <ListItemLink href="/tools" className={classes.list_nochecked}>
                        <ListItemText primary="WEBツール" />
                    </ListItemLink>
                    <ListItemLink href="/portfolio" className={classes.list_nochecked}>
                        <ListItemText primary="ポートフォリオ" />
                    </ListItemLink>
                    <ListItemLink href="/contact" className={classes.list_nochecked}>
                        <ListItemText primary="お問い合わせ" />
                    </ListItemLink>
                    <ListItemLink href="/post" className={classes.list_nochecked}>
                        <ListItemText primary="投稿" />
                    </ListItemLink>
                    <ListItemLink onClick={() => {User.logout();window.location.reload();}} className={classes.list_nochecked}>
                        <ListItemText primary="ログアウト" />
                    </ListItemLink>
                </div>
                :
                <div>
                    <ListItemLink href="/" className={classes.list_nochecked}>
                        <ListItemText primary="サイトトップ" />
                    </ListItemLink>
                    <ListItemLink href="/tools" className={classes.list_nochecked}>
                        <ListItemText primary="WEBツール" />
                    </ListItemLink>
                    <ListItemLink href="/portfolio" className={classes.list_nochecked}>
                        <ListItemText primary="ポートフォリオ" />
                    </ListItemLink>
                    <ListItemLink href="/contact" className={classes.list_nochecked}>
                        <ListItemText primary="お問い合わせ" />
                    </ListItemLink>
                    <ListItemLink href="/register" className={classes.list_nochecked}>
                        <ListItemText primary="ユーザー登録" />
                    </ListItemLink>
                    <ListItemLink href="/login" className={classes.list_nochecked}>
                        <ListItemText primary="ログイン" />
                    </ListItemLink>
                </div>
                }
            </List>
        </div>
    )
};