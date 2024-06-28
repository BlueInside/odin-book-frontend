import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Comments from '../../src/components/Comments';

describe('Comments', () => {
  const mockComments = [
    { _id: '1', content: 'First comment', author: { firstName: 'John' } },
    { _id: '2', content: 'Second comment', author: { firstName: 'Jane' } },
  ];

  it('displays comments', async () => {
    render(<Comments comments={mockComments} />);

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.getByText('John: First comment')).toBeInTheDocument();
      expect(screen.getByText('Jane: Second comment')).toBeInTheDocument();
    });
  });
});
