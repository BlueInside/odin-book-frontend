export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('jwtToken');
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const config = { ...options, headers };

  const response = await fetch(url, config);

  if (response.status === 401 || response.status === 403) {
    throw new Error('AUTH_REQUIRED');
  }
  return response;
};
