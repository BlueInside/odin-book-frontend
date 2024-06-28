import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Comments from '../../src/components/Comments';
import { useAuth } from '../../src/hooks/useAuth';
import userEvent from '@testing-library/user-event';

// Mocks
vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

globalThis.fetch = vi.fn();

describe('Comments', () => {
  const mockComments = [
    {
      _id: '1',
      content: 'First comment',
      author: { id: 'karol', firstName: 'Karol' },
    },
  ];

  const mockDeleteComment = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch.mockClear();
  });

  it('displays comments', async () => {
    useAuth.mockReturnValue({ user: { id: 'id', firstName: 'name' } });
    render(
      <Comments
        comments={mockComments}
        postId={'post1'}
        deleteComment={mockDeleteComment}
      />
    );

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.getByText('First comment')).toBeInTheDocument();
    });
  });

  it('Should display delete buttons if comment belongs to user', async () => {
    useAuth.mockReturnValue({ user: { id: 'karol', firstName: 'Karol' } });
    render(
      <Comments
        comments={mockComments}
        postId={'post1'}
        deleteComment={mockDeleteComment}
      />
    );

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('should NOT display delete buttons if comment DOES NOT belongs to user', async () => {
    useAuth.mockReturnValue({
      user: { id: 'Christine', firstName: 'Christine' },
    });
    render(
      <Comments
        comments={mockComments}
        postId={'post1'}
        deleteComment={mockDeleteComment}
      />
    );

    expect(
      screen.queryByRole('button', { name: /delete/i })
    ).not.toBeInTheDocument();
  });

  it('Should send DELETE request with post and comment ids on comment delete button click', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => ({ message: 'All good' }),
    });
    const user = userEvent.setup();
    useAuth.mockReturnValue({
      user: { id: 'karol', firstName: 'Karol' },
    });
    render(
      <Comments
        comments={mockComments}
        postId={'post1'}
        deleteComment={mockDeleteComment}
      />
    );
    const deletePostBtn = screen.getByRole('button', { name: /delete/i });
    await user.click(deletePostBtn);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/comments', {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ postId: 'post1', commentId: '1' }),
    });

    expect(mockDeleteComment).toHaveBeenCalledWith('1');
  });

  it('displays an error message if the delete operation fails', async () => {
    const user = userEvent.setup();
    fetch.mockRejectedValueOnce(new Error('Failed to delete comment'));

    useAuth.mockReturnValue({
      user: { id: 'karol', firstName: 'Karol' },
    });

    render(
      <Comments
        comments={mockComments}
        postId={'post1'}
        deleteComment={mockDeleteComment}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to delete comment')).toBeInTheDocument();
    });
  });
});
