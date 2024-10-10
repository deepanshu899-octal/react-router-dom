import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentElement  from './StripePaymentElement';

const PaymentForm = () => {
  const [clientSecret, setClientSecret] = useState('');
  const stripePromise = loadStripe('pk_test_51Q8HzUJru0Ak1tZZdFF0Iy7xEJnQoCmgtZXgMRZENZm6Xr4McoSA6rBftemMeRzSM69LJ4Wwr3d30ALHmtj3qy7y00RiMHvgQY');

  useEffect(() => {
    // Call your backend to create the PaymentIntent as soon as the page loads
    const fetchClientSecret = async () => {
      const response = await fetch('http://localhost:5000/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 150, currency: 'usd' }), // Adjust the amount and currency as needed
      });
      const data = await response.json();
      setClientSecret(data.client_secret);
    };

    // fetchClientSecret();
  }, []);

  // const options = {
  //   clientSecret,
  // };

  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: 1099,
  };

  return (
    <div className='flex container mt-8'>
      {true && (
        <Elements stripe={stripePromise} options={options}>
          <StripePaymentElement />
        </Elements>
      )}
    </div>
  );
};

export default PaymentForm;
