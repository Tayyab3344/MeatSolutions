import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm'; // Adjust the import path as needed

// Replace 'YOUR_STRIPE_PUBLIC_KEY' with your actual Stripe public key
const stripePromise = loadStripe('pk_test_51O1iJEIUiAXCZO9syMOo2UBGZeTw4shjatTYNOfjdROFlbIeCzpGqAyxtGFr4AwVDXKmd91BApSvReIEL4Kzsuci00PXJktkFQ');
function PaymentPage() {
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    stripePromise.then(() => {
      setStripeLoaded(true);
    });
  }, []);

  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  return (
    <div>
      <h1>Enter Payment Amount</h1>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <Elements stripe={stripePromise}>
        {stripeLoaded ? <PaymentForm amount={amount} /> : null}
      </Elements>
    </div>
  );
}


export default PaymentPage;