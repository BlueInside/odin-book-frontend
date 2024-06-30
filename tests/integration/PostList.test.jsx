import { beforeEach, describe, expect, it, vi } from 'vitest';
import PostList from '../../src/components/PostList';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import usePosts from '../../src/hooks/usePosts';
import { useAuth } from '../../src/hooks/useAuth';
import userEvent from '@testing-library/user-event';

// Mock
vi.mock('../../src/hooks/usePosts', () => ({ default: vi.fn() }));
vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));
globalThis.fetch = vi.fn();

const postsMock = [
  {
    _id: '1',
    content: 'test content',
    author: {
      _id: 'id1',
      firstName: 'author1',
      profilePicture: 'someUrl',
    },
    media: ['media'],
    likesCount: 16,
    comments: [],
  },
  {
    _id: '2',
    content: 'test content2',
    author: {
      _id: 'id1',
      firstName: 'author2',
      profilePicture: 'someUrl',
    },
    media: ['media'],
    likesCount: 6,
    comments: [],
  },
  {
    _id: '3',
    content: 'test content3',
    author: {
      firstName: 'author3',
      profilePicture: 'someUrl',
    },
    media: ['media'],
    likesCount: 12,
    comments: [],
  },
];

describe('Post list', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetch.mockClear();
    useAuth.mockReturnValue({ user: { id: 'id1', firstName: 'karol' } });
  });

  it('Should display posts', () => {
    usePosts.mockReturnValue({ posts: postsMock });
    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );

    const posts = screen.getAllByRole('article');

    expect(posts).toHaveLength(3);
  });

  it('Should display a loading message when loading', () => {
    usePosts.mockReturnValue({
      posts: [],
      loading: true,
      error: null,
    });
    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Should display an error message on fetch error', () => {
    usePosts.mockReturnValue({
      posts: [],
      loading: false,
      error: 'Error fetching posts',
    });
    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );
    expect(screen.getByText('Error...')).toBeInTheDocument();
  });

  it('Should display correct content in posts', () => {
    usePosts.mockReturnValue({ posts: postsMock, loading: false, error: null });
    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );
    const firstPostContent = screen.getByText(postsMock[0].content);
    expect(firstPostContent).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'src',
      postsMock[0].author.profilePicture
    );
    expect(screen.getByText(`${postsMock[0].likesCount}`)).toBeInTheDocument();
  });

  it('Should display delete buttons if post author id is same as user id', async () => {
    usePosts.mockReturnValue({ posts: postsMock, loading: false, error: null });

    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );

    const deletePostButtons = screen.getAllByRole('button', {
      name: /delete post/i,
    });

    expect(deletePostButtons).toHaveLength(2);
  });

  it('Should send DELETE fetch request on button click', async () => {
    usePosts.mockReturnValue({ posts: postsMock, loading: false, error: null });
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Post deleted' }),
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );

    const deletePostButtons = screen.getAllByRole('button', {
      name: /delete post/i,
    });

    // Click on first post delete button
    await user.click(deletePostButtons[0]);

    expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/posts/1`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
  });

  it('Should hide removed post', async () => {
    usePosts.mockReturnValue({ posts: postsMock, loading: false, error: null });
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Post deleted' }),
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );

    const deletePostButtons = screen.getAllByRole('button', {
      name: /delete post/i,
    });

    expect(screen.getAllByRole('article')).toHaveLength(3);
    // Click on first post delete button
    await user.click(deletePostButtons[0]);

    expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/posts/1`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('Should not remove the post if the delete operation fails', async () => {
    usePosts.mockReturnValue({ posts: postsMock, loading: false, error: null });
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );

    const deletePostButtons = screen.getAllByRole('button', {
      name: /delete post/i,
    });
    await user.click(deletePostButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Network Error')).toBeInTheDocument();
    });
    expect(screen.getAllByRole('article')).toHaveLength(3); // Assert that the number of posts hasn't changed
  });

  it('Displays an error message when the delete operation fails', async () => {
    usePosts.mockReturnValue({ posts: postsMock, loading: false, error: null });
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ message: 'Incorrect post id' }),
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );

    const deletePostButtons = screen.getAllByRole('button', {
      name: /delete post/i,
    });

    await user.click(deletePostButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Incorrect post id')).toBeInTheDocument();
    });
  });
});
