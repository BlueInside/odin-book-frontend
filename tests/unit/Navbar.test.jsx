import { beforeEach, describe, expect, it, vi } from 'vitest';
import NavigationBar from '../../src/components/Navbar';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../src/hooks/useAuth';

vi.mock('../../src/hooks/useAuth');

describe('Navbar', () => {
  const mockUser = {
    user: {
      id: 'id1',
      firstName: 'Karol',
    },
  };
  beforeEach(() => {
    useAuth.mockReturnValue(mockUser);
  });
  it('Should display navbar with 3 links', () => {
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    // Check if all expected links are present and correctly set up
    expect(links[0]).toHaveAttribute('href', '/profile/id1');
    expect(links[1]).toHaveAttribute('href', '/users');
    expect(links[2]).toHaveAttribute('href', '/post');
  });
});
