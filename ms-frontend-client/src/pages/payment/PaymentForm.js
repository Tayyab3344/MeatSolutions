import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import "./PaymentPageStyle.css";
// import { useNavigate } from "react-router-dom";

function PaymentForm() {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [creatorName, setCreatorName] = useState("");
  const [creatorEmail, setCreatorEmail] = useState("");
  const [creatorPrice, setCreatorPrice] = useState(0);

  const location = useLocation();
  const creatorPaymentData = location.state;

  const handleAddOrder = () => {
    const order = {
      creatorName: creatorPaymentData.name, // Rename the field to productName
      email: creatorPaymentData.email,
      price: creatorPrice, // Use creatorPrice instead of productPriceFromUrl
    };

    const selectedProduct = {
      _id: Math.random().toString(),
      name: creatorName,
      price: creatorPrice,
      email: creatorEmail,
    };

    setOrders([...orders, order]);
    setSelectedProducts([...selectedProducts, selectedProduct._id]);
    setTotalPrice(totalPrice + creatorPrice); // Use creatorPrice instead of productPriceFromUrl
  };

  const handleRemoveOrder = (index, productId) => {
    const updatedOrders = [...orders];
    const removedOrder = updatedOrders.splice(index, 1)[0];
    setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    setTotalPrice(totalPrice - removedOrder.price);
    setOrders(updatedOrders);
  };

  const handleToken = async (token) => {
    try {
      console.log(`Order details: ${JSON.stringify(orders)}`);
      const response = await fetch(
        `http://localhost:3002/api/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: token.id,
            amount: totalPrice.toFixed(2) * 100, // convert to cents
            orders: JSON.stringify(orders),
          }),
        }
      );
      const data = await response.json();
      alert(data.message);
      setOrders([]);
      setSelectedProducts([]);
      setTotalPrice(0);
      localStorage.removeItem("orders");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("selectedProducts");
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="payment-page">
      <h1 className="heading" style={{ color: "black" }}>
        Please Fill Out Price Fields
      </h1>
      <div className="product-info">
        <div className="product-name">
          <label htmlFor="creatorName">Creator name:</label>
          <input
            type="text"
            id="creatorName"
            value={creatorPaymentData.name}
            onChange={() => setCreatorName(creatorPaymentData.name)}
            readOnly
          />
        </div>
        <br></br>
        <div className="product-email">
          <label htmlFor="creatorEmail">Creator Email:</label>
          <input
            type="email"
            id="creatorEmail"
            value={creatorPaymentData.email}
            onChange={() => {
              alert("xyz");
              setCreatorEmail(creatorPaymentData.email);
            }}
            readOnly
          />
        </div>
        <br></br>
        <div className="product-price">
          <label htmlFor="creatorPrice">Creator Price:</label>
          <input
            type="number"
            id="creatorPrice"
            value={creatorPrice}
            onChange={(e) => setCreatorPrice(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <button className="payment-page-button" onClick={handleAddOrder}>
        Click to Add
      </button>
      <br></br>
      <br></br>
      <br></br>
      {orders.length > 0 && (
        <div className="order-list">
          
          <div className="total-price">
            <strong>Total Price:</strong>{" "}
            <span>{`$${totalPrice.toFixed(2)}`}</span>
          </div>
          <StripeCheckout
            stripeKey="pk_test_51Muy0GHaLC1wsFOqorxn0RwhJjTHSN3c0w3PoHcbCYxBvK7QFw1IjYPdD6bR3DCItDcedt6WIlPmpiQa7Q6CWD1e00oYFh4MMi"
            token={handleToken}
            amount={totalPrice.toFixed(2) * 100} // convert to cents
            name={creatorName} // Display the creator's name
            billingAddress
            shippingAddress
          />
        </div>
      )}
    </div>
  );
}

export default PaymentForm;