import { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import PostVieweController from "../components/PostVieweController";
import PostList from "../components/PostList";
import MyModal from "../UI/MyModal";
import { usePosts } from "../hooks/usePosts";
import { deletePostById, getAllPosts, postNewPost } from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Pangination from "../components/Pangination";
import '../style.css'

function Posts() {
  const [posts, setPosts] = useState([]);
  const [curSortOption, setCurSortOption] = useState('title');
  const [searchQuerry, setSearchQuerry] = useState('');
  const [isShownModal, setIsShownModal] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);
  const [postsLimit, setpostsLimit] = useState('10');
  const [page, setPage] = useState(1);
  const searchedAndSortedPosts = usePosts(posts, curSortOption, searchQuerry, postsLimit);

  const [fetchPosts, postsIsLoading, error] = useFetching(async () => {
    const response = await getAllPosts();
    setPosts(response.data);
  });
  const [uploadPost, postIsUploading, uploadError] = useFetching(async (post) => {
    const response = await postNewPost(post);
    setPosts([...posts, post]);
  });
  const [deletePost, postIsDeleting, deletingError] = useFetching(async (id) => {
    const response = await deletePostById(id);
    setPosts(posts.filter(post => post.id !== id));
  });

  useEffect(fetchPosts, []);

  function changePostsLimit(limit) {
    setpostsLimit(limit);
    setPage(1);
  }
/*   function removePost(delPost) {
    setPosts(posts.filter(post => post.id !== delPost.id));
  } */
  function changeSortOption(option) {
    setCurSortOption(option);
  }
  function changeSearchQuerry(querry) {
    setSearchQuerry(querry);
  }
  function toggleModal() {
    setIsShownModal(!isShownModal);
  }


  return (
    <div className='App'>
      <MyModal isShown={isShownModal} toggleModal={toggleModal}>
        <PostForm addPost={uploadPost} closeModal={toggleModal}/>
      </MyModal>
      
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
        title='Посты о языках программирования' 
        posts={searchedAndSortedPosts[page - 1] || []}
        removePost={deletePost}
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
