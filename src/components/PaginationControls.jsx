import PropTypes from 'prop-types';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

export default function PaginationControls({
  currentPage,
  hasNextPage,
  totalPages,
  setCurrentPage,
}) {
  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          disabled={i === currentPage}
          style={{ fontWeight: i === currentPage ? 'bold' : 'normal' }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      {currentPage > 1 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          <MdNavigateBefore /> Prev
        </button>
      )}

      {renderPageNumbers()}

      {hasNextPage && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Next <MdNavigateNext />
        </button>
      )}
    </div>
  );
}

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
