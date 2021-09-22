import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom"
import { useLoginContext } from '../../contexts/Login.Provider'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    navTitle: {
        flexGrow: 9,
        fontWeight: "bolder",
    },
}));

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function ElevateAppBar(props) {
    const classes = useStyles();
    const { details, setDetails } = useLoginContext();
    const responseSuccessGoogle = (response) => {
        axios.post(
            'http://localhost:5000/api/users/google-login',
            { tokenId: response.tokenId }
        ).then(response => {
            console.log("response", response);
            localStorage.setItem('user', JSON.stringify({ email: response.data.userInfo.email, token: response.data.token }))
            setDetails({ email: response.data.userInfo.email, token: response.data.token })
            history.push('/')
        }).catch(err => {
            alert(err.message)
        })
    }

    const responseFailureGoogle = (response) => {

    }
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem('user');
        setDetails(false);
        history.push('/login')
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <div className={classes.root}>
                    <AppBar>
                        <Toolbar>

                            <Typography className={classes.navTitle} variant="h6" href="/">
                                <NavLink to="/">
                                    Short Linker
                                </NavLink>
                            </Typography>



                            {details ? (
                                <>
                                    <Typography variant="h6">{details.email}</Typography>
                                    <Button variant="outlined" color="secondary" onClick={logout}>
                                        Logout
                                    </Button>
                                </>

                            ) :
                                <div className="m-3">
                                    <Link to="/login">

                                        <Button variant="outlined" color="secondary" className="m-3">
                                            Login
                                        </Button>

                                    </Link>

                                    <Link to="/signup">
                                        <Button variant="outlined" color="secondary" className="m-3">
                                            Signup
                                        </Button>


                                    </Link>



                                    <GoogleLogin
                                        clientId="380829121265-5qk4vemufsunancvgqhqvttaaa2hgcpm.apps.googleusercontent.com"
                                        buttonText="Login"
                                        onSuccess={responseSuccessGoogle}
                                        onFailure={responseFailureGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />

                                </div>
                            }


                        </Toolbar>
                    </AppBar>
                </div>
            </ElevationScroll>
            <Toolbar />

        </React.Fragment>
    );
}
