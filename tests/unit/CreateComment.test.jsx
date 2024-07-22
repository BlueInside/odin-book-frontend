import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateComment from '../../src/components/CreateComment';
import { useAuth } from '../../src/hooks/useAuth';
// Mocking useAuth and fetch
vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));
globalThis.fetch = vi.fn();

describe('CreateComment', () => {
  const mockAddComment = vi.fn();
  const mockUser = { id: 'someId' };

  beforeEach(() => {
    useAuth.mockReturnValue({ user: mockUser });
    fetch.mockClear();
    vi.clearAllMocks();
  });

  it('renders correctly and submits a new comment', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ comment: { id: '123', content: 'Nice post!' } }),
    });

    const user = userEvent.setup();

    render(<CreateComment postId="1" addComment={mockAddComment} />);

    const input = screen.getByLabelText(/text:/i);
    const submitButton = screen.getByRole('button', { name: /add comment/i });

    // Enter text into the textarea and submit the form
    await user.type(input, 'Nice post!');
    await user.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://odin-book-backend-production.up.railway.app/comments',
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ content: 'Nice post!', postId: '1' }),
        }
      );
      expect(mockAddComment).toHaveBeenCalledWith({
        id: '123',
        content: 'Nice post!',
        author: mockUser,
      });
    });
  });

  it('shows an error when the content is empty', async () => {
    const user = userEvent.setup();

    render(<CreateComment postId="1" addComment={mockAddComment} />);

    const submitButton = screen.getByRole('button', { name: /add comment/i });

    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Post content cannot be empty!')
      ).toBeInTheDocument();
    });
  });

  it('handles server errors', async () => {
    const user = userEvent.setup();
    fetch.mockRejectedValueOnce(new Error('Failed to create post'));

    render(<CreateComment postId="1" addComment={mockAddComment} />);

    const input = screen.getByLabelText(/text:/i);
    const submitButton = screen.getByRole('button', { name: /add comment/i });

    await user.type(input, 'Nice post!');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to create post')).toBeInTheDocument();
    });
  });
});
