import React from 'react'
import { useQuery } from 'react-query'
import { getApi } from '../utils/apiCaller'
import { useLocation } from 'react-router-dom';
import axios from 'axios';


export default function Success() {
    const location = useLocation();

    // Create a URLSearchParams object to parse the query string
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId'); // Get the paymentId

    const {data , isError, isLoading} = useQuery('getSuccessData',async()=>await axios.get(`http://localhost:5000/api/stripe/check-payment-status/${paymentId}`))

    if(isLoading){
      return "Loading......"
    }
    console.log(data?.data,'data///////..........')
    let paymentData = data?.data.paymentIntent;
    
  return (
    <div>
      <p>payment staus: {data?.data?.status}</p>
      <p>payment - {paymentData.amount} done</p>
    </div>
  )
}
