import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

const Contact = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id,setId] = useState(1);

  const mutation = useMutation((updatedPost) =>
    axios.put(`/posts/${id}`, updatedPost),
  );

  const submitData = () => {
    mutation.mutate({ title, body });
  };

  if (mutation.isLoading) {
    return <span>Updating...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post updated!</span>;
  }

  return (
    <>
    <input type="number" value={id} onChange={(e)=> setId(e.target.value)} placeholder="id"/>
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
      <button onClick={submitData}>Update</button>
    </div>
  </>
  );
};

export default Contact;