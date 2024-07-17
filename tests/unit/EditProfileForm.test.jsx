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

  globalThis.fetch = vi.fn();

  const mockOnSave = vi.fn();
  const mockCloseForm = vi.fn();

  beforeEach(() => {
    mockOnSave.mockReset();
    fetch.mockClear();
  });

  it('fills and submits the form with new data including file upload', async () => {
    const user = userEvent.setup();
    fetch.mockReturnValueOnce({
      ok: true,
      json: () => ({ user: mockUserDetails }),
    });
    render(
      <EditProfileForm
        closeEditForm={mockCloseForm}
        userDetails={mockUserDetails}
        onSave={mockOnSave}
      />
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
    expect(mockOnSave).toHaveBeenCalledWith(mockUserDetails);
    expect(mockUserDetails).toHaveProperty('isFollowedByCurrentUser');
  });

  it('displays the initial user data correctly', () => {
    render(
      <EditProfileForm
        closeEditForm={mockCloseForm}
        userDetails={mockUserDetails}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByLabelText('First Name:').value).toBe('John');
    expect(screen.getByLabelText('Email:').value).toBe('john.doe@example.com');
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(
      <EditProfileForm
        closeEditForm={mockCloseForm}
        userDetails={mockUserDetails}
        onSave={mockOnSave}
      />
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
        closeEditForm={mockCloseForm}
        userDetails={mockUserDetails}
        onSave={mockOnSave}
      />
    );

    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockCloseForm).toHaveBeenCalled();
  });

  it('handles server errors during form submission', async () => {
    const user = userEvent.setup();
    render(
      <EditProfileForm
        userDetails={mockUserDetails}
        onSave={mockOnSave}
        closeEditForm={mockCloseForm}
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Save Changes' });

    // Mock fetch to simulate a server error
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Internal server error' }),
      status: 500,
    });

    await user.click(submitButton);

    await waitFor(() => {
      // Check that the error message from the server is displayed
      expect(screen.getByText('Internal server error')).toBeInTheDocument();
    });
  });

  it('updates form fields when userDetails prop changes', async () => {
    const initialUserDetails = {
      ...mockUserDetails,
      firstName: 'John',
      lastName: 'Doe',
    };

    const newUserDetails = {
      ...mockUserDetails,
      firstName: 'Jane',
      lastName: 'Smith',
    };

    const { rerender } = render(
      <EditProfileForm
        userDetails={initialUserDetails}
        onSave={mockOnSave}
        closeEditForm={mockCloseForm}
      />
    );

    expect(screen.getByLabelText('First Name:').value).toBe('John');
    expect(screen.getByLabelText('Last Name:').value).toBe('Doe');

    // Rerender with new props
    rerender(
      <EditProfileForm
        userDetails={newUserDetails}
        onSave={mockOnSave}
        closeEditForm={mockCloseForm}
      />
    );

    expect(screen.getByLabelText('First Name:').value).toBe('Jane');
    expect(screen.getByLabelText('Last Name:').value).toBe('Smith');
  });
});
