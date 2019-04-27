import Axios from 'axios';
const axios = Axios.create({ withCredentials: true });

const DEFAULT_IMG_URL = "https://www.marketingmuses.com/wp-content/uploads/2018/01/invis-user-768x768.png";

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api'
    : '//localhost:3003/api';

export default {
    query,
    signup,
    login,
    logout,
    getById
};

function query() {
    return [];
}

async function signup(user) {
    try {
        if (!user.img || user.img === '') user.img = DEFAULT_IMG_URL;
        user.name = user.name.toLowerCase();
        user.createdAt = Date.now();
        const { data } = await axios.post(`${BASE_URL}/signup`, user);
        return data;
    } catch (err) {
        throw err;
    }
}

async function login(credentials) {
    try {
        credentials.name = credentials.name.toLowerCase();
        const { data } = await axios.post(`${BASE_URL}/login`, credentials);
        return data;
    } catch (err) {
        throw err;
    }
}

async function logout() {
    try {
        const res = await axios.post(`${BASE_URL}/logout`)
        if (res.status === 200) {
            return true;
        }
    } catch (err) {
        return false;
    }
}

async function getById(id) {
    try {
        const {data} = await axios.get(`${BASE_URL}/user/${id}`)
        return data;
    } catch (err) {
        throw err;
    }
}