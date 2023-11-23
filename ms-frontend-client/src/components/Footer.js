import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#e8ede1",
    marginTop: 40,
    height: "42vh",
    textAlign: "center",
  },
  innerCont: {
    margin: "74px 40px 40px 40px",
  },
  resources: {
    margin: "60px 40px 10px 40px",
  },
  buttonStyleOne: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
  buttonStyleTwo: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    marginLeft: 10,
    marginTop: 8,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));

export default function Footer() {
  const { authenticated } = useSelector((state) => state.auth);
  const classes = useStyles();
  return (
    <Grid container direction="row" className={classes.container}>
      <Grid item xs={12} sm={8} className={classes.innerCont}>
        {authenticated ? (
          <Grid container direction="row">
            <Grid item xs={12} sm={6}>
              <img src="https://i.postimg.cc/90qmHDYD/Untitled-2.png" alt="MS_Logo" className="Logo" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="p">
                Meat Solutions
              </Typography>
              <Typography variant="body1" component="p">
                <br />
                - Healthy Meat <br />
                - Fresh Meat <br />
                - Fast Delivery <br />
                - Desired Products <br />
              </Typography>
            </Grid>
          </Grid>
        ) : (
            <>
            <Grid item xs={12} sm={6}>
              <img src="./Untitled-2.png" alt="MS_Logo" className="Logo" />
            </Grid>
              <Grid item xs={12} sm={4} style={{ marginLeft: 550, marginTop: -210 }}>
              <Typography variant="h4" component="p">
                Register as Seller
              </Typography>
              <Typography variant="body1" component="p"><br />
                Register as Seller and start your Business with Meat Solutions
              </Typography>
              <br />
              <Link to="/addrestaurant">
                <Button className={classes.buttonStyleOne}>Get Started</Button>
              </Link>
            </Grid>
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={2} className={classes.resources}>
        <Typography variant="h4" component="p">
          FYP Team
        </Typography>
        <Typography variant="body1" component="p" style={{ marginBottom: 28 }}>
          <br />
          - 19F-0911__Tayyab Shahid<br />
          - 19F-0928__Ali Zer <br />
          - 19F-0976__Shayan Ilyas <br />
        </Typography>
      </Grid>
    </Grid>
  );
}
