import { useLocation } from 'react-router-dom';
import { ErrorMessage } from '../styles/Comments.styled';
import {
  ErrorCode,
  ErrorContainer,
  HomeLink,
  Suggestion,
} from '../styles/ErrorPageStyles.styled';
import PropTypes from 'prop-types';
export default function ErrorPage() {
  let location = useLocation();
  const {
    errorCode = 'Error',
    message = 'Something went wrong.',
    suggestion = 'Please check the URL or go back to the home page.',
  } = location.state || {};

  const notAuthenticatedUser = errorCode === 401 || errorCode === 403;

  return (
    <ErrorContainer>
      <ErrorCode>{errorCode}</ErrorCode>
      <ErrorMessage>{message}</ErrorMessage>
      <Suggestion>{suggestion}</Suggestion>
      {notAuthenticatedUser ? (
        <HomeLink to="/sign">Sign in</HomeLink>
      ) : (
        <HomeLink to="/">Go Home</HomeLink>
      )}
    </ErrorContainer>
  );
}

ErrorPage.propTypes = {
  errorCode: PropTypes.string,
  message: PropTypes.string,
  suggestion: PropTypes.string,
};
