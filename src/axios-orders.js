import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burgerbuilder-f77b4-default-rtdb.firebaseio.com/'
});

export default instance;
