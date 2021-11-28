import axios from "axios";

export async function getAllUsers() {
    const response = await axios.get('http://localhost:5000/users');
    return response;
}
export async function getUserById(id) {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    return response;
}
export async function getUserByFilter(username, password) {
    const response = await axios.get(`http://localhost:5000/users?username=${username}&password=${password}`);
    return response;
}
export async function postNewUser(user) {
    const response = await axios.post('http://localhost:5000/users', user);
    return response;
}