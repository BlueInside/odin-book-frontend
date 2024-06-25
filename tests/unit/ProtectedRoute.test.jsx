import { afterEach, describe, expect, it, vi } from 'vitest';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const mockUseAuth = vi.fn();

// Mock the useAuth hook
vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

const routes = [
  {
    path: '/',
    element: <div>login first</div>,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <div>protected content</div>
      </ProtectedRoute>
    ),
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/home'],
  initialIndex: 0,
});

describe('ProtectedRoute', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when user is authenticated', () => {
    // Mock the authenticated state
    mockUseAuth.mockReturnValue({ user: { firstName: 'Karol' } });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
  });

  it('should NOT render children when user is NOT authenticated', () => {
    // Mock the authenticated state
    mockUseAuth.mockReturnValue({ user: null });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/login first/i)).toBeInTheDocument();
  });
});
