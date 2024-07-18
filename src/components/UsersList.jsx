import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    <div>
      <div>
        <Link to={`/profile/${user._id}`}>
          <img
            src={
              user.profilePicture ? user.profilePicture : defaultProfileImage
            }
            alt={`${user.firstName} profile picture`}
          />
          <p>
            <span>{user.firstName}</span>{' '}
            {user.lastName && <span>{user.lastName}</span>}
          </p>
        </Link>
      </div>

      <div>
        {user.followedByUser ? (
          <button onClick={handleUnfollow}>Unfollow</button>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )}
      </div>
    </div>
  );
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};
