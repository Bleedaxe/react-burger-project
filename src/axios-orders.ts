import axios from 'axios';

let instance = axios.create({
    baseURL: 'https://react-my-burger-tpp.firebaseio.com/'
})

export default instance;