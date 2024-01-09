import axios from "axios";
import { useSelector } from "react-redux";

async function getChannels() {
    const token = useSelector((state) => state.auth.token);
    console.log("Token: ", token);
  return axios.post('http://172.20.10.3:5000/channel/getChannels', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

export default getChannels;