import { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import PostVieweController from "../components/PostVieweController";
import PostList from "../components/PostList";
import MyModal from "../components/MyModal";
import { usePosts } from "../hooks/usePosts";
import { deletePostById, getAllPosts, postNewPost } from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Pangination from "../components/Pangination";
import '../style.css'
import { useContext } from "react/cjs/react.development";
import { PostsConfContext } from "../context/PostsConfContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPostsLimitAction, setSearchQuerryAction, setSortOptionAction, turnOverPageAction } from "../redux/PostReducer";
import { showHideNewPostModalAction } from "../redux/UIReducer";

function Posts() {
  const dispatch = useDispatch();
  const curSortOption = useSelector(state => state.posts.curSortOption);
  const postsLimit = useSelector(state => state.posts.postsLimit);
  const page = useSelector(state => state.posts.page);
  const searchQuerry = useSelector(state => state.posts.searchQuerry); 
  const isShownModal = useSelector(state => state.ui.newPostModalShown);

  const [posts, setPosts] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const searchedAndSortedPosts = usePosts(posts, curSortOption, searchQuerry, postsLimit);

  const [fetchPosts, postsIsLoading, error] = useFetching(async () => {
    const response = await getAllPosts();
    setPosts(response.data);
  });
  const [uploadPost, postIsUploading, uploadError, setUploadError] = useFetching(async (post) => {
    const response = await postNewPost(post);
    setPosts([...posts, post]);

    if(!uploadError) {
      toggleModal();
    }
  });

  useEffect(fetchPosts, []);

  function changePostsLimit(limit) {
    dispatch(setPostsLimitAction(limit));
    turnOverPage(1);
  }
  function turnOverPage(page) {
    dispatch(turnOverPageAction(page));
  }
  function changeSortOption(option) {
    dispatch(setSortOptionAction(option));
  }
  function changeSearchQuerry(querry) {
    dispatch(setSearchQuerryAction(querry));
  }
  function toggleModal() {
    dispatch(showHideNewPostModalAction(!isShownModal));
    setUploadError('');
  }


  return (
    <div className='App'>
      {
        isShownModal
        ?
          <MyModal 
            toggleModal={toggleModal}
            isLoading={postIsUploading}
            error={uploadError}
            loadingText='Подождите, пост загружается...' 
            setError={setUploadError}
          >
            <PostForm addPost={uploadPost} />
          </MyModal>
        : null
      }
      
      <PostVieweController 
        curSortOption={curSortOption} 
        changeSortOption={changeSortOption}
        searchQuerry={searchQuerry}
        changeSearchQuerry={changeSearchQuerry}
        toggleModal={toggleModal}
      />
      <Pangination 
        pages={searchedAndSortedPosts.length} 
        currentPage={page}
        changePage={turnOverPage}
        currentLimit={postsLimit}
        changeLimit={changePostsLimit}
      />
      <PostList 
        title='Посты' 
        posts={searchedAndSortedPosts[page - 1] || []}
        isLoading={postsIsLoading}
        error={error}
      />
      <Pangination 
        pages={searchedAndSortedPosts.length} 
        currentPage={page}
        changePage={turnOverPage}
        currentLimit={postsLimit}
        changeLimit={changePostsLimit}
      />
    </div>
  );
}

export default Posts;
