import { getPagesCount } from "./pages";

export function getSplittedPosts(posts, limit) {
    const pages = getPagesCount(posts.length, limit);
    const splittedPosts = [];

    for(let i = 0; i < pages; i++) {
        splittedPosts.push(posts.slice(i * limit, (i + 1) * limit));
    }

    return splittedPosts;
}