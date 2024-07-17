import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { FiEdit } from 'react-icons/fi';
import {
  Container,
  Cover,
  ProfileDetails,
  ProfilePic,
  StyledButton,
  Title,
  Text,
  HighlightText,
  SuccessMessage,
  EditButton,
} from '../styles/ProfileInfoStyles.styled';
import { useEffect, useState } from 'react';
import EditProfileForm from './EditProfileForm';
export default function ProfileInfo({
  userDetails,
  currentUserId,
  setUserDetails,
}) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Default images
  const defaultProfilePic =
    'https://res.cloudinary.com/dhjzutfu9/image/upload/v1719395403/odin-project/avatar_owpfg7.webp';
  const defaultCoverPhoto =
    'https://res.cloudinary.com/dhjzutfu9/image/upload/v1720300583/odin-project/default-bgImage_xcqvih.webp';

  const handleFollow = () => {
    console.log('Follow user', _id);
  };

  const handleUnfollow = () => {
    console.log('Unfollow user: ', _id);
  };

  const onSave = (updatedUserDetails) => {
    setUserDetails(updatedUserDetails);
    setSuccessMessage('User details updated!');
    setIsEditing(false);
  };

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

  if (isEditing)
    return (
      <EditProfileForm
        userDetails={userDetails}
        onSave={onSave}
        closeEditForm={() => {
          setIsEditing(false);
        }}
      />
    );

  return (
    <Container>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <Cover>
        <img src={coverPhoto || defaultCoverPhoto} alt="Cover" />
      </Cover>
      <ProfileDetails>
        <ProfilePic
          src={profilePicture || defaultProfilePic}
          alt={`${firstName} ${lastName}`}
        />
        <Title>
          {firstName} {lastName}
        </Title>
        {email && <Text>Email: {email}</Text>}
        {relationship && (
          <HighlightText>Relationship Status: {relationship}</HighlightText>
        )}
        {bio && <Text>Bio: {bio}</Text>}
        {birthday && (
          <Text>Birthday: {format(new Date(birthday), 'd MMM yyy')}</Text>
        )}
        <Text>Joined: {format(new Date(dateJoined), 'd MMM yyy')}</Text>
        {currentUserId &&
          userDetails._id !== currentUserId &&
          (isFollowedByCurrentUser ? (
            <StyledButton onClick={handleUnfollow}>Unfollow</StyledButton>
          ) : (
            <StyledButton onClick={handleFollow}>Follow</StyledButton>
          ))}
        {_id === currentUserId && (
          <EditButton
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <FiEdit /> Edit
          </EditButton>
        )}
      </ProfileDetails>
    </Container>
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
  setUserDetails: PropTypes.func.isRequired,
};
