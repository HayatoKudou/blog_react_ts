import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { diffDate, serverUrl } from '../../common';

import User from '../auth/User';
import SideList from '../parts/SideList';

import { fade, makeStyles } from '@material-ui/core/styles';
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
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BackspaceIcon from '@material-ui/icons/Backspace';

const useStyles = makeStyles((theme) => ({
    root: {flexGrow: 1, },
    title_pc: {flexGrow: 1,},
    title_smartphone: {
        width: '45%',
        fontSize: '15px',
    },
    userName_pc: {fontSize: 15,},
    userName_smart: {fontSize: 13,},
    list: {
        width: 250,
        backgroundColor: theme.palette.background.paper,
    },
    list_title: {textAlign: 'center',},
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
    header_icons: {display: 'flex',},
    header_icon_smart: {padding: '7px',},
    tab: {
        width: 'auto',
        fontSize: '12px',
        padding: '0 5px',
        whiteSpace: 'nowrap',
        fontWeight: 'bold',        
    },
    search_form: { position: 'relative',},
    search: {
        margin: '10px 0',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        alignItems: 'center',
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
    },
    deleteIcon: {color: 'white'},
    search_link_form: {
        padding: 0,
        zIndex: 2,
    },
    s_result: { 
        position: 'absolute',
        backgroundColor: 'white',
        color: 'black',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: '100%',
    },
    search_link: {padding: '0px !important', height: '35px' },
    searchLinkIcon: {paddingLeft: '16px', paddingRight: '5px'},
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
            width: '20ch',
            },
        },
    },
}));

export default function MenuAppBar(props) {
    const location = props.location;
    const pathname = location.location.pathname;
    const classes = useStyles();
    const { register, handleSubmit, errors, reset } = useForm();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [left_open, set_left_open] = useState(false);
    const [badge_open, set_badge_open] = useState(false);
    const [search_result, set_search_result] = useState([]);
    const allTabs = ['/', '/blog', '/tools', '/portfolio', '/contact', '/admin'];

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTabChange = (value) => {
        props.location.history.push(value);
    }

    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    function article_search(data){
        fetch(serverUrl + '/api/article_search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
            } else {
                return response.json().then(data => {
                    if('errors' in data){
                        console.log(data.errors);
                    } else {
                        if(data.length > 0){
                            set_search_result(data);
                        } else {
                            set_search_result([]);
                        }
                    }
                });
            }
        }).catch(error => {
            console.log(error);
        })
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
                            {User.get('device') === 'pc' &&
                                <form onSubmit={handleSubmit(article_search)} className={classes.search_form}>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase name="keyword"
                                            autoComplete="off"
                                            placeholder="記事を検索"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputRef={register({ required: true })}
                                            inputProps={{ 'aria-label': 'search' }}
                                            onChange={(e) => article_search({'keyword': e.target.value})}
                                        />
                                        <IconButton onClick={() => {reset();set_search_result([]);}}>
                                            <BackspaceIcon fontSize="small" className={classes.deleteIcon} />
                                        </IconButton>
                                        <div className={classes.s_result}>
                                            {search_result.length !== 0 && 
                                                Object.keys(search_result).map(key => (
                                                    <List className={classes.search_link_form} key={key}>
                                                        <ListItemLink href={search_result[key].path != null ? search_result[key].path : search_result[key].url} className={classes.search_link_form}>
                                                            <SearchIcon className={classes.searchLinkIcon} />
                                                            <ListItemText className={classes.search_link}
                                                                primary={<Typography style={{ fontSize: '15px', padding: '3px' }}>{search_result[key].content}</Typography>}
                                                            />
                                                        </ListItemLink>
                                                    </List>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </form>
                            }
                            <IconButton className={User.get('device') === 'smartphone' ? classes.header_icon_smart : ''} aria-label="show 17 new notifications" color="inherit" onClick={() => {set_badge_open(true)}}>
                            <Badge badgeContent={JSON.parse(User.getLocalStorage('notice')) !== null ? JSON.parse(User.getLocalStorage('notice')).length : 0} color="secondary" max={99}>
                                <MailIcon  />
                            </Badge>

                            {badge_open && (
                                JSON.parse(User.getLocalStorage('notice')) !== null && JSON.parse(User.getLocalStorage('notice')).length !== 0 ? (
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
                                    <MenuItem onClick={() => {User.logout();window.location.reload();}}>ログアウト</MenuItem>
                                </div>)
                                :
                                (<div>
                                    <MenuItem><Link to="/login" className="route_link">ログイン</Link></MenuItem>
                                </div>
                                )}
                        </Menu>
                    </div>
                </Toolbar>

                <Tabs value={pathname} variant="scrollable" scrollButtons="auto" onChange={handleTabChange}>
                    <Tab label="サイトトップ" value="/" component={Link} to={allTabs[0]} />
                    {pathname.indexOf('/blog/') !== -1 ?
                        <Tab label="ブログ" value={pathname} component={Link} to={allTabs[1]} />
                    :
                        <Tab label="ブログ" value="/blog" component={Link} to={allTabs[1]} />
                    }
                    {pathname.indexOf('/tools/') !== -1 ?
                        <Tab label="webツール" value={pathname} component={Link} to={allTabs[2]} />
                    :
                        <Tab label="webツール" value="/tools" component={Link} to={allTabs[2]} />
                    }
                    <Tab label="お問い合わせ" value="/contact" component={Link} to={allTabs[4]} />
                    {(User.isLoggedIn()) && (
                        pathname.indexOf('/admin/') !== -1 ?
                        <Tab label="管理者画面" value={pathname} component={Link} to={allTabs[5]} />
                    :
                        <Tab label="管理者画面" value="/admin" component={Link} to={allTabs[5]} />
                    )}
                </Tabs>

            </AppBar>
        </div>
    );
}