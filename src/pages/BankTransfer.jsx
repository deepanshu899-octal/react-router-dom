import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

export const BankTransfer = () => {
    const stripe = useStripe();
    const navigate = useNavigate(); // Use navigate for redirection
    const [amount, setAmount] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe) {
            return;
        }

        // Create payment intent on the backend
        const response = await fetch('http://localhost:5000/banktransfer/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 }), // Convert amount to cents
        });

        const { clientSecret } = await response.json();

        // Confirm the payment
        const result = await stripe.confirmUsBankAccountPayment(clientSecret, {
            payment_method: {
                us_bank_account: {
                    account_number: accountNumber, // Use state values for actual data
                    routing_number: routingNumber,
                    account_holder_type: 'individual', // Can be 'individual' or 'company'
                },
                billing_details: {
                    name: accountHolderName, // Use the name from state
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                // Redirect to the success page with necessary query params
                navigate(`/success?amount=${amount}&paymentId=${result.paymentIntent.id}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Amount in USD"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Routing Number"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Account Holder Name"
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
                required
            />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};
