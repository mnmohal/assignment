import React, { useState } from 'react';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, Paper } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import { SignInAction } from '../../redux/user/userActions'

const useStyles = makeStyles((theme) => ({
    '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
        height: '80vh',
        marginTop: '5vh'
    },
    textCenter: {
        textAlign: 'center',
        fontWeight: 'normal',
        color: theme.palette.text.secondary
    },
    heading: {
        textAlign: 'center'
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '100%',
    },
}));

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);

    const { userSignIn } = props;

    const classes = useStyles();

    const login = async () => {
        const params = {
            "password": password,
            "email": email.toLowerCase()
        }
        const response = await userSignIn(params);
        if (response && response.status === 200) {
            props.history.push("/dashboard");
        }
    }

    return (
        <>
            <Paper className={classes.paper}>
                <Grid container spacing={2} direction="column">
                    <Grid item xs>
                        <h1 className={classes.heading}>Login</h1>
                    </Grid>
                    <Grid item xs alignContent={`center`}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container xs direction={`column`} spacing={2}>
                                <Grid item xs>
                                    <TextField id="email" value={email} onChange={e => setEmail(e.target.value)} label="Email" variant="outlined" className={clsx(classes.margin, classes.textField)} />
                                </Grid>
                                <Grid item xs>
                                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            type={!isPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setIsPassword(!isPassword)}
                                                        // onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {!isPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs>
                                    <Button variant="contained" color="primary" disabled={!email || !password} className={clsx(classes.margin, classes.textField)} onClick={() => login()}>
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs>
                        <h5 className={classes.textCenter}>&copy; 2021</h5>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        userSignIn: (data) => dispatch(SignInAction(data)),
    }
}

export default connect(null, mapDispatchToProps)(Login);