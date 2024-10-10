// File: src/components/StripePaymentElement.jsx

import React, { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import './StripePaymentElement.css'; // Import the CSS file for styling

const StripePaymentElement = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [amountInput, setAmountInput] = useState('');

  const backendUrl = 'http://localhost:5000/api/stripe/create-payment-intent';

  const stripeStyles = {
    base: {
      fontSize: '16px',
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace, sans-serif',
      '::placeholder': {
        color: '#aab7c4',
      },
      padding: '10px 12px', // Custom padding for Stripe fields
    },
    invalid: {
      color: '#9e2146',
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!elements || !stripe) {
      return;
    }

    const amountInCents = parseFloat(amountInput) * 100;

    if (!emailInput || amountInCents <= 0) {
      setErrorMessage('Please enter a valid email and amount.');
      return;
    }

    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currency: 'usd',
        email: emailInput,
        amount: amountInCents,
        token: 'user-token',
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setErrorMessage(`Error: ${errorData.error || 'Failed to create payment intent'}`);
      return;
    }

    const { client_secret: clientSecret, paymentId } = await res.json();

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: { email: emailInput },
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      window.location.href = `/success?paymentId=${paymentId}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className='payment-form'>
      <div className='form-group'>
        <label htmlFor='email-input'>Email</label>
        <input
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          type='email'
          id='email-input'
          placeholder='johndoe@gmail.com'
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='amount-input'>Amount (USD)</label>
        <input
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
          type='number'
          id='amount-input'
          placeholder='12.00'
          required
        />
      </div>
      <div className='form-group'>
        <label>Card Number</label>
        <CardNumberElement className='stripe-input' options={{ style: stripeStyles }} />
      </div>
      <div className='form-group'>
        <label>Expiry Date</label>
        <CardExpiryElement className='stripe-input' options={{ style: stripeStyles }} />
      </div>
      <div className='form-group'>
        <label>CVC</label>
        <CardCvcElement className='stripe-input' options={{ style: stripeStyles }} />
      </div>
      <button type='submit' className='pay-button' disabled={!stripe || !elements}>
        Pay
      </button>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
    </form>
  );
};

export default StripePaymentElement;
