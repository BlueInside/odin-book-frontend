import { useState } from 'react';
import PropTypes from 'prop-types';

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
    if (error) return;
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
        `http://localhost:3000/users/${userDetails._id}`,
        {
          method: 'PUT',
          credentials: 'include',
          body: data,
        }
      );

      if (!response.ok) {
        console.log('Update response not ok: ', response);
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

      console.log('Successfully updated user: ', updatedUser);
      onSave(updatedUser);
    } catch (error) {
      console.log('Update user Error', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Bio:
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </label>
        <label>
          Relationship Status:
          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="Single">Single</option>
            <option value="Complicated">Complicated</option>
            <option value="In relationship">In relationship</option>
          </select>
        </label>
        <label>
          Birthday:
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </label>
        <label>
          Profile Picture:
          <input
            type="file"
            name="profilePicture"
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>
        <label>
          Cover Photo:
          <input
            type="file"
            name="coverPhoto"
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>
        <button type="button" onClick={closeEditForm}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save Changes'}
        </button>
      </form>
    </div>
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
