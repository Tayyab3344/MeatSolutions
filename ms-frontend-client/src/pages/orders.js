import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import openSocket from "socket.io-client";

import { getOrders, socketStatusUpdate } from "../redux/actions/dataActions";
import OrderCard from "../components/OrderCard";

// material-ui


const Orders = (props) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.data);
  const auth = useSelector((state) => state.auth);
  const _id = auth?.account?._id;
  const role = auth?.account?.role;
  const classes = useStyles();

  useEffect(() => {
    dispatch(getOrders());
    const socket = openSocket(process.env.REACT_APP_SERVER_URL);
    socket.emit("add-user", { userId: _id });
    socket.on("orders", (data) => {
      if (data.action === "update") {
        dispatch(socketStatusUpdate(data.order));
      }
      if (data.action === "create") {
        dispatch(getOrders());
        dispatch(getOrders());
      }
    });
  }, [_id, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        Order History
      </Typography>
      <Grid item container direction="row">
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={10}>
          <Grid container spacing={2}>
            {orders ? (
              orders.length > 0 ? (
                orders.map((order) => (
                  <Grid item xs={12} sm={4} key={order._id}>
                    <OrderCard order={order} role={role} />
                  </Grid>
                ))
              ) : (
                <p className={classes.para}>No Orders present.</p>
              )
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={1} />
      </Grid>
    </>
  );
};

export default Orders;
