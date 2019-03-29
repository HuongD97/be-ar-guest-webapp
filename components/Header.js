import React from 'react';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '../components/Menu';
// import Logo from './images/logo.png';

const styles = theme => ({
    signInButton: {
        position: 'absolute',
    },
    headerGridLayout:   {
        width: 'auto',
    },
    headerLogoImage:    {
        width: "15%", 
        height: "15%",
    },
    headerLogoText: {
        fontFamily: "Avenir",
        fontSize: 30,
    }
});

function Header(props) {
    const { classes } = props;
    return (
        <div style={{marginTop: '-2%',}}>
            {/* <div>
                <Link href={'/signIn'}>
                    <Button color={'secondary'} variant={'outlined'}>
                        Sign In
                    </Button>
                </Link>
            </div> */}
            <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.headerGridLayout}>
                <Grid container direction="column" justify="space-between" alignItems="center">
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                        <img src="../static/images/logo.png" alt="Logo" className={classes.headerLogoImage} />
                        <text className={classes.headerLogoText}>
                            be AR guest
                        </text>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
