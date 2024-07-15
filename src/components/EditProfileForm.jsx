import { useState } from 'react';
import PropTypes from 'prop-types';

export default function EditProfileForm({ userDetails, onSave }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setProfilePicture(e.target.files[0]);
    } else if (e.target.name === 'coverPhoto') {
      setCoverPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (profilePicture) {
      data.append('profilePicture', profilePicture);
    }
    if (coverPhoto) {
      data.append('coverPhoto', coverPhoto);
    }

    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
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
      <button type="submit">Save Changes</button>
    </form>
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
};
