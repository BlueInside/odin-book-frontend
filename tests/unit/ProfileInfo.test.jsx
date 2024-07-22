import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProfileInfo from '../../src/components/ProfileInfo';
import userEvent from '@testing-library/user-event';

const mockSetUserDetails = vi.fn();

vi.mock('../../src/components/EditProfileForm', () => ({
  default: () => <div>Edit form</div>,
}));

vi.mock('../../src/components/PostList', () => ({
  default: () => <div>Post list</div>,
}));

globalThis.fetch = vi.fn();

describe('ProfileInfo component', () => {
  it('renders user details correctly', () => {
    const userDetails = {
      _id: 'userId',
      isFollowedByCurrentUser: false,

      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      profilePicture: 'https://example.com/profile.jpg',
      coverPhoto: 'https://example.com/cover.jpg',
      relationship: 'Single',
      bio: 'Developer at somewhere',
      birthday: '1990-04-30',
      dateJoined: '2020-01-01',
    };

    render(
      <ProfileInfo
        userDetails={userDetails}
        setUserDetails={mockSetUserDetails}
        currentUserId="userId"
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Relationship Status: Single')).toBeInTheDocument();
    expect(screen.getByText('Bio: Developer at somewhere')).toBeInTheDocument();
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

    render(
      <ProfileInfo
        userDetails={userDetails}
        setUserDetails={mockSetUserDetails}
        currentUserId="userId"
      />
    );

    expect(screen.getByRole('img', { name: 'John Doe' })).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/dhjzutfu9/image/upload/v1719395403/odin-project/avatar_owpfg7.webp'
    );
    expect(screen.getByRole('img', { name: 'Cover' })).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/dhjzutfu9/image/upload/v1720300583/odin-project/default-bgImage_xcqvih.webp'
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

    render(
      <ProfileInfo
        userDetails={userDetails}
        setUserDetails={mockSetUserDetails}
        currentUserId="userId"
      />
    );

    expect(screen.queryByText('Email:')).not.toBeInTheDocument();
    expect(screen.queryByText('Relationship Status:')).not.toBeInTheDocument();
    expect(screen.queryByText('Bio:')).not.toBeInTheDocument();
  });

  it('returns message when userDetails is not available', () => {
    render(
      <ProfileInfo
        userDetails={null}
        setUserDetails={mockSetUserDetails}
        currentUserId="userId"
      />
    );

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
    render(
      <ProfileInfo
        userDetails={userDetails}
        setUserDetails={mockSetUserDetails}
        currentUserId="user123"
      />
    );
    const followButton = screen.queryByText('Follow');
    expect(followButton).not.toBeInTheDocument();
  });

  it('shows follow button when currentUserId does not match userDetails _id', () => {
    render(
      <ProfileInfo
        userDetails={userDetails}
        setUserDetails={mockSetUserDetails}
        currentUserId="user456"
      />
    );
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

    render(
      <ProfileInfo
        userDetails={{ ...userDetails, isFollowedByCurrentUser: true }}
        currentUserId="user456"
        setUserDetails={mockSetUserDetails}
      />
    );
    const unfollowButton = screen.getByText('Unfollow');
    expect(unfollowButton).toBeInTheDocument();
    await user.click(unfollowButton);
    expect(fetch).toHaveBeenCalledWith(
      `https://odin-book-backend-production.up.railway.app/unfollow`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ followedId: userDetails._id }),
      }
    );
  });

  it('calls the follow function when the follow button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ProfileInfo
        userDetails={userDetails}
        setUserDetails={mockSetUserDetails}
        currentUserId="user456"
      />
    );
    const followButton = screen.getByText('Follow');
    await user.click(followButton);
    expect(fetch).toHaveBeenCalledWith(
      `https://odin-book-backend-production.up.railway.app/follow`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ followedId: userDetails._id }),
      }
    );
  });

  it('display form when on edit button click', async () => {
    const user = userEvent.setup();
    render(
      <ProfileInfo
        userDetails={userDetails}
        setUserDetails={mockSetUserDetails}
        currentUserId={userDetails._id}
      />
    );

    await user.click(screen.getByRole('button', { name: /edit/i }));
    await waitFor(() => {
      expect(screen.getByText(/edit form/i)).toBeInTheDocument();
    });
  });
});
