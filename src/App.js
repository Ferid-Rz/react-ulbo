import React, {useMemo, useState, useRef} from "react";
import PostList from "./components/PostList";
import MyInput from "./components/UI/input/MyInput";
import MyButton from "./components/UI/button/MyButton";
import './styles/App.css'
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";


function App() {
   const [posts,setPosts] = useState([
       {id: 1,title: 'aa', body: '33'},
       {id: 2,title: 'bb', body: '22'},
       {id: 3,title: 'cc', body: '11'},
   ])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


    const createPost = (newPost) =>{
        setPosts([...posts, newPost])
        setModal(false )
    }
    const removePost = (post) => {
       setPosts(posts.filter(p => p.id !== post.id ))
    }

  return (
    <div className="App">
        <MyButton style={{marginTop: 30}} onClick={()=> setModal(true)}>
            Create Post
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter} />

        <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"list of posts: 1"}/>

    </div>
  );
}

export default App;
