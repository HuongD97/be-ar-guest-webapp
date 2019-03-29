import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';

const styles = {
    card:         {
        width:        250,
        height:       250,
        borderRadius: 20,
        position: 'relative'
    },
    title:        {
        fontSize:   16,
        textAlign:  'center',
        fontFamily: 'Avenir',
        fontWeight: '500',
        lineHeight: 1.2,
        marginTop:  8,
    },
    description:  {
        fontSize:   12.5,
        textAlign:  'center',
        lineHeight: 1.4,
        marginTop:  5,
    },
    alterations: {
        fontSize: 12.5,
        textAlign: 'left',
        lineHeight: 1.4,
        marginTop: 5,
        marginLeft: 13,
        fontWeight: 500,
    },
    alterationsDescription: {
        fontSize: 12.5,
        lineHeight: 1.4,
        marginTop: 5,
        marginLeft: 3,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    expandButton:   {
        borderRadius: 10,
        position: 'absolute',
        marginTop: 25,
        marginLeft: 55,
    },
    expandButtonText:   {
        fontFamily: 'Avenir',
        fontSize: 12.5,
    },
};

function ItemCard(props) {
    const {classes} = props;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs>
                            <Typography className={classes.title}>
                                {props.itemName}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FavoriteIcon className={classes.favoriteIcon}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography className={classes.description} color="textSecondary">
                    {/* Plant-based sausage topped with pickled slaw, BBQ vegan aioli, & roasted corn relish. */}
                    {props.itemDescription}
                </Typography>
                {/* <Typography className={classes.description} color="textSecondary">
                    Served with french fries or apple slices.
                </Typography> */}
                <Divider variant="middle" style={{marginTop: 8}}/>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    <Typography className={classes.alterations} color="textSecondary">
                        Alterations:
                    </Typography>
                    <Typography className={classes.alterationsDescription} color="textSecondary">
                        {props.substitution}
                    </Typography>
                </Grid>
                <Button variant="outlined" className={classes.expandButton}>
                    <Typography className={classes.expandButtonText}>View More</Typography>
                </Button>
            </CardContent>
        </Card>
    );
}

ItemCard.propTypes = {
    classes: PropTypes.object.isRequired,
    itemName: PropTypes.string.isRequired,
    itemDescription: PropTypes.string.isRequired,
    substitution: PropTypes.string.isRequired,
};

export default withStyles(styles)(ItemCard);
