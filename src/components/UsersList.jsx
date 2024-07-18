import PropTypes from 'prop-types';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { followUser, unfollowUser } from '../utilities/followUtils';
import {
  UserContainer,
  Avatar,
  UserName,
  ActionButton,
  StyledLink,
} from '../styles/UsersListStyles.styled';
import { useState } from 'react';
export default function UsersList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <User key={user._id} userData={user} />
      ))}
    </div>
  );
}

function User({ userData }) {
  const [user, setUser] = useState(userData);

  const defaultProfileImage =
    'https://res.cloudinary.com/dhjzutfu9/image/upload/v1719395403/odin-project/avatar_owpfg7.webp';

  const handleFollow = async () => {
    const result = await followUser(user._id);

    if (result) {
      setUser({ ...user, followedByUser: true });
    }
  };

  const handleUnfollow = async () => {
    const result = await unfollowUser(user._id);

    if (result) {
      setUser({ ...user, followedByUser: false });
    }
  };

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
  userData: PropTypes.object.isRequired,
};
