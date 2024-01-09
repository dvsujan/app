import axios from "axios";

export const searchUser = async (username, token) => {
  try {
    // fetch(`http://172.20.10.3:5000/auth/search/${username}`)
    // .then((response) => response.json())
    // .then((data) => {
    //   setUsers(data.users);
    //   setLoading(false);
    // })
    // .catch((error) => {
    //   console.error(error);
    //   setLoading(false);
    // });
    // write the above with axios
    const result = await axios.get(
      `http://172.20.10.3:5000/auth/search/${username}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (result.data.success) {
      return result.data.users;
    } else {
      throw new Error(result.data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
