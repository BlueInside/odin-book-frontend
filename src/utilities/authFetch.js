export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('jwtToken');
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const config = { ...options, headers };

  const response = await fetch(url, config);
  return response;
};
