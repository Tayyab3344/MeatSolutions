import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material-UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import useForm from "../hooks/forms";
import { signupUser } from "../redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  title: {
    margin: "48px 0px 10px 0px",
  },
}));

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, serverError, errors } = useSelector((state) => state.UI);

  const { inputs, handleInputChange, handleSubmit } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateName = (name) => {
    const namePattern = /^[A-Za-z]+$/;
    return namePattern.test(name);
  };

  const validateForm = () => {
    const errors = {};
    if (!validateName(inputs.firstName)) {
      errors.firstName = "First Name should only contain alphabetic characters";
    }
    if (!validateName(inputs.lastName)) {
      errors.lastName = "Last Name should only contain alphabetic characters";
    }
    if (!validateEmail(inputs.email)) {
      errors.email = "Invalid email address";
    }
    if (!validatePassword(inputs.password)) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (inputs.password !== inputs.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Form is valid if no errors
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // The form is valid, proceed with signup
      const newUserData = {
        email: inputs.email,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        role: "ROLE_USER",
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
      };
      dispatch(signupUser(newUserData, history));
    }
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h4" className={classes.title}>
          Meat Solution Registration
        </Typography>
        <form noValidate onSubmit={handleSubmitForm}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            onChange={handleInputChange}
            value={inputs.firstName}
            className={classes.textField}
            helperText={validationErrors.firstName || ""}
            error={Boolean(validationErrors.firstName)}
            fullWidth
            required
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            onChange={handleInputChange}
            value={inputs.lastName}
            className={classes.textField}
            helperText={validationErrors.lastName || ""}
            error={Boolean(validationErrors.lastName)}
            fullWidth
            required
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            onChange={handleInputChange}
            value={inputs.email}
            className={classes.textField}
            fullWidth
            helperText={validationErrors.email || ""}
            error={Boolean(validationErrors.email)}
            required
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            onChange={handleInputChange}
            value={inputs.password}
            className={classes.textField}
            helperText={validationErrors.password || ""}
            error={Boolean(validationErrors.password)}
            fullWidth
            required
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            onChange={handleInputChange}
            value={inputs.confirmPassword}
            className={classes.textField}
            helperText={validationErrors.confirmPassword || ""}
            error={Boolean(validationErrors.confirmPassword)}
            fullWidth
            required
          />

          {serverError && (
            <Typography variant="body2" className={classes.customError}>
              {serverError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Sign Up
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small className={classes.small}>
            Already have an account? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}
