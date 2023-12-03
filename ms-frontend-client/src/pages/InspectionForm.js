import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MyForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    availableTime: "",
    description: "",
    selectedDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your API endpoint here /api/form-submit
    const apiUrl = "http://localhost:3002/api/form-submit"; // Replace with your actual API endpoint

    // Make the Axios API call
    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("API response:", response.data);
        // Handle success or perform additional actions
        alert("Officer Booked Successfully");
        history.goBack();
      })
      .catch((error) => {
        console.error("API error:", error);
        // Handle error or show a user-friendly message
        alert("Error in Submission");
      });
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={formStyle}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        

        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyForm;
