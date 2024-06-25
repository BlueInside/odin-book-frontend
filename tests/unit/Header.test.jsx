import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../../src/components/Header.jsx';

describe('Header component', () => {
  it('should render the app name', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', { name: /odin-book/i })
    ).toHaveTextContent('Odin-Book');
  });

  it('should render the call to action text', () => {
    render(<Header />);
    expect(
      screen.getByText(/Connect with friends on Odin-Book./i)
    ).toBeInTheDocument();
  });
});
