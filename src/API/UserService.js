import axios from "axios";

export async function getAllUsers() {
    const response = await axios.get('http://localhost:5000/users');
    return response;
}
export async function getUserById(id) {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    return response;
}