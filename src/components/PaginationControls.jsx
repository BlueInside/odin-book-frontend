import PropTypes from 'prop-types';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import {
  PaginationContainer,
  PageButton,
  NavButton,
} from '../styles/PaginationControlsStyles.styled';
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
        <PageButton
          key={i}
          onClick={() => setCurrentPage(i)}
          disabled={i === currentPage}
          style={{ fontWeight: i === currentPage ? 'bold' : 'normal' }}
        >
          {i}
        </PageButton>
      );
    }
    return pages;
  };

  return (
    <PaginationContainer>
      {currentPage > 1 && (
        <NavButton onClick={() => setCurrentPage(currentPage - 1)}>
          <MdNavigateBefore /> Prev
        </NavButton>
      )}

      {renderPageNumbers()}

      {hasNextPage && (
        <NavButton onClick={() => setCurrentPage(currentPage + 1)}>
          Next <MdNavigateNext />
        </NavButton>
      )}
    </PaginationContainer>
  );
}

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
