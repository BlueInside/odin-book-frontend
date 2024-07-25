import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import PaginationControls from '../components/PaginationControls';
import { MdSearch } from 'react-icons/md';
import {
  SearchBarContainer,
  Label,
  SearchInput,
  StyledContainer,
  SearchButton,
} from '../styles/UsersPageStyles.styled';
import { authFetch } from '../utilities/authFetch';
import { useNavigate } from 'react-router-dom';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async (page = currentPage) => {
      try {
        const response = await authFetch(
          `http://localhost:3000/users/?q=${encodeURIComponent(
            query
          )}&page=${page}`,
          { credentials: 'include' }
        );
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setHasNextPage(data.hasNextPage);
      } catch (error) {
        if (error.message === `AUTH_REQUIRED`) {
          navigate('/error', {
            state: {
              errorCode: 401,
              message: `Authentication required`,
              suggestion:
                'Please try to log in or create new user to continue.',
            },
          });
        }
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [currentPage, query, navigate]);

  return (
    <StyledContainer>
      <SearchBarContainer>
        <form
          style={{ display: 'flex' }}
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(searchInput);
            setCurrentPage(1);
          }}
        >
          <Label htmlFor="searchBar" aria-label="search bar">
            Search
          </Label>
          <SearchInput
            type="text"
            id="searchBar"
            value={searchInput}
            onChange={(e) => {
              {
                setSearchInput(e.target.value);
              }
            }}
            placeholder="Search users"
          />
          <SearchButton type="submit">
            <MdSearch size="20px" />
            Search
          </SearchButton>
        </form>
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
