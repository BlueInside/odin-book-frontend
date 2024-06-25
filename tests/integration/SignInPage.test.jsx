import { describe, expect, it } from 'vitest';
import SignInPage from '../../src/pages/SignInPage';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('SignInPage component', () => {
  const routes = [
    {
      path: '/',
      element: <SignInPage />,
    },
  ];
  const router = createMemoryRouter(routes, { initialEntries: ['/'] });

  it('should render call-to-action title', () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
  });

  it('should render GitHub authentication button', () => {
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole('button', { name: /Sign in with GitHub/i })
    ).toBeInTheDocument();
  });
});
