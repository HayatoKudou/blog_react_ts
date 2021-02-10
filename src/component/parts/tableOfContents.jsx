import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: '-webkit-sticky',
    position: 'sticky',
    top: 0,
  },
  main: {
      padding: 20,
  },
  mokuzi: {textAlign: 'center',},
  listItem: {
    paddingLeft: 15,
    borderLeft: '5px solid #757575',
  },
  listText: {
      fontSize: 15,
  }
}));

export const TableOfContents = (props) => {

  const classes = useStyles();

  function executeScroll(name){
    props.els.current[name].current.scrollIntoView();
  }

  return (
    <div className={classes.root}>
        <List className={classes.main}>
            <ListItemText className={classes.mokuzi} primary="目 次" />
            {Object.keys(props.tableOfContentsData).map(key => {
                return(
                    <ListItem className={classes.listItem} key={key} button onClick={() => executeScroll(props.tableOfContentsData[key])}>
                        <ListItemText className={classes.listText} 
                        primary={<Typography className={classes.listText}>{props.tableOfContentsData[key]}</Typography>}
                    />
                    </ListItem>
                )
            })}
        </List>
    </div>
  );
}