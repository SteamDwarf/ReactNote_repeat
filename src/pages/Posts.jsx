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

function Posts() {
  const {curSortOption, setCurSortOption} = useContext(PostsConfContext);
  const {postsLimit, setpostsLimit} = useContext(PostsConfContext);
  const [posts, setPosts] = useState([]);
  const [searchQuerry, setSearchQuerry] = useState('');
  const [isShownModal, setIsShownModal] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);
  const [page, setPage] = useState(1);
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
    setpostsLimit(limit);
    setPage(1);
  }

  function changeSortOption(option) {
    setCurSortOption(option);
  }
  function changeSearchQuerry(querry) {
    setSearchQuerry(querry);
  }
  function toggleModal() {
    setIsShownModal(!isShownModal);
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
        changePage={setPage}
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
        changePage={setPage}
        currentLimit={postsLimit}
        changeLimit={changePostsLimit}
      />
    </div>
  );
}

export default Posts;
