import React, {useMemo, useState, useRef} from "react";
import PostList from "./components/PostList";
import MyInput from "./components/UI/input/MyInput";
import MyButton from "./components/UI/button/MyButton";
import './styles/App.css'
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";


function App() {
   const [posts,setPosts] = useState([
       {id: 1,title: 'aa', body: '33'},
       {id: 2,title: 'bb', body: '22'},
       {id: 3,title: 'cc', body: '11'},
   ])
    const [filter, setFilter] = useState({sort: '', query: ''})

    // const sortedPosts = getSortedPosts()
    const sortedPosts = useMemo(() => {
        console.log('aue')
        if(filter.sort){
            return [...posts].sort( (a,b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) =>{
        setPosts([...posts, newPost])
    }
    const removePost = (post) => {
       setPosts(posts.filter(p => p.id !== post.id ))
    }

  return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter} />

        <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"list of posts: 1"}/>

    </div>
  );
}

export default App;
