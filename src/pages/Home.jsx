import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { getApi } from "../utils/apiCaller";

const Home = () => {
  // Query for posts
  const {
    data: posts,
    error: errorPosts,
    isLoading: isLoadingPosts,
    isSuccess: isSuccessPosts, // To check if the posts query is successful
  } = useQuery("postsData", () => getApi('https://jsonplaceholder.typicode.com/posts'));

  // Query for users
  const {
    data: users,
    error: errorUsers,
    isLoading: isLoadingUsers,
  } = useQuery("usersData",
                () => getApi('https://dummyjson.com/users'),
                {
                  enabled: isSuccessPosts, // Users query only runs when the posts query is successful
                }
  );

  // Handle loading states
  if (isLoadingPosts) return <div>Loading...</div>;

  // Handle errors
  if (errorPosts) return <div>An error occurred while fetching posts: {errorPosts.message}</div>;
  if (errorUsers) return <div>An error occurred while fetching users: {errorUsers.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <ul style={{height:"100px",overflow:'auto'}}>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <h2>Users</h2>
      {
     isLoadingUsers ? "getting users" :
        <ul style={{height:"100px",overflow:'auto'}}>
        {users.users.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
      }
    </div>
  );
};

export default Home;
