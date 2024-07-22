import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonContainer,
  ErrorMsg,
  FormContainer,
  FormLabel,
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledTextArea,
} from '../styles/EditProfileFormStyles.styled';

export default function EditProfileForm({
  userDetails,
  onSave,
  closeEditForm,
}) {
  const [formData, setFormData] = useState({
    firstName: userDetails.firstName || '',
    lastName: userDetails.lastName || '',
    email: userDetails.email || '',
    bio: userDetails.bio || '',
    relationship: userDetails.relationship || '',
    birthday: userDetails.birthday ? userDetails.birthday.substring(0, 10) : '', // Formatting date for input type="date"
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'firstName' && value.trim().length < 2) {
      setError('First name must be between 2-15 characters long.');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setProfilePicture(e.target.files[0]);
    } else if (e.target.name === 'coverPhoto') {
      setCoverPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (profilePicture) {
      data.append('profilePicture', profilePicture);
    }
    if (coverPhoto) {
      data.append('coverPhoto', coverPhoto);
    }

    try {
      const response = await fetch(
        `https://odin-book-backend-production.up.railway.app/users/${userDetails._id}`,
        {
          method: 'PUT',
          credentials: 'include',
          body: data,
        }
      );

      if (!response.ok) {
        if (response.status >= 400) {
          const responseError = await response.json();
          const errorMessage =
            responseError.error ||
            responseError?.errors[0]?.msg ||
            'Undefined error occurred. Please try again later.';
          throw new Error(errorMessage);
        }
      }

      const userData = await response.json();
      const updatedUser = userData.user;

      if (typeof updatedUser.isFollowedByCurrentUser == 'undefined') {
        updatedUser.isFollowedByCurrentUser = false;
      }

      onSave(updatedUser);
    } catch (error) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <StyledForm onSubmit={handleSubmit} encType="multipart/form-data">
        <FormLabel htmlFor="firstName">First Name:</FormLabel>
        <StyledInput
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <FormLabel htmlFor="lastName">Last Name:</FormLabel>
        <StyledInput
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <FormLabel htmlFor="email">Email:</FormLabel>
        <StyledInput
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FormLabel htmlFor="bio">Bio:</FormLabel>
        <StyledTextArea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <FormLabel htmlFor="relationship">Relationship Status:</FormLabel>
        <StyledSelect
          id="relationship"
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
        >
          <option value="">Choose...</option>
          <option value="Single">Single</option>
          <option value="Complicated">Complicated</option>
          <option value="In relationship">In relationship</option>
        </StyledSelect>

        <FormLabel htmlFor="birthday">Birthday:</FormLabel>
        <StyledInput
          type="date"
          id="birthday"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />

        <FormLabel htmlFor="profilePicture">Profile Picture:</FormLabel>
        <StyledInput
          type="file"
          id="profilePicture"
          name="profilePicture"
          onChange={handleImageChange}
          accept="image/*"
        />

        <FormLabel htmlFor="coverPhoto">Cover Photo:</FormLabel>
        <StyledInput
          type="file"
          id="coverPhoto"
          name="coverPhoto"
          onChange={handleImageChange}
          accept="image/*"
        />

        <ButtonContainer>
          <Button
            type="button"
            onClick={() => {
              closeEditForm();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save Changes'}
          </Button>
        </ButtonContainer>
      </StyledForm>
    </FormContainer>
  );
}

EditProfileForm.propTypes = {
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
  onSave: PropTypes.func.isRequired,
  closeEditForm: PropTypes.func.isRequired,
};
