import React from 'react'
import { getApi } from '../utils/apiCaller';
import { useQuery } from 'react-query';

export default function DashBoard() {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery("postsData", ()=>getApi('https://jsonplaceholder.typicode.com/posts'));
  return (
    <>
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
