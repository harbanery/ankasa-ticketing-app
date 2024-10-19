export const setTokentoLocalStorage = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("refresh_token", data.refresh_token);
};

export const getTokenfromLocalStorage = () => {
  const token = localStorage.getItem("token");
  const refresh_token = localStorage.getItem("refresh_token");
  return { token, refresh_token };
};

export const removeTokenfromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
};
