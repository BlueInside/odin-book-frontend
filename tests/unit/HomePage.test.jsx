import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../src/pages/HomePage';
import { useAuth } from '../../src/hooks/useAuth';

vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../src/components/PostList', () => ({
  default: () => <div>PostList</div>,
}));

vi.mock('../../src/components/Navbar', () => ({
  default: () => <div>NavigationBar</div>,
}));

describe('HomePage', () => {
  const user = { firstName: 'Karol' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    useAuth.mockReturnValue({ user });
    render(<HomePage />, { wrapper: MemoryRouter });
    expect(screen.getByText(/welcome, karol/i)).toBeInTheDocument();
  });

  it('should display the header, post list, and navigation bar', () => {
    render(<HomePage />, { wrapper: MemoryRouter });
    expect(screen.getByText('PostList')).toBeInTheDocument();
    expect(screen.getByText('NavigationBar')).toBeInTheDocument();
    expect(screen.getByText(/welcome, karol/i)).toBeInTheDocument();
  });

  it('should link to the correct URL in the logo', () => {
    render(<HomePage />, { wrapper: MemoryRouter });
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://www.theodinproject.com/'
    );
  });
});
