import { beforeEach, describe, expect, it, vi } from 'vitest';
import PostList from '../../src/components/PostList';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import usePosts from '../../src/hooks/usePosts';

vi.mock('../../src/hooks/usePosts', () => ({ default: vi.fn() }));

const postsMock = [
  {
    _id: '1',
    content: 'test content',
    author: {
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

describe('Comment list', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should display comments', () => {
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
    usePosts.mockReturnValue({ posts: [], loading: true, error: null });
    render(<PostList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Should display an error message on fetch error', () => {
    usePosts.mockReturnValue({
      posts: [],
      loading: false,
      error: 'Error fetching posts',
    });
    render(<PostList />);
    expect(screen.getByText('Error...')).toBeInTheDocument();
  });

  it('Should display correct content in posts', () => {
    usePosts.mockReturnValue({ posts: postsMock, loading: false, error: null });
    render(<PostList />);
    const firstPostContent = screen.getByText(postsMock[0].content);
    expect(firstPostContent).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'src',
      postsMock[0].author.profilePicture
    );
    expect(screen.getByText(`${postsMock[0].likesCount}`)).toBeInTheDocument();
  });
});
