import axios from 'axios';

const baseUrl = 'http://localhost:7000'

export const getAllUsers = () => {
    return axios.get(baseUrl + '/all-users');
}

export const createUser = (body) => {
    return axios.post(baseUrl + '/create-user', body);
}

export const deleteUser = (id) => {
    return axios.delete(baseUrl + '/remove-user/' + id);
}