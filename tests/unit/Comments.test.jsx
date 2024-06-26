import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Comments from '../../src/components/Comments';

// Mock fetch function
globalThis.fetch = vi.fn();

describe('Comments', () => {
  const mockComments = [
    { _id: '1', text: 'First comment', author: { firstName: 'John' } },
    { _id: '2', text: 'Second comment', author: { firstName: 'Jane' } },
  ];

  beforeEach(() => {
    fetch.mockClear();
  });

  it('loads and displays comments', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ comments: mockComments }),
    });

    render(<Comments postId="123" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.getByText('John: First comment')).toBeInTheDocument();
      expect(screen.getByText('Jane: Second comment')).toBeInTheDocument();
    });
  });

  it('handles no comments', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ comments: [] }),
    });

    render(<Comments postId="123" />);
    await waitFor(() => {
      expect(screen.getByText('No comments yet.')).toBeInTheDocument();
    });
  });

  it('displays an error if the fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch comments'));
    render(<Comments postId="123" />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch comments/));
    });
  });
});
