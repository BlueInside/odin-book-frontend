import PropTypes from 'prop-types';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import {
  UserContainer,
  Avatar,
  UserName,
  ActionButton,
  StyledLink,
} from '../styles/UsersListStyles.styled';
export default function UsersList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
}

function User({ user }) {
  const defaultProfileImage =
    'https://res.cloudinary.com/dhjzutfu9/image/upload/v1719395403/odin-project/avatar_owpfg7.webp';

  const handleFollow = async () => {};

  const handleUnfollow = async () => {};

  return (
    <UserContainer>
      <StyledLink to={`/profile/${user._id}`}>
        <Avatar
          src={user.profilePicture || defaultProfileImage}
          alt={`${user.firstName} profile picture`}
        />
        <UserName>
          {user.firstName} {user.lastName}
        </UserName>
      </StyledLink>
      <ActionButton
        onClick={user.followedByUser ? handleUnfollow : handleFollow}
      >
        {user.followedByUser ? <FaUserCheck /> : <FaUserPlus />}
        {user.followedByUser ? 'Unfollow' : 'Follow'}
      </ActionButton>
    </UserContainer>
  );
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};
