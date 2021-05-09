import axios from "axios";

const instance = axios.create({
  baseURL: "https://whatsup-clone-backend-sergm.herokuapp.com",
});

export default instance;
