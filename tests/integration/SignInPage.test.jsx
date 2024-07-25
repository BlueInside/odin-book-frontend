import { afterEach, describe, expect, it, vi } from 'vitest';
import SignInPage from '../../src/pages/SignInPage';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const mockUseAuth = vi.fn();
vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

const routes = [
  {
    path: '/sign',
    element: <SignInPage />,
  },
  {
    path: '/',
    element: <div>Home page</div>,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/sign'],
  initialIndex: 0,
});

describe('SignInPage component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render call-to-action title', () => {
    mockUseAuth.mockReturnValue({ user: { firstName: 'Karol' } });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
  });

  it('should render GitHub authentication button', () => {
    mockUseAuth.mockReturnValue({ user: null });
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole('button', { name: /Sign in with GitHub/i })
    ).toBeInTheDocument();
  });

  it('should render "Continue as user.firstName button"', () => {
    mockUseAuth.mockReturnValue({ user: { firstName: 'Karol' } });
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole('button', { name: /Continue as Karol/i })
    ).toBeInTheDocument();
  });
});
