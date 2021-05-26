import { Button, CardContent, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import HighlightedBox from '../shared/highlightedBox';
import Sidebar from '../shared/sidebar';
import Home from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    }
}));

const Dashboard = (props) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={2}>
                <Sidebar />
            </Grid>
            <Grid item xs={10}>
                <div className={classes.root}>
                    <Grid container spacing={3} style={{ backgroundColor: '#cffbff', height: '100vh' }}>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <HighlightedBox bgColor={`#EC407A`} count={20} title={`Subscribers`} />
                                    <HighlightedBox bgColor={`#9C27B0`} count={20} title={`Followers`} />
                                    <HighlightedBox bgColor={`#03A9F4`} count={20} title={`Total Posts`} />
                                    <HighlightedBox bgColor={`#009688`} count={20} title={`Total Articles`} />
                                </Grid>

                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Carousel>
                                <Grid item xs={12} key="content">
                                    <CardContent className="Content">
                                        <Typography className="Title">
                                            Vulputate Mollis Ultricies
                                        </Typography>

                                        <Typography className="Caption">
                                            Caption
                                        </Typography>

                                        <Button variant="outlined" className="ViewButton">
                                            View Now
                                        </Button>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={12} key="content">
                                    <CardContent className="Content">
                                        <Typography className="Title">
                                            Vulputate Mollis Ultricies
                                        </Typography>

                                        <Typography className="Caption">
                                            Caption
                                        </Typography>

                                        <Button variant="outlined" className="ViewButton">
                                            View Now
                                        </Button>
                                    </CardContent>
                                </Grid>
                            </Carousel>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}

export default Dashboard;