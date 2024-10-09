import React, { useState } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import { getApi, postApi } from "../utils/apiCaller";

const About = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const {
    data: posts,
    error: errorPosts,
    isLoading: isLoadingPosts,
    isSuccess: isSuccessPosts,
    refetch,
  } = useQuery("postsData", () => getApi('/posts'));

  const mutation = useMutation((newPost) =>
   postApi('/posts',newPost), 
   {
     _onSuccess: () => {
       // Invalidate and refetch users query after adding a user
       refetch();
      console.log('api post sucesful')
     },
     get onSuccess() {
       return this._onSuccess;
     },
     set onSuccess(value) {
       this._onSuccess = value;
     },
   }
  );

  const submitData = () => {
    mutation.mutate({ title, body });
  };

  if (mutation.isLoading) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post submitted!</span>;
  }

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button onClick={submitData}>Submit</button>
    </div>
  );
};
export default About;