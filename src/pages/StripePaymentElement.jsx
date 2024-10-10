import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const StripePaymentElement = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [amountInput, setAmountInput] = useState(''); // New state for amount

  const backendUrl = 'http://localhost:5000/api/stripe/create-payment-intent';

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure stripe and elements are ready
    if (elements == null || stripe == null) {
      return;
    }

    const amountInCents = parseFloat(amountInput) * 100; // Convert amount to cents

    // Check if email and amount are valid
    if (!emailInput || amountInCents <= 0) {
      setErrorMessage("Please enter a valid email and amount.");
      return;
    }

    // Call elements.submit() first
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currency: 'usd',
        email: emailInput,
        amount: amountInCents, // Send dynamic amount
        token: "user-token"
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setErrorMessage(`Error: ${errorData.error || 'Failed to create payment intent'}`);
      return;
    }

    const { client_secret: clientSecret } = await res.json();

    // Confirm the payment with Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Payment was successful
      window.location.href = '/success'; // Redirect to success page
    }
  };

  return (
    <form onSubmit={handleSubmit} className='px-4'>
      <div className='mb-3'>
        <label htmlFor="email-input">Email</label>
        <input
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          type="email"
          id="email-input"
          placeholder='johndoe@gmail.com'
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor="amount-input">Amount (USD)</label>
        <input
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
          type="number"
          id="amount-input"
          placeholder='12.00'
          required
        />
      </div>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
