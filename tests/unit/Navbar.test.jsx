import { describe, expect, it } from 'vitest';
import NavigationBar from '../../src/components/Navbar';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar', () => {
  it('Should display navbar with 3 links', () => {
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    // Check if all expected links are present and correctly set up
    expect(links[0]).toHaveAttribute('href', '/profile');
    expect(links[1]).toHaveAttribute('href', '/users');
    expect(links[2]).toHaveAttribute('href', '/post');
  });
});
