import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UsersPage from '../../src/pages/UsersPage';

vi.mock('../../src/components/UsersList', () => ({
  default: () => <div>Users list</div>,
}));

vi.mock('../../src/components/PaginationControls', () => ({
  default: () => <div>Pagination controls</div>,
}));

globalThis.fetch = vi.fn();

describe('UsersPage', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should display UsersPage correctly', async () => {
    render(<UsersPage />);

    expect(fetch).toHaveBeenCalledOnce();
    expect(screen.getByLabelText('search bar')).toBeInTheDocument();
    expect(screen.getByText('Users list')).toBeInTheDocument();
    expect(screen.getByText('Pagination controls')).toBeInTheDocument();
  });
});
