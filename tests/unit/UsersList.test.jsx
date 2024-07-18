import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UsersList from '../../src/components/UsersList';
import { MemoryRouter } from 'react-router-dom';

describe('UsersList', () => {
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
});
