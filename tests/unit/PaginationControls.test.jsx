import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PaginationControls from '../../src/components/PaginationControls';
import userEvent from '@testing-library/user-event';

describe('PaginationControls', () => {
  const mockSetCurrentPage = vi.fn();

  beforeEach(() => {
    mockSetCurrentPage.mockClear();
  });

  it('renders page numbers correctly', () => {
    render(
      <PaginationControls
        currentPage={1}
        hasNextPage={true}
        totalPages={5}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    const buttons = screen.getAllByRole('button');
    // Expect 5 page buttons + 1 next button
    expect(buttons).toHaveLength(6);
    expect(buttons[0].textContent).toBe('1');
    expect(buttons[1].textContent).toBe('2');
    expect(buttons[4].textContent).toBe('5');
  });

  it('shows "Prev" and "Next" buttons conditionally', () => {
    const { rerender } = render(
      <PaginationControls
        currentPage={1}
        hasNextPage={true}
        totalPages={3}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    expect(screen.queryByText(/Prev/)).toBeNull();
    expect(screen.getByText(/Next/)).toBeInTheDocument();

    rerender(
      <PaginationControls
        currentPage={2}
        hasNextPage={false}
        totalPages={3}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    expect(screen.getByText(/Prev/)).toBeInTheDocument();
    expect(screen.queryByText(/Next/)).toBeNull();
  });

  it('handles page changes correctly', async () => {
    const user = userEvent.setup();
    render(
      <PaginationControls
        currentPage={1}
        hasNextPage={true}
        totalPages={3}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    await user.click(screen.getByText('2'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);

    await user.click(screen.getByText(/Next/));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2); // Because the next button will increment the page
  });

  it('disables the current page button', () => {
    render(
      <PaginationControls
        currentPage={2}
        hasNextPage={true}
        totalPages={5}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    const currentPageButton = screen.getByText('2');
    expect(currentPageButton).toBeDisabled();
  });
});
