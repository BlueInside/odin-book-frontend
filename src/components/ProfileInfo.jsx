import PropTypes from 'prop-types';
import { format } from 'date-fns';

export default function ProfileInfo({ userDetails, currentUserId }) {
  if (!userDetails) {
    return <div>No user details available.</div>;
  }

  const {
    _id,
    firstName,
    lastName,
    email,
    profilePicture,
    coverPhoto,
    relationship,
    bio,
    birthday,
    dateJoined,
    isFollowedByCurrentUser,
  } = userDetails;

  // Default images
  const defaultProfilePic = '#';
  const defaultCoverPhoto = '#';

  const handleFollow = () => {
    console.log('Follow user', _id);
  };

  const handleUnfollow = () => {
    console.log('Unfollow user: ', _id);
  };

  return (
    <div>
      <div>
        <img src={coverPhoto || defaultCoverPhoto} alt="Cover" />
      </div>

      <div>
        <img
          src={profilePicture || defaultProfilePic}
          alt={firstName + ' ' + lastName}
        />
        <h1>
          {firstName} {lastName}
        </h1>
        {email && <p>Email: {email}</p>}
        {relationship && <p>Relationship Status: {relationship}</p>}
        {bio && <p>Bio: {bio}</p>}
        {birthday && <p>Birthday: {format(new Date(birthday), 'd MMM yyy')}</p>}
        <p>Joined: {format(new Date(dateJoined), 'd MMM yyy')}</p>
        {/* Show follow button only if current user is not the profile owner */}
        {currentUserId &&
          userDetails._id !== currentUserId &&
          (isFollowedByCurrentUser ? (
            <button onClick={handleUnfollow}>Unfollow</button>
          ) : (
            <button onClick={handleFollow}>Follow</button>
          ))}
      </div>
    </div>
  );
}

ProfileInfo.propTypes = {
  userDetails: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    isFollowedByCurrentUser: PropTypes.bool.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    email: PropTypes.string,
    profilePicture: PropTypes.string,
    coverPhoto: PropTypes.string,
    relationship: PropTypes.string,
    bio: PropTypes.string,
    birthday: PropTypes.string,
    dateJoined: PropTypes.string.isRequired,
  }).isRequired,
  currentUserId: PropTypes.string.isRequired,
};
