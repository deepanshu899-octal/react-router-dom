import React from 'react'
import { getApi } from '../utils/apiCaller';
import { useQuery } from 'react-query';

export default function DashBoard() {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery("postsData", ()=>getApi('/posts'), {
    staleTime: Infinity, // Keep using cached data indefinitely
    refetchOnWindowFocus: false, // default: true
  });
  return (
    <>
    <p style={{color:"red"}}>This page doesnt make posts get api call if you come from home page, it will only make posts get api request if refresh the page </p>
    <div>DashBoard</div>
    {
      !isLoading && 
      posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))
    }
    </>
  )
}
