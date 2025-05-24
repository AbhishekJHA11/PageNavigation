export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};
