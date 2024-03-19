const getToken = () => {
  const token = localStorage.getItem("token");

  // console.log("token ", token);

  const config = {
    headers: { Authorization: token },
  };

  return config;
};

export default getToken;
