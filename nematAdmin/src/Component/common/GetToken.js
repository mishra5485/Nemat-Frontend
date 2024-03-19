const getToken = () => {
  const token = localStorage.getItem("Admintoken");

  // console.log("token ", token);

  const config = {
    headers: { Authorization: token },
  };

  return config;
};

export default getToken;
