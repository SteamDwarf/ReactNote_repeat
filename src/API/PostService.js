import axios from "axios";

export async function getAllPosts(limit = -1, page = 1) {
    const response = await axios.get('http://localhost:5000/posts'/* , {
        params: {
            _limit: limit,
            _page: page
        }
    } */);
    return response;
}
export async function postNewPost(post) {
    const response = await axios.post('http://localhost:5000/posts', post);
    return response;
}
export async function getPostDetailsById(id) {
    const post = await axios.get(`http://localhost:5000/posts/${id}`);
    const comments = await axios.get(`http://localhost:5000/posts/${id}/comments`);
    return [post, comments];
}
export async function deletePostById(id) {
    const response = await axios.delete(`http://localhost:5000/posts/${id}`);
    return response;
}