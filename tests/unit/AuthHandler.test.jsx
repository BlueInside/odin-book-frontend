import { describe, expect, it } from 'vitest';
import AuthHandler from '../../src/components/AuthHandler';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const routes = [
  {
    path: '/',
    element: <div>Home Page</div>,
  },
  {
    path: '/auth',
    element: <AuthHandler />,
  },
  {
    path: '/sign',
    element: <div>Sign Page</div>,
  },
];

describe('AuthHandlers', () => {
  it('saves the token and redirects to home if token is provided', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/auth?token=12345'],
    });

    render(<RouterProvider router={router} />);

    expect(localStorage.getItem('jwtToken')).toBe('12345');

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('redirects to sign page with an error if no token is provided', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/auth'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Sign Page')).toBeInTheDocument();
  });
});
