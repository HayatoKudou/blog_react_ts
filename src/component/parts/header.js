import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { diffDate, serverUrl } from '../../common';

import User from '../auth/User';
import ToolsTop from '../tools/top';
import SideList from '../parts/SideList';
import TabPanel from './TabPanel';
import Top from '../page/top';
import Contact from '../page/contact';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title_pc: {
        flexGrow: 1,
    },
    title_smartphone: {
        width: '50%',
    },
    userName_pc: {
        fontSize: 15,
    },
    userName_smart: {
        fontSize: 13,
    },
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
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    header_icons: {
        display: 'flex',
    },
    header_icon_smart: {
        padding: '7px',
    },
    tab: {
        width: 'auto',
        fontSize: '12px',
        padding: '0 5px',
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
    }
}));

export default function MenuAppBar(props) {
    const location = props.location;
    const classes = useStyles();
    const { pathname } = location;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [left_open, set_left_open] = useState(false);
    const [badge_open, set_badge_open] = useState(false);    
    const [tab_value, set_tab_value] = useState(0);
    const allTabs = ['/', '/blog', '/tools', '/portfolio', '/contact'];

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTabChange = (value) => {
        props.location.history.push(value);
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => set_left_open(true)}>
                        <MenuIcon />
                    </IconButton>

                    <Drawer open={left_open} onClose={() => set_left_open(false)}>
                      <div
                        tabIndex={0}
                        role="button"
                        onClick={() => set_left_open(false)}
                        onKeyDown={() => set_left_open(false)}
                      >
                        <SideList />
                      </div>
                    </Drawer>

                    <Typography variant="h6" className={User.get('device') === 'pc' ? classes.title_pc : classes.title_smartphone + ' header_title'}>
                        {'駆け出しエンジニアの開発ブログ'}
                    </Typography>
                    <div>
                        <div className={classes.header_icons}>
                            <IconButton className={User.get('device') === 'smartphone' ? classes.header_icon_smart : ''} aria-label="show 17 new notifications" color="inherit" onClick={() => {set_badge_open(true)}}>
                            <Badge badgeContent={JSON.parse(User.getLocalStorage('notice')) != null ? JSON.parse(User.getLocalStorage('notice')).length : 0} color="secondary" max={99}>
                                <MailIcon  />
                            </Badge>

                            {badge_open && (
                                JSON.parse(User.getLocalStorage('notice')) != null && JSON.parse(User.getLocalStorage('notice')).length !== 0 ? (
                                    <ClickAwayListener onClickAway={() => set_badge_open(false)}>
                                        <Paper className="paper">
                                            {JSON.parse(User.getLocalStorage('notice')).map(key => (
                                                <div key={key.id}>
                                                    {diffDate(key.created_at) + ': '}{key.notice}
                                                </div>
                                            ))}
                                        </Paper>
                                    </ClickAwayListener>)
                                :
                                (<ClickAwayListener onClickAway={() => set_badge_open(false)}>
                                    <Paper className="paper">お知らせはありません。</Paper>
                                </ClickAwayListener>)
                            )}

                            </IconButton>
                            <IconButton
                                className={User.get('device') === 'smartphone' ? classes.header_icon_smart : ''}
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                                <span className={User.get('device') === 'pc' ? classes.userName_pc : classes.userName_smart}>
                                    {User.isLoggedIn() ?
                                        JSON.parse(User.getLocalStorage('user')).name.length > 15 ?
                                        JSON.parse(User.getLocalStorage('user')).name.substr(0, 15) + '...' : JSON.parse(User.getLocalStorage('user')).name
                                    :
                                        'ゲストユーザー'
                                    }
                                </span>
                            </IconButton>
                        </div>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            {User.isLoggedIn() === true ? (
                                <div>
                                    {/* <MenuItem><Link to="/profile" className="route_link">プロフィール</Link></MenuItem> */}
                                    <MenuItem onClick={() => {User.logout();window.location.reload();}}>ログアウト</MenuItem>
                                </div>)
                                :
                                (<div>
                                    <MenuItem><Link to="/register" className="route_link">ユーザー登録</Link></MenuItem>
                                    <MenuItem><Link to="/login" className="route_link">ログイン</Link></MenuItem>
                                </div>
                                )}
                        </Menu>
                    </div>
                </Toolbar>

                <Tabs value={location.location.pathname} variant="scrollable" scrollButtons="auto" onChange={handleTabChange}>
                    <Tab label="サイトトップ" value="/" component={Link} to={allTabs[0]} />
                    <Tab label="ブログ" value="/blog" component={Link} to={allTabs[1]} />
                    <Tab label="webツール" value="/tools" component={Link} to={allTabs[2]} />
                    <Tab label="ポートフォリオ" value="/portfolio" component={Link} to={allTabs[3]} />
                    <Tab label="お問い合わせ" value="/contanct" component={Link} to={allTabs[4]} />
                </Tabs>

            </AppBar>
        </div>
    );
}