import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import EditProfileForm from '../../src/components/EditProfileForm';
import userEvent from '@testing-library/user-event';

describe('EditProfileForm', () => {
  const mockUserDetails = {
    _id: 'user1',
    isFollowedByCurrentUser: false,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    profilePicture: 'profile.jpg',
    coverPhoto: 'cover.jpg',
    relationship: 'Single',
    bio: 'Hello, this is a bio',
    birthday: '1990-01-01',
    dateJoined: '2020-01-01',
  };

  const mockOnSave = vi.fn();
  const mockCloseForm = vi.fn();

  beforeEach(() => {
    mockOnSave.mockReset();
  });

  it('fills and submits the form with new data including file upload', async () => {
    const user = userEvent.setup();
    render(
      <EditProfileForm userDetails={mockUserDetails} onSave={mockOnSave} />
    );

    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'Jane');

    const emailInput = screen.getByLabelText('Email:');
    await user.clear(emailInput);
    await user.type(emailInput, 'jane.doe@example.com');

    // Simulate file upload for profile picture
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const profilePictureInput = screen.getByLabelText('Profile Picture:');
    await user.upload(profilePictureInput, file);

    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: 'Save Changes' });
    await user.click(submitButton);

    // Assert onSave was called correctly
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled();
    });
    expect(mockOnSave).toHaveBeenCalledWith(expect.any(FormData)); // Ensure FormData was used
  });

  it('displays the initial user data correctly', () => {
    render(
      <EditProfileForm userDetails={mockUserDetails} onSave={mockOnSave} />
    );

    expect(screen.getByLabelText('First Name:').value).toBe('John');
    expect(screen.getByLabelText('Email:').value).toBe('john.doe@example.com');
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(
      <EditProfileForm userDetails={mockUserDetails} onSave={mockOnSave} />
    );

    const firstNameInput = screen.getByLabelText('First Name:');
    await user.clear(firstNameInput);
    const submitButton = screen.getByRole('button', { name: 'Save Changes' });
    await user.click(submitButton);

    // Check for validation error messages
    expect(mockOnSave).not.toHaveBeenCalled();
    expect(
      screen.getByText('First name must be between 2-15 characters long.')
    ).toBeInTheDocument();
  });

  it('register click on close form button', async () => {
    const user = userEvent.setup();
    render(
      <EditProfileForm
        userDetails={mockUserDetails}
        onSave={mockOnSave}
        closeEditForm={mockCloseForm}
      />
    );

    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockCloseForm).toHaveBeenCalled();
  });
});
