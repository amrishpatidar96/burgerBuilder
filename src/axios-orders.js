import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-9b4c7.firebaseio.com/'
});

export default instance;