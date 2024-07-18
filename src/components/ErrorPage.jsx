import { ErrorMessage } from '../styles/Comments.styled';
import {
  ErrorCode,
  ErrorContainer,
  HomeLink,
  Suggestion,
} from '../styles/ErrorPageStyles.styled';
import PropTypes from 'prop-types';
export default function ErrorPage() {
  const errorCode = 'Error';
  const message = 'Something went wrong.';
  const suggestion = 'Please check the URL or go back to the home page.';

  return (
    <ErrorContainer>
      <ErrorCode>{errorCode}</ErrorCode>
      <ErrorMessage>{message}</ErrorMessage>
      <Suggestion>{suggestion}</Suggestion>
      <HomeLink to="/">Go Home</HomeLink>
    </ErrorContainer>
  );
}

ErrorPage.propTypes = {
  errorCode: PropTypes.string,
  message: PropTypes.string,
  suggestion: PropTypes.string,
};
