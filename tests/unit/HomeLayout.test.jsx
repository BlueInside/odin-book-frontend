import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeLayout from '../../src/components/HomeLayout';
import { useAuth } from '../../src/hooks/useAuth';

vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../src/components/Navbar', () => ({
  default: () => <div>NavigationBar</div>,
}));

describe('HomeLayout', () => {
  const user = { firstName: 'Karol' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    useAuth.mockReturnValue({ user });
    render(<HomeLayout />, { wrapper: MemoryRouter });
    expect(screen.getByText(/welcome, karol/i)).toBeInTheDocument();
  });

  it('should display the header, post list, and navigation bar', () => {
    render(<HomeLayout />, { wrapper: MemoryRouter });
    expect(screen.getByText('NavigationBar')).toBeInTheDocument();
    expect(screen.getByText(/welcome, karol/i)).toBeInTheDocument();
  });

  it('should link to the correct URL in the logo', () => {
    render(<HomeLayout />, { wrapper: MemoryRouter });
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://odin-book-blueinside.netlify.app/'
    );
  });
});
