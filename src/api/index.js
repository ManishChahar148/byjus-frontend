import axios from 'axios';

const baseUrl = 'https://byjus-backend-manish.herokuapp.com'

export const getAllUsers = () => {
    return axios.get(baseUrl + '/all-users');
}

export const createUser = (body) => {
    return axios.post(baseUrl + '/create-user', body);
}

export const deleteUser = (id) => {
    return axios.delete(baseUrl + '/remove-user/' + id);
}