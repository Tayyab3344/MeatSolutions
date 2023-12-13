import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace 'your-api-endpoint' with the actual API endpoint for handling forget password requests
    const apiUrl = "http://localhost:3002/api/forget-password";

    axios
      .post(apiUrl, { email })
      .then((response) => {
        setMessage("Reset Password Link sent to your Email");

        // Hide the message after 5 seconds
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again.");
        console.error("API error:", error);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Forget Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Enter your email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
  },
  input: {
    padding: "8px",
    marginBottom: "15px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "#4caf50",
  },
};

export default ForgetPassword;
