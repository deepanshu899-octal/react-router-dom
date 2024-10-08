import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { getApi } from '../utils/apiCaller';

export default function Profile() {
  const [id,setId] = useState(1);
  const {
    data: posts,
    error: errorPosts,
    isLoading: isLoadingPosts,
    isSuccess: isSuccessPosts, // To check if the posts query is successful
    refetch,
  } = useQuery(['postsData',id], () => getApi(`https://jsonplaceholder.typicode.com/posts/${id}`));
  console.log(posts)
  return (
    <>
     <input type="number" value={id} onChange={(e)=>{setId(e.target.value)}} />
    </>
  )
}
