import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import PaginationControls from '../components/PaginationControls';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/?q=${encodeURIComponent(
            query
          )}&page=${currentPage}`
        );

        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setHasNextPage(hasNextPage);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [currentPage, hasNextPage, query]);

  return (
    <div>
      <label htmlFor="searchBar" aria-label="search bar">
        Search
      </label>
      <input
        type="text"
        id="searchBar"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search users"
      />

      <UsersList users={users} />
      <PaginationControls />
    </div>
  );
}
