export const setAuth = (token) => {
  if (!token) return;
  localStorage.setItem("token", token);
  window.dispatchEvent(new Event("authChanged"));
};

export const getAuth = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("authChanged"));
};
