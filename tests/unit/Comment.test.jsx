import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Comment from '../../src/components/Comment';

describe('Render comment', () => {
  it('should render comment', () => {
    render(<Comment />);
    expect(screen.getByText(/Comment/i)).toBeInTheDocument();
  });
});
