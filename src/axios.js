import axios from 'axios';

let myBaseUrl;
if (process.env.NODE_ENV === 'development') {
    myBaseUrl = 'http://localhost:3004'
}

const instance = axios.create({
    baseURL: myBaseUrl
});

export default instance;
