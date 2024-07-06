import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProfilePage from '../../src/pages/ProfilePage';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../src/hooks/useAuth';
import fetchProfileData from '../../src/utilities/fetchProfileData';
import { useParams } from 'react-router-dom';

vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: () => vi.fn(),
}));
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useParams: vi.fn() };
});
vi.mock('../../src/utilities/fetchProfileData');
vi.mock('../../src/hooks/useAuth');
vi.mock('../../src/components/ProfileInfo', () => ({
  default: () => <div>Profile Info Component</div>,
}));
vi.mock('../../src/components/DisplayUserPosts', () => ({
  default: () => <div>User Posts Component</div>,
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ userId: '123' });
    useAuth.mockReturnValue({ user: { id: '123', firstName: 'Karol' } });
    fetchProfileData.mockClear();
  });

  it('renders loading state initially', () => {
    fetchProfileData.mockReturnValue(new Promise(() => {})); // Never resolving promise to simulate loading
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays data upon successful fetch', async () => {
    const mockData = {
      userDetails: { user: { id: '123', firstName: 'John Doe' } },
      posts: [{ id: '1', content: 'First Post' }],
    };
    fetchProfileData.mockResolvedValue(mockData);
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Profile Info Component')).toBeInTheDocument();
      expect(screen.getByText('User Posts Component')).toBeInTheDocument();
    });
  });
  it('handles errors during data fetching', async () => {
    fetchProfileData.mockRejectedValue(new Error('Failed to fetch data'));
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
