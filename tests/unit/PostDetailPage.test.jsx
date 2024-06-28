import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import PostDetailPage from '../../src/pages/PostDetailPage';
import { useParams } from 'react-router-dom';

// Mock fetch
globalThis.fetch = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useParams: vi.fn() };
});

vi.mock('../../src/components/Comments', () => {
  return { default: () => <div>Comments</div> };
});

describe('PostDetailPage', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ postId: '1' });
    fetch.mockClear();
  });

  it('loads and displays the post', async () => {
    const mockPost = {
      post: {
        author: {
          profilePicture: 'https://example.com/avatar.png',
          firstName: 'John',
        },
        content: 'This is a test post',
        likesCount: 5,
        comments: [{}, {}, {}],
      },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPost),
    });

    render(
      <MemoryRouter>
        <PostDetailPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('This is a test post')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText(/5/)).toBeInTheDocument();
      expect(screen.getByText(/3/)).toBeInTheDocument(); // Comments length
      expect(screen.getByText('Comments')).toBeInTheDocument();
    });
  });

  it('Displays add comment form', async () => {
    const mockPost = {
      author: {
        profilePicture: 'https://example.com/avatar.png',
        firstName: 'John',
      },
      content: 'This is a test post',
      likesCount: 5,
      comments: [{}, {}, {}],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPost),
    });

    render(
      <MemoryRouter>
        <PostDetailPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText('Create post')).toBeInTheDocument();
    });
  });
});
