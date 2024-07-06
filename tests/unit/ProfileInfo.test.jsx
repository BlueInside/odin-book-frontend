import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProfileInfo from '../../src/components/ProfileInfo';
import userEvent from '@testing-library/user-event';

describe('ProfileInfo component', () => {
  it('renders user details correctly', () => {
    const userDetails = {
      _id: 'someId',
      isFollowedByCurrentUser: false,

      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      profilePicture: 'https://example.com/profile.jpg',
      coverPhoto: 'https://example.com/cover.jpg',
      relationship: 'Single',
      bio: 'Developer at OpenAI',
      birthday: '1990-04-30',
      dateJoined: '2020-01-01',
    };

    render(<ProfileInfo userDetails={userDetails} currentUserId="userId" />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Relationship Status: Single')).toBeInTheDocument();
    expect(screen.getByText('Bio: Developer at OpenAI')).toBeInTheDocument();
    expect(screen.getByText('Birthday: 30 Apr 1990')).toBeInTheDocument();
    expect(screen.getByText('Joined: 1 Jan 2020')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'John Doe' })).toHaveAttribute(
      'src',
      'https://example.com/profile.jpg'
    );
    expect(screen.getByRole('img', { name: 'Cover' })).toHaveAttribute(
      'src',
      'https://example.com/cover.jpg'
    );
  });

  it('uses default images when images are not provided', () => {
    const userDetails = {
      _id: 'id1',
      isFollowedByCurrentUser: false,

      firstName: 'John',
      lastName: 'Doe',
      dateJoined: '2020-01-01',
    };

    render(<ProfileInfo userDetails={userDetails} currentUserId="userId" />);

    expect(screen.getByRole('img', { name: 'John Doe' })).toHaveAttribute(
      'src',
      '#'
    );
    expect(screen.getByRole('img', { name: 'Cover' })).toHaveAttribute(
      'src',
      '#'
    );
  });

  it('does not render optional fields when they are not provided', () => {
    const userDetails = {
      _id: 'id1',
      isFollowedByCurrentUser: false,

      firstName: 'John',
      lastName: 'Doe',
      dateJoined: '2020-01-01',
    };

    render(<ProfileInfo userDetails={userDetails} currentUserId="userId" />);

    expect(screen.queryByText('Email:')).not.toBeInTheDocument();
    expect(screen.queryByText('Relationship Status:')).not.toBeInTheDocument();
    expect(screen.queryByText('Bio:')).not.toBeInTheDocument();
  });

  it('returns message when userDetails is not available', () => {
    render(<ProfileInfo userDetails={null} currentUserId="userId" />);

    expect(screen.getByText(/No user details available./i)).toBeInTheDocument();
  });
});

describe('ProfileInfo follow button', () => {
  const userDetails = {
    _id: 'user123',
    isFollowedByCurrentUser: false,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    profilePicture: 'https://example.com/profile.jpg',
    coverPhoto: 'https://example.com/cover.jpg',
    relationship: 'Complicated',
    bio: 'Here is a bio',
    birthday: '1980-01-01',
    dateJoined: '2020-01-01',
  };

  it('does not show follow button when currentUserId matches userDetails _id', () => {
    render(<ProfileInfo userDetails={userDetails} currentUserId="user123" />);
    const followButton = screen.queryByText('Follow');
    expect(followButton).not.toBeInTheDocument();
  });

  it('shows follow button when currentUserId does not match userDetails _id', () => {
    render(<ProfileInfo userDetails={userDetails} currentUserId="user456" />);
    const followButton = screen.getByText('Follow');
    expect(followButton).toBeInTheDocument();
  });

  it('shows Unfollow button when isFollowedByCurrentUser is true', async () => {
    const userDetails = {
      _id: 'user123',
      isFollowedByCurrentUser: true,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      profilePicture: 'https://example.com/profile.jpg',
      coverPhoto: 'https://example.com/cover.jpg',
      relationship: 'Complicated',
      bio: 'Here is a bio',
      birthday: '1980-01-01',
      dateJoined: '2020-01-01',
    };

    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log');

    render(
      <ProfileInfo
        userDetails={{ ...userDetails, isFollowedByCurrentUser: true }}
        currentUserId="user456"
      />
    );
    const unfollowButton = screen.getByText('Unfollow');
    expect(unfollowButton).toBeInTheDocument();
    await user.click(unfollowButton);
    // Assuming you have a spy on console.log
    expect(console.log).toHaveBeenCalledWith('Unfollow user: ', 'user123');
    consoleSpy.mockRestore();
  });

  it('calls the follow function when the follow button is clicked', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const user = userEvent.setup();
    render(<ProfileInfo userDetails={userDetails} currentUserId="user456" />);
    const followButton = screen.getByText('Follow');
    await user.click(followButton);
    expect(consoleSpy).toHaveBeenCalledWith('Follow user', 'user123');
    consoleSpy.mockRestore(); // Reset spy to avoid leakage between tests
  });
});
