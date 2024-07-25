import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import CreatePost from '../../src/pages/CreatePost';
import { useAuth } from '../../src/hooks/useAuth';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { authFetch } from '../../src/utilities/authFetch';

// Mock modules
vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../src/utilities/authFetch', () => ({
  authFetch: vi.fn(),
}));

globalThis.fetch = vi.fn();

describe('CreatePost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authFetch.mockClear();
    globalThis.fetch.mockClear();

    useAuth.mockReturnValue({
      user: { id: 1, firstName: 'Karol' },
      isLoading: false,
    });
  });

  it('renders the form and handles input', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CreatePost />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/content/i);
    const submitButton = screen.getByRole('button', { name: /create post/i });

    // Simulate user typing into the input field
    await user.type(input, 'New post content');
    expect(input.value).toBe('New post content');

    // Setup fetch to resolve with a successful post creation
    authFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ post: { content: 'New post content' } }),
    });

    // Simulate form submission
    await user.click(submitButton);

    await waitFor(() => {
      expect(authFetch).toHaveBeenCalled();
    });

    // After submission, the input should be cleared
    expect(input.value).toBe('');
  });

  it('displays an error when trying to submit an empty form', async () => {
    const user = userEvent.setup();
    authFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ post: { content: 'New post content' } }),
    });
    render(
      <MemoryRouter>
        <CreatePost />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /create post/i });

    // Trigger form submission without filling out the form
    await user.click(submitButton);

    await waitFor(() => {
      const error = screen.getByText(/post content cannot be empty!/i);
      expect(error).toBeInTheDocument();
    });
  });
});
