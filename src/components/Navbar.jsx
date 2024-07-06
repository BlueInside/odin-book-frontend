import { NavLink } from 'react-router-dom';
import { FaUser, FaUsers, FaPlusSquare } from 'react-icons/fa';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

const Navbar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

const Link = styled(NavLink)`
  flex: 1;
  color: #666;
  text-decoration: none;
  font-size: 20px;
  border-right: 1px solid #ccc;
  text-align: center;

  &.active {
    color: #4267b2;
  }

  &:hover {
    color: #4267b2;
  }
`;

export default function NavigationBar() {
  const { user } = useAuth();

  return (
    <Navbar>
      <Link to={`/profile/${user.id}`}>
        <FaUser size={30} />
      </Link>
      <Link to="/users">
        <FaUsers size={30} />
      </Link>
      <Link to="/post">
        <FaPlusSquare size={30} />
      </Link>
    </Navbar>
  );
}
