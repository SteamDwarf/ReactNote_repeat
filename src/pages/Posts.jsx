import { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import PostVieweController from "../components/PostVieweController";
import PostList from "../components/PostList";
import Modal from "../components/Modal";
import { usePosts } from "../hooks/usePosts";
import Pangination from "../components/Pangination";
import '../style.css'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearUploadErrorAction, fetchPostsAction, setPostsLimitAction, setSearchQuerryAction, setSortOptionAction, turnOverPageAction, uploadPostAction } from "../redux/reducers/PostReducer";
import { showHideNewPostModalAction } from "../redux/reducers/UIReducer";

function Posts() {
  const dispatch = useDispatch();
  const {posts, error, isFetching} = useSelector(state => state.posts);
  const {curSortOption, postsLimit, page, searchQuerry} = useSelector(state => state.posts);
  const {uploadError, isUploading} = useSelector(state => state.posts);
  const isShownModal = useSelector(state => state.ui.newPostModalShown);
  const searchedAndSortedPosts = usePosts(posts, curSortOption, searchQuerry, postsLimit);


  useEffect(() => {
    dispatch(fetchPostsAction());
  }, []);

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
    dispatch(clearUploadErrorAction());
  }



  return (
    <div className='App'>
      {
        isShownModal
        ?
          <Modal 
            toggleModal={toggleModal}
            isLoading={isUploading}
            error={uploadError}
            loadingText='Подождите, пост загружается...' 
            clearError={() => dispatch(clearUploadErrorAction())}
          >
            <PostForm addPost={(newPost) => dispatch(uploadPostAction(newPost))} />
          </Modal>
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
        isLoading={isFetching}
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
