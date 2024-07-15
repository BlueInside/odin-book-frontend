import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProfilePage from '../../src/pages/ProfilePage';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../src/hooks/useAuth';
import { useParams } from 'react-router-dom';

globalThis.fetch = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useParams: vi.fn() };
});

vi.mock('../../src/hooks/useUserInfo');
vi.mock('../../src/hooks/useAuth');
vi.mock('../../src/components/ProfileInfo', () => ({
  default: () => <div>Profile Info Component</div>,
}));
vi.mock('../../src/components/PostList', () => ({
  default: () => <div>User Posts List</div>,
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ userId: '123' });
    useAuth.mockReturnValue({ user: { id: '123', firstName: 'Karol' } });
    fetch.mockClear();
  });

  it('renders loading state initially', () => {
    fetch.mockReturnValueOnce(new Promise(() => {}));

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays data upon successful fetch', async () => {
    const mockData = {
      user: { id: '123', firstName: 'John Doe' },
    };

    fetch.mockResolvedValue({ json: () => Promise.resolve(mockData) });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Profile Info Component')).toBeInTheDocument();
      expect(screen.getByText('User Posts List')).toBeInTheDocument();
    });
  });

  it('handles errors during data fetching', async () => {
    fetch.mockRejectedValue(new Error('Failed to fetch data'));
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
});
