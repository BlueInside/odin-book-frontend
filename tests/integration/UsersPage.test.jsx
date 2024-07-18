import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UsersPage from '../../src/pages/UsersPage';

vi.mock('../../src/components/UsersList', () => ({
  default: () => <div>Users list</div>,
}));

vi.mock('../../src/components/PaginationControls', () => ({
  default: () => <div>Pagination controls</div>,
}));

globalThis.fetch = vi.fn();

const mockUsers = [
  {
    _id: 'userId',
    firstName: 'Karol',
    lastName: 'Pulawski',
    profilePicture:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/388.jpg',
    fullName: 'Karol Pulawski',
    id: 'userId',
    followedByUser: false,
  },
];

fetch.mockResolvedValue(mockUsers);

describe('UsersPage', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it('should display UsersPage correctly', async () => {
    render(<UsersPage />);

    expect(fetch).toHaveBeenCalledOnce();
    expect(screen.getByLabelText('search bar')).toBeInTheDocument();
    expect(screen.getByText('Users list')).toBeInTheDocument();
    expect(screen.getByText('Pagination controls')).toBeInTheDocument();
  });
});
