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
  } = useQuery( ['postsData',id], 
                () => getApi(`/posts/${id}`),  {
                // This ensures the query only runs when id is neither null nor undefined
                enabled: id !== null && id !== undefined && id!=='',
  });

  return (
    <>
     <input type="number" value={id} onChange={(e)=>{setId(e.target.value)}} />
     {
     isLoadingPosts ? ('getting data...') : (
      <>
      <p>{posts?.userId}</p>
      <p>{posts?.id}</p>
      <p>{posts?.title}</p>
      <p>{posts?.body}</p>
      </>
     )
     }
    </>
  )
}
