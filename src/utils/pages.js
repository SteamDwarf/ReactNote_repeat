export function getPagesCount(totalPostsCount, postsLimit) {
    return Math.ceil(totalPostsCount / postsLimit);
}
export function countPages(pages) {
    let countedPages = [];

    for(let i = 0; i < pages; i++) {
        countedPages.push(i + 1);
    }

    return countedPages;
}