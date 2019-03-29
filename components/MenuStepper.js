

// /////// UPDATED VERSION ////////////


// Changes:

// Instead of using the column/row positioning I just used the MaterialUI grid positioning going off of this example: 

// https://material-ui.com/layout/grid/#grid-with-breakpoints

// Using a grid, each row can take up a max grid width of 12. So, when the view is in mobile (xs) each grid (image card) takes up the full width 12. In desktop mode
// which is denoted as "md" and up I've set it to a value of 6 - meaning half the row (which renders two cards per row). I can try to explain this better later on 
// cause its a little confusing.

// Also, I removed the marginTop: 30% on each card image. Instead, I spaced them out by setting a spacing property on the outermost Grid component. It's set to 24, 
// but you can change that as you need. And I increased the width of parkImage from 40% to 80%. Again, not necessary, but it looked weird at 40%. 



import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ItemCard from '../components/ItemCard';
import RestaurantPanel from '../components/RestaurantPanel';

import axios from 'axios';

const styles = theme => ({
  root: {
    width: "80%",
    height: "auto"
    // flexGrow: 1,
  },
  header: {
    fontSize: 25,
    fontFamily: "Avenir",
    fontWeight: 400,
    textAlign: 'center',
    marginTop: '2%',
  },
  grid: {
    position: "relative",
    marginLeft: "3.5%",
    // marginRight: "3.5%",
    marginTop: "3%",
    marginBottom: "3%",
  },
  parkImage: {
    width: "80%",     // CHANGED FROM 40% TO 80%
    height: 300,
    backgroundSize: "cover",
    [theme.breakpoints.between('xs','sm')]: {
      height: 210,
    },
  },
  textCard: {
    width: "max-content",
    height: "auto",
    // backgroundColor: 'rgb(69,69,69)',
    backgroundColor: "white",
    borderRadius: 16,
    margin: "auto",
    position: "relative",
    marginTop: "33%"
  },
  parkName: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: 400,
    color: "black",
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5
  },
  restaurantName: {
    fontSize: 'larger'
  },
});

class MenuStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "PARKS",
      restaurants:[],
      lands: [],
    };
  }

  // Fetch restaurant names
  async componentDidMount() {
    try {
      const result = await axios.get('/restaurant/getAllRestaurantsInfo');
      this.setState({
        restaurants: result.data
      })
    } catch (e) {
      console.log('Error', e);
    }
  }

  handleContentChange = prop => event => {
    this.setState({tab: prop});
  };

  renderDividerContent() {
    switch (this.state.tab) {
      case "PARKS":
        return this.renderParks();
      case "LANDS":
        return this.renderLands();
      case "RESTAURANTS":
        return this.renderRestaurants();
      default:
        return this.renderParks();
    }
  }

  renderParks() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.header}>
          Select a park
        </Typography>
        <Divider variant="middle" />
        <Grid container spacing={24} className={classes.grid}>
          <Grid item xs={12} md={6}>
            <Card
              className={classes.parkImage} onClick={this.handleContentChange("LANDS")}
              style={{
                backgroundImage:
                  "url('../static/images/ParkImages/MagicKingdom.jpg')"
              }}
            >
              <Card className={classes.textCard} elevation={0}>
                <Typography className={classes.parkName}>
                  Magic Kingdom
                </Typography>
              </Card>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className={classes.parkImage}
              style={{
                backgroundImage:
                  "url('../static/images/ParkImages/MGMStudios.jpg')"
              }}
            >
              <Card className={classes.textCard} elevation={0}>
                <Typography className={classes.parkName}>
                  Hollywood Studios
                </Typography>
              </Card>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className={classes.parkImage}
              style={{
                backgroundImage: "url('../static/images/ParkImages/Epcot.jpg')"
              }}
            >
              <Card className={classes.textCard} elevation={0}>
                <Typography className={classes.parkName}>Epcot</Typography>
              </Card>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className={classes.parkImage}
              style={{
                backgroundImage:
                  "url('../static/images/ParkImages/AnimalKingdom.jpg')"
              }}
            >
              <Card className={classes.textCard} elevation={0}>
                <Typography className={classes.parkName}>
                  Animal Kingdom
                </Typography>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
  
  renderLands() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Button onClick={this.handleContentChange("PARKS")}>
            <KeyboardArrowLeft />
            Back to parks
          </Button>
        </div>
        <Divider variant="middle" />
        <List>
          <ListItem button onClick={this.handleContentChange("RESTAURANTS")}>
            <ListItemText primary="Land1" />
          </ListItem>
        </List>
      </div>
    )
  }

  renderRestaurants() {
    const { classes } = this.props;
    const restaurantsInfo = this.state.restaurants.map((restaurant, index) =>
      {
        return (
          <div>
            <div>
              <Button variant="text" onClick={this.handleContentChange("LANDS")}>
                <KeyboardArrowLeft />
                Back to lands
              </Button>
            </div>
            <Divider variant="middle" />
            <div>
              <RestaurantPanel key={restaurant.restaurantID}
                              restaurantID={restaurant.restaurantID}
                              restaurantName={restaurant.restaurantName}
                              restaurantLand={restaurant.landName} />
            </div>
          </div>
        )
      }
    )
    return (
      <div>
        {restaurantsInfo}
      </div>
    )
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <Card>
          {this.renderDividerContent()}
        </Card>
      </div>
    );
  }
}

MenuStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MenuStepper);

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// const styles = theme => ({
//   root: {
//     width: '80%',
//     height: 'auto',
//     // flexGrow: 1,
//   },
//   header: {
//     fontSize: 18,
//     fontFamily: 'Avenir',
//     fontWeight: 400,
//     marginRight: '5%',
//   },
//   grid: {
//     position: 'relative',
//     marginLeft: '5%',
//     marginRight: '5%',
//     marginTop: '5%',
//     marginBottom: '5%',
//     width: 'auto',
//   },
//   parkImage: {
//     width: '40%',
//     height: 300,
//     backgroundSize: 'cover',
//   },
//   parkImageHover: {
//     opacity: 0.4,
//   },
//   textCard: {
//     width: 'max-content',
//     height: 'auto',
//     // backgroundColor: 'rgb(69,69,69)',
//     backgroundColor: 'white',
//     borderRadius: 16,
//     margin: 'auto',
//     position: 'relative',
//     marginTop: '33%',
//   },
//   parkName: {
//     fontSize: 18,
//     fontFamily: 'Roboto',
//     fontWeight: 400,
//     color: 'black',
//     textAlign: 'center',
//     position: 'relative',
//     marginLeft: 10,
//     marginRight: 10,
//     marginTop: 5,
//     marginBottom: 5,
//   }
// });

// class MenuStepper extends React.Component {
//   renderParks() {
//     const {classes} = this.props;
//     return (
//       <div>
//         <Typography className={classes.header}>
//           Select a park
//         </Typography>
//         <Divider variant="middle"/>
//         <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.grid}>
//           {/* <div> */}
//           <Grid container direction="row" justify="center" alignItems="flex-start">
//             <Card className={classes.parkImage}
//             style={{
//               backgroundImage: "url('../static/images/ParkImages/MagicKingdom.jpg')",
//             }}>
//               <Card className={classes.textCard} elevation={0}>
//                 <Typography className={classes.parkName}>
//                   Magic Kingdom
//                 </Typography>
//               </Card>
//             </Card>
//             <Card className={classes.parkImage}
//             style={{
//               backgroundImage: "url('../static/images/ParkImages/MGMStudios.jpg')",
//               marginLeft: '3%',
//             }}>
//               <Card className={classes.textCard} elevation={0}>
//                 <Typography className={classes.parkName}>
//                   Hollywood Studios
//                 </Typography>
//               </Card>
//             </Card>
//           </Grid>
//           {/* </div> */}

//           {/* <div> */}
//           <Grid container direction="row" justify="center" alignItems="flex-start" style={{ marginTop: '3%',}}>
//             <Card className={classes.parkImage}
//             style={{
//               backgroundImage: "url('../static/images/ParkImages/Epcot.jpg')",
//             }}>
//               <Card className={classes.textCard} elevation={0}>
//                 <Typography className={classes.parkName}>
//                   Epcot
//                 </Typography>
//               </Card>
//             </Card>
//             <Card className={classes.parkImage}
//             style={{
//               backgroundImage: "url('../static/images/ParkImages/AnimalKingdom.jpg')",
//               marginLeft: '3%',
//             }}>
//               <Card className={classes.textCard} elevation={0}>
//                 <Typography className={classes.parkName}>
//                   Animal Kingdom
//                 </Typography>
//               </Card>
//             </Card>
//           </Grid>
//           {/* </div> */}
//         </Grid>
//       </div>
//     )
//   }

//   render() {
//     const { classes, theme } = this.props;

//     return (
//       <div className={classes.root}>
//         <Card>
//           <Typography>
//             hello
//           </Typography>
//           {this.renderParks()}
//         </Card>
//       </div>
//     );
//   }
// }

// MenuStepper.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

// export default withStyles(styles, { withTheme: true })(MenuStepper);