import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import PaginationControls from '../components/PaginationControls';
import {
  SearchBarContainer,
  Label,
  SearchInput,
  StyledContainer,
} from '../styles/UsersPageStyles.styled';
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
          )}&page=${currentPage}`,
          { credentials: 'include' }
        );
        const data = await response.json();
        console.log('Users DATA, ', data);
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setHasNextPage(data.hasNextPage);
        console.log(hasNextPage);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [currentPage, hasNextPage, query]);

  return (
    <StyledContainer>
      <SearchBarContainer>
        <Label htmlFor="searchBar" aria-label="search bar">
          Search
        </Label>
        <SearchInput
          type="text"
          id="searchBar"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search users"
        />
      </SearchBarContainer>

      <UsersList users={users} />
      <PaginationControls
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        setHasNextPage={setHasNextPage}
      />
    </StyledContainer>
  );
}
