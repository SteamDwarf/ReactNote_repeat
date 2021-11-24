import React, {useMemo} from 'react'
import { getPagesCount } from '../utils/pages';

export function useSplittedPosts(posts, limit) {
    const splittedPosts = useMemo(() => {
        const pages = getPagesCount(posts.length, limit);
        const newSplittedPosts = [];

        if(limit == -1) {
            return [[...posts]];
        }

        for(let i = 0; i < pages; i++) {
            newSplittedPosts.push(posts.slice(i * limit, (i + 1) * limit));
        }

        return newSplittedPosts;
    }, [posts, limit]);

    return splittedPosts;
}
export function useSortedPosts(posts, curSortOption) {
    const sortedPosts = useMemo(() => {
        if(!curSortOption) {
            return posts;
        }
        return [...posts].sort((a,b) => a[curSortOption].localeCompare(b[curSortOption]));

    }, [curSortOption, posts]);

    return sortedPosts;
}

export function usePosts(posts, curSortOption, searchQuerry, limit) {
    const sortedPosts = useSortedPosts(posts, curSortOption);
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post) => post.title.toLowerCase().includes(searchQuerry.toLowerCase()) || 
                                   post.body.toLowerCase().includes(searchQuerry.toLowerCase()));
    }, [searchQuerry, sortedPosts]);
    const splittedPosts = useSplittedPosts(sortedAndSearchedPosts, limit);

    return splittedPosts;
}

