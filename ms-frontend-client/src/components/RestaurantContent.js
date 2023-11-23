import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import RestaurantCard from "./RestaurantCard";

const RestaurantContent = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "http://localhost:3002/restaurants";

    axios
      .get(apiUrl)
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const getRestaurantCard = (restaurantObj) => {
    return (
      <Grid item xs={12} sm={3} key={restaurantObj._id}>
        <RestaurantCard {...restaurantObj} />
      </Grid>
    );
  };

  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        color="textPrimary"
        component="p"
        noWrap
      >
        Order from your favourite Eatery -
      </Typography>
      <br />
      <Grid container spacing={2}>
        {loading ? (
          <p>Loading...</p>
        ) : restaurants.length > 0 ? (
          restaurants.map((restaurant) => getRestaurantCard(restaurant))
        ) : (
          <p>No Restaurants currently available in your area, come back Later.</p>
        )}
      </Grid>
    </>
  );
};

export default RestaurantContent;
