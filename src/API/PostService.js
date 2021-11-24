import axios from "axios";

export async function getAllPosts(limit = -1, page = 1) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
            _limit: limit,
            _page: page
        }
    });
    return response;
}
export async function postNewPost(post) {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
    return response;
}