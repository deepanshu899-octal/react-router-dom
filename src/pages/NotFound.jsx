// PaginatedUsers.js
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

const fetchPaginatedUsers = async (page) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`);
  return data;
};

const NotFound = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery(['users', page], () => fetchPaginatedUsers(page), {
    keepPreviousData: true, // Keep previous page's data during page transitions
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <h2>Paginated Users</h2>
      {data.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <div>
        <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(old => old + 1)} disabled={data.length < 5}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NotFound;
