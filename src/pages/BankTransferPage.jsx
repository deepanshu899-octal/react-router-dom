import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BankTransfer } from './BankTransfer';

const stripePromise = loadStripe('pk_test_51Q8HzUJru0Ak1tZZdFF0Iy7xEJnQoCmgtZXgMRZENZm6Xr4McoSA6rBftemMeRzSM69LJ4Wwr3d30ALHmtj3qy7y00RiMHvgQY'); // Replace with your publishable key

export default function BankTransferPage() {
  return (
    <Elements stripe={stripePromise}>
        <BankTransfer/>
    </Elements>
  )
}
