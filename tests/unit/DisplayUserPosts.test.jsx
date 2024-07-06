import { render, screen } from '@testing-library/react';
import DisplayUserPosts from '../../src/components/DisplayUserPosts';
import { describe, it, expect } from 'vitest';
import { format } from 'date-fns';

describe('DisplayUserPosts', () => {
  it('displays no posts message when posts array is empty', () => {
    render(<DisplayUserPosts posts={[]} />);
    expect(screen.getByText('No posts to display.')).toBeInTheDocument();
  });

  it('displays no posts message when posts is null', () => {
    render(<DisplayUserPosts posts={null} />);
    expect(screen.getByText('No posts to display.')).toBeInTheDocument();
  });

  it('renders posts correctly', () => {
    const posts = [
      {
        _id: '1',
        content: 'First post content here',
        likesCount: 5,
        comments: [],
        createdAt: '2024-01-01T12:00:00.000Z',
      },
      {
        _id: '2',
        content: 'Second post content here',
        likesCount: 10,
        comments: [{}],
        createdAt: '2024-01-02T13:00:00.000Z',
      },
    ];

    render(<DisplayUserPosts posts={posts} />);

    // Check if all posts are displayed
    expect(screen.getByText('First post content here')).toBeInTheDocument();
    expect(screen.getByText('Second post content here')).toBeInTheDocument();

    // Check likes and comments count
    expect(screen.getByText('Likes: 5')).toBeInTheDocument();
    expect(screen.getByText('Likes: 10')).toBeInTheDocument();
    expect(screen.getByText('Comments: 0')).toBeInTheDocument();
    expect(screen.getByText('Comments: 1')).toBeInTheDocument();

    // Check date formatting
    expect(
      screen.getByText(
        `Posted on ${format(new Date(posts[0].createdAt), 'PPPp')}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Posted on ${format(new Date(posts[1].createdAt), 'PPPp')}`
      )
    ).toBeInTheDocument();
  });
});
