import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useAuth } from '../../src/hooks/useAuth';

// Mock the useAuth hook
vi.mock('../../src/hooks/useAuth');

const routes = [
  {
    path: '/sign',
    element: <div>login first</div>,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <div>protected content</div>
      </ProtectedRoute>
    ),
  },
];

let router;

describe('ProtectedRoute', () => {
  beforeEach(() => {
    router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should NOT render children when user is NOT authenticated', () => {
    // Mock the authenticated state
    useAuth.mockReturnValueOnce({ user: null, isLoading: false });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/login first/i)).toBeInTheDocument();
  });

  it('should render children when user is authenticated', () => {
    // Mock the authenticated state
    useAuth.mockReturnValueOnce({
      user: { firstName: 'Karol', isLoading: false },
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
  });

  it('should display loading message when data is being loaded', async () => {
    // Mock the authenticated state
    useAuth.mockReturnValueOnce({ isLoading: true, user: null });
    render(<RouterProvider router={router} />);

    expect(screen.getByLabelText(/loading.../i)).toBeInTheDocument();
  });
});
