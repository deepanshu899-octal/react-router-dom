import React, { useEffect } from 'react';

const PayPalPage = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.paypal.com/sdk/js?client-id=AXxWPKqsl8E9c24UfEoVNQGZQ9BuBSqk8Dwi0kwmMtdULaDXcKd7CWUy5SVhj6VHqJOwHUXTD1q4bpyj'; // Replace with your client ID
        script.async = true;
        script.onload = () => {
            window.paypal.Buttons({
                createOrder: async (data, actions) => {
                    const response = await fetch('http://localhost:5000/api/paypal/create-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ amount: '10.00' }) // Replace with dynamic amount as needed
                    });
                    const orderData = await response.json();
                    return orderData.id; // Return the order ID
                },
                onApprove: async (data, actions) => {
                    await actions.order.capture().then(async (details) => {
                        alert('Transaction completed by ' + details.payer.name.given_name);
                        console.log(details);
                    });
                },
                onError: (err) => {
                    console.error('PayPal Checkout onError', err);
                },
            }).render('#paypal-button-container'); // Renders the PayPal button
        };
        document.body.appendChild(script);
    }, []);

    return <div id="paypal-button-container"></div>;
};

export default PayPalPage;
