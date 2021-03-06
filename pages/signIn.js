import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {signIn, signOut, getCurrentUser} from '../services/accounts';
import Router from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import Loading from '../components/Loading';
import Link from 'next/link';
import errorHandler from '../misc/errors-handler';

const styles = theme => ({
    main:   {
        width:                                                    'auto',
        display:                                                  'block', // Fix IE 11 issue.
        marginLeft:                                               theme.spacing.unit * 3,
        marginRight:                                              theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width:       400,
            marginLeft:  'auto',
            marginRight: 'auto',
        },
    },
    paper:  {
        marginTop:     theme.spacing.unit * 8,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        padding:       `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin:          theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form:   {
        width:     '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    error:  {
        marginTop:    theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        color:        'red',
        minHeight: theme.spacing.unit*3
    }
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:          '',
            password:       '',
            error:          '',
            showPassword:   false,
            loading:        true,
        }
    }

    authorizedUser = async () => {
        try {
            const user = await getCurrentUser();
            return !isNil(localStorage.uid) && user && user.uid === localStorage.uid;
        } catch (e) {
            throw e;
        }
    };

    async componentDidMount() {
        try {
            const userIsAuthorized = await this.authorizedUser();
            if (userIsAuthorized) {
                Router.push('/');
            } else {
                localStorage.clear();
                // User is not logged in
                await signOut();
                this.setState({loading: false});
            }
        } catch (e) {
            console.log('e', e);
        }
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleSubmit = async () => {
        try {
            this.setState({error: ''})
            const result = await signIn(this.state.email, this.state.password);
            localStorage.setItem('uid', result.user.uid);
            Router.push('/');
        } catch (err) {
            console.log('err', err);
            if (err.code === 'auth/user-not-found') {
                this.setState({
                                  error: `${
                                             this.state.email
                                             } is not registered in our system.`,
                              });
            } else {
                this.setState({
                                  error: errorHandler.getErrorMessage(err),
                              });
            }
        }
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    renderErrorMessage = () => {
        const {classes} = this.props;
        return (
            <Typography className={classes.error}>
                {this.state.error}
            </Typography>
        )
    };

    renderSignIn() {
        const {classes} = this.props;
        if (this.state.loading) {
            return <Loading/>;
        } else {
            return (
                <main className={classes.main}>
                    <CssBaseline/>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    label="Email"
                                    className={classNames(classes.textField)}
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    className={classNames(classes.textField)}
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    label="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    InputProps={{
                                        endAdornment: (
                                                          <InputAdornment position="end">
                                                              <IconButton
                                                                  aria-label="Toggle password visibility"
                                                                  onClick={this.handleClickShowPassword}
                                                              >
                                                                  {this.state.showPassword ? (
                                                                      <VisibilityOff/>
                                                                  ) : (
                                                                      <Visibility/>
                                                                  )}
                                                              </IconButton>
                                                          </InputAdornment>
                                                      ),
                                    }}
                                />
                            </FormControl>
                            <div style={{marginTop: '8px'}}>
                                <Link href='/signUp'>
                                    <a style={{textDecoration: 'none'}}>
                                        <Typography style={{color: 'blue'}}>Don't have an account? Sign up here!</Typography>
                                    </a>
                                </Link>
                            </div>
                            {this.renderErrorMessage()}
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleSubmit}>
                                Sign In
                            </Button>
                        </form>
                    </Paper>
                </main>
            );
        }
    }

    render() {
        return this.renderSignIn();
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
