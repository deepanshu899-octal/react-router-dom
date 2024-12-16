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
    isSuccess: isSuccessPosts,
    refetch,
    isIdle: isIdlePosts
  } = useQuery(
    "postsData",
    () => getApi('/posts'),
    {
      // Polling interval in milliseconds (e.g., 5000ms = 5 seconds)
      // refetchInterval: 500,
      staleTime: 100000, // 100 seconds
      // refetchOnWindowFocus: false, // default: true
    }
  );
  // Query for users
  const {
    data: users,
    error: errorUsers,
    isLoading: isLoadingUsers,
    isSuccess: isSucessUsers,
  } = useQuery("usersData",
                () => getApi('/users'),
                {
                  enabled: isSuccessPosts, // Users query only runs when the posts query is successful
                  // staleTime: 100000,
                  staleTime: 0, // Data is immediately stale after fetching
                  // cacheTime: 0, // No caching, data is removed immediately
                  // refetchOnWindowFocus: false, // default: true
                }
  );
  console.log('isLoadingPosts--------------',isLoadingPosts)
  // console.log('isLoadingUsers--------------',isLoadingUsers)

  function openMap(lat, lng) {
    const url = `https://www.google.com/maps/place/${lat},${lng}`;
  
    // Calculate half of the screen's width and height
    const width = window.screen.width / 2;
    const height = window.screen.height / 2;
  
    // Position the window at the center
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
  
    // Open the new window with the calculated size and position
    window.open(url, "_blank", `width=${width},height=${height},top=${top},left=${left}`);
  }
  // Handle loading states
  if (isLoadingPosts) return <div>Loading...</div>;

  // Handle errors
  if (errorPosts) return <div>An error occurred while fetching posts: {errorPosts.message}</div>;
  if (errorUsers) return <div>An error occurred while fetching users: {errorUsers.message}</div>;

  if(isSucessUsers){
    // console.log(users[0].name8)
  }
  return (
    <div>
      <p style={{color:"red"}} onClick={()=>{
          openMap(10.691803,-61.222503)
      }}>{"Two get apis are getting called here (posts and users). users api is dependent on posts api so we used enabled: isSuccessPosts in posts query. The user api is called after th data came from posts get api"}</p>
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
        {users.map((user) => (
          <li key={user?.id}>{user?.name} - email : {user?.email}</li>
        ))}
      </ul>
      }
      {
       isSucessUsers && users[0].name1fsdf && 'hello'
      }
    </div>
  );
};

export default Home;
