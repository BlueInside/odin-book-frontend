import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UsersList from '../../src/components/UsersList';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

globalThis.fetch = vi.fn();

describe('UsersList', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  const users = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      profilePicture: 'http://example.com/pic1.jpg',
      followedByUser: true,
    },
    {
      _id: '2',
      firstName: 'Jane',
      lastName: 'Doe',
      profilePicture: '',
      followedByUser: false,
    },
  ];

  it('renders a list of users', () => {
    render(
      <MemoryRouter>
        <UsersList users={users} />
      </MemoryRouter>
    );
    const items = screen.getAllByText(/John|Jane/);
    expect(items).toHaveLength(2);
  });

  it('displays default profile image when no profile picture is provided', () => {
    render(
      <MemoryRouter>
        <UsersList users={users} />
      </MemoryRouter>
    );
    const images = screen.getAllByRole('img');
    expect(images[1].src).toContain('avatar_owpfg7.webp');
  });

  it("shows correct follow and unfollow buttons based on the user's followed status", () => {
    render(
      <MemoryRouter>
        <UsersList users={users} />
      </MemoryRouter>
    );
    expect(screen.getByText('Unfollow')).toBeInTheDocument();
    expect(screen.getByText('Follow')).toBeInTheDocument();
  });

  it('send fetch request when follow user', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <UsersList users={users} />
      </MemoryRouter>
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
        body: JSON.stringify({ followedId: users[1]._id }),
      }
    );
  });

  it('send fetch request when un-follow user', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <UsersList users={users} />
      </MemoryRouter>
    );

    const unfollowButton = screen.getByText('Unfollow');

    await user.click(unfollowButton);

    expect(fetch).toHaveBeenCalledWith(
      `https://odin-book-backend-production.up.railway.app/unfollow`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ followedId: users[0]._id }),
      }
    );
  });
});
