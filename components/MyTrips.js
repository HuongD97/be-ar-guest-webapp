import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import moment from 'moment-timezone';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    tripName:    {
        fontSize:   18,
        fontFamily: "Avenir",
        fontWeight: 400,
        [theme.breakpoints.down('xs')]: {
            fontSize:   14,
            fontFamily: "Avenir",
            fontWeight: 300
        }
    },
    text: {
        fontFamily: "Avenir",
        fontSize: 14,
        [theme.breakpoints.down('xs')]: {
            fontSize:   12,
            fontFamily: "Avenir",
        }
    },
    mealName: {
        textDecoration: 'underline',
        fontSize: 16,
        fontFamily: "Avenir",
    },
    restaurantInfo: {
        fontSize:   15,
        fontFamily: "Avenir",
        fontWeight: 400,
    },
    day: {
        fontWeight: 450,
        fontSize: 18,
        paddingTop: theme.spacing.unit,
        fontFamily: "Avenir",
        [theme.breakpoints.down('xs')]: {
            fontSize:   14,
            fontFamily: "Avenir",
            fontWeight: 350
        }
    },
    cardSpacing: {
        margin:theme.spacing.unit
    },
    dateStyling: {
        fontSize: 18,
        fontFamily: "Avenir",
        [theme.breakpoints.down('xs')]: {
            fontSize:   14,
            fontFamily: "Avenir",
            fontWeight: 350
        }
    }
});

class MyTrips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: this.props.trips
        }
    }

    deleteRestaurant = (meal) => async event => {
        try {
            const result       = await axios.post('/mealPlan/deleteRestaurantFromTrip', meal);
            // Remove the item from the view

            let indexOfTrip, indexOfMeal;
            const updatedTrip = this.state.trips.find((trip, index) => {
                if (trip.tripID === meal.tripID) {
                    indexOfTrip = index;
                }
                return trip.tripID === meal.tripID;
            });

            const updatedMeal = updatedTrip.mealsByDay.filter((m, index) => {
                if (m.mealName === meal.mealName && m.day === meal.day && m.restaurantID === meal.restaurantID) {
                    indexOfMeal = index;
                }

                return m.mealName !== meal.mealName || m.day !== meal.day || m.restaurantID !== meal.restaurantID;
            });

            let updatedTrips          = this.state.trips;
            updatedTrips[indexOfTrip] = updatedTrip;
            updatedTrip.mealsByDay    = updatedMeal;

            this.setState({trips: updatedTrips});
        } catch (e) {
            console.log(e);
        }
    };

    renderMealPlans(mealsByDay) {
        const {classes} = this.props;
        if (mealsByDay.length === 0) {
            return (
                <Grid container>
                    <Grid item>
                        <Typography className={classes.text}>
                            No meals planned for this trip yet.
                        </Typography>
                    </Grid>
                </Grid>
            );
        }

        let showMealsByDay = [];
        const mealsGroupedByDay = groupBy(mealsByDay, (meal) => meal.day);

        forEach(mealsGroupedByDay, (meals, day) => {
            const mealsGroupedByName = groupBy(meals, (m) => m.mealName);
            let showMealsGroupedByName = [];
            forEach(mealsGroupedByName, (me, mealName) => {
                showMealsGroupedByName.push(
                    <Grid item key={mealName}>
                        <Grid item>
                            <Typography className={classes.mealName} align="center">
                                {mealName}
                            </Typography>
                        </Grid>
                        {me.map((m) => {
                            return (
                                <Grid key={m.day + m.restaurantName + m.mealName} className={classes.restaurantsInfo}>
                                    <Card className={classes.cardSpacing}>
                                        <CardContent>
                                            <Typography className={classes.restaurantInfo}>
                                                {m.restaurantName} | <em>{m.restaurantTypeName}</em>
                                            </Typography>
                                            <Typography className={classes.restaurantInfo}>
                                                {m.parkName} — {m.landName}
                                            </Typography>
                                            <Grid container justify="flex-end">
                                                <Tooltip title="Remove from trip">
                                                    <IconButton onClick={this.deleteRestaurant(
                                                        {
                                                            tripID:       m.tripID,
                                                            mealName:     m.mealName,
                                                            day:          m.day,
                                                            restaurantID: m.restaurantID
                                                        }
                                                    )}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                );
            });

            showMealsByDay.push(
                <Grid container direction="column" key={showMealsByDay.length + 1}>
                    <Card className={classes.cardSpacing} raised>
                        <Typography align="center" className={classes.day}>
                            {moment.tz(day, 'Etc/UTC').format('MM-DD-YYYY')}
                        </Typography>
                        <CardContent>
                            {showMealsGroupedByName}
                        </CardContent>
                    </Card>
                </Grid>
            );
        });

        return showMealsByDay;
    }

    render() {
        const {classes} = this.props;
        const stopPropagation = (e) => e.stopPropagation();
        const InputWrapper    = ({children}) =>
            <div onClick={stopPropagation}>
                {children}
            </div>;
        const trips = this.state.trips.map((trip) => {
            return (
                <Grid item xs={12} md={6} key={trip.tripID}>
                    <ExpansionPanel key={trip.tripID}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography className={classes.tripName}>
                                        {trip.tripName}
                                    </Typography>
                                </Grid>
                                {/*<Grid item>*/}
                                {/*<Grid container direction="row" justify="flex-start" alignItems="flex-start">*/}
                                {/*<InputWrapper>*/}
                                {/*<Tooltip title='Edit trip'>*/}
                                {/*<IconButton>*/}
                                {/*<EditIcon/>*/}
                                {/*</IconButton>*/}
                                {/*</Tooltip>*/}
                                {/*</InputWrapper>*/}
                                {/*</Grid>*/}
                                {/*</Grid>*/}
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container direction="column" spacing={8}>
                                <Grid item>
                                    <Typography className={classes.dateStyling}>
                                        <b>Start date:</b> {moment.tz(trip.startDate, 'Etc/UTC').format('MM/DD/YYYY')}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.dateStyling}>
                                        <b>End date:</b> {moment.tz(trip.endDate, 'Etc/UTC').format('MM/DD/YYYY')}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {this.renderMealPlans(trip.mealsByDay)}
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            )
        });

        return (
            <Grid container direction="row" justify="flex-start" spacing={8}>
                {trips}
            </Grid>
        )
    }
}

MyTrips.propTypes = {
    user:    PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    trips:   PropTypes.array.isRequired
};

export default withStyles(styles)(MyTrips);
