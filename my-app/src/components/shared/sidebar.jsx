import { Avatar, Collapse, Grid, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    profileInfo: {
        textAlign: "center"
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    mainHeading: {
        color: '#319EF3'
    }
}));

const Sidebar = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Grid container style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Grid container item xs={12} direction={`column`} justify={`center`} alignContent={`center`}>
                {/* <Grid item className={classes.profileInfo}> */}
                <Typography align={`center`}>Assignment</Typography>
                <Avatar alt="Profile Image" src="https://www.w3schools.com/howto/img_avatar.png" className={classes.large} />
                <Typography align={`center`}>
                    John Doe
                    </Typography>
                <Typography align={`center`}>
                    online
                    </Typography>
                {/* </Grid> */}
            </Grid>
            <Grid container item xs={12} spacing={3}>
                <List
                    component="nav"
                    className={classes.root}
                >
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <DashboardOutlinedIcon className={classes.mainHeading}/>
                        </ListItemIcon>
                        <ListItemText primary="Home" className={classes.mainHeading} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary="DashBoard" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Grid>
        </Grid>
    )
}

export default Sidebar;