import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import LiveTvIcon from '@material-ui/icons/LiveTv';
const useStyles = makeStyles((theme) => ({
    box: {
        borderRadius: 10,
        padding: theme.spacing(2),
        paddingTop: theme.spacing(4)
    },
    icon: {
        fontSize: 50
    },
    boxFont:{
        color: '#fff'
    }
}));

const HighlightedBox = (props) => {
    const classes = useStyles();
    const { bgColor, count, title, icon } = props;

    return (
        <Grid item xs={6}>
            <Grid container className={classes.box} style={{backgroundColor: bgColor}} justify={`space-between`} alignItems={`flex-end`}>
                <Grid item>
                    <Typography className={classes.boxFont}>
                        {count}
                    </Typography>
                    <Typography className={classes.boxFont}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item>
                    <LiveTvIcon className={[classes.icon, classes.boxFont]}   />
                </Grid>
            </Grid>
        </Grid>

    )
}

export default HighlightedBox;