import { afterEach, describe, expect, it, vi } from 'vitest';
import SignInPage from '../../src/pages/SignInPage';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockUseAuth = vi.fn();
vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

const routes = [
  {
    path: '/',
    element: <SignInPage />,
  },
  {
    path: '/home',
    element: <div>Home page</div>,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/'],
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

  it('should navigate to /home on Continue button click', async () => {
    mockUseAuth.mockReturnValue({ user: { firstName: 'Karol' } });
    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    const button = screen.getByRole('button', { name: /continue as Karol/i });

    await user.click(button);

    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
