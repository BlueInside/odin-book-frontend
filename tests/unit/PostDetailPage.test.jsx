import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import PostDetailPage from '../../src/pages/PostDetailPage';
import { useParams } from 'react-router-dom';

// Mock fetch and router params
globalThis.fetch = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useParams: vi.fn() };
});

vi.mock('../../src/components/Comments', () => ({
  default: () => <div>Comments</div>,
}));

vi.mock('../../src/components/CreateComment', () => ({
  default: () => <div>Create comment.</div>,
}));

describe('PostDetailPage', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ postId: '1' });
    fetch.mockClear();
  });

  it('loads and displays the post, including comments and create comment form', async () => {
    const mockData = {
      post: {
        author: {
          profilePicture: 'https://example.com/avatar.png',
          firstName: 'John',
        },
        content: 'This is a test post',
        likesCount: 5,
        media: [],
      },

      comments: [{}, {}, {}],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    render(
      <MemoryRouter>
        <PostDetailPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('This is a test post')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText(/Likes: 5/)).toBeInTheDocument();
      expect(screen.getByText(/Comments: 3/)).toBeInTheDocument(); // Comments length
      expect(screen.getByText('Comments')).toBeInTheDocument();
      expect(screen.getByText('Create comment.')).toBeInTheDocument();
    });
  });
});
