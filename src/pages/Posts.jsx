import { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import PostVieweController from "../components/PostVieweController";
import PostList from "../components/PostList";
import MyModal from "../UI/MyModal";
import { usePosts } from "../hooks/usePosts";
import { getAllPosts } from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Pangination from "../components/Pangination";
import '../style';

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


  useEffect(fetchPosts, []);

  function changePostsLimit(limit) {
    setpostsLimit(limit);
    setPage(1);
  }
  function addPost(post) {
    setPosts([...posts, post]);
  }
  function removePost(delPost) {
    setPosts(posts.filter(post => post.id !== delPost.id));
  }
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
    <div className="App">
      <MyModal isShown={isShownModal} toggleModal={toggleModal}>
        <PostForm addPost={addPost} closeModal={toggleModal}/>
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
        removePost={removePost}
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
