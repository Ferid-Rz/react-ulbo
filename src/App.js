import React, {useState, useRef} from "react";
import PostList from "./components/PostList";
import MyInput from "./components/UI/input/MyInput";
import MyButton from "./components/UI/button/MyButton";
import './styles/App.css'


function App() {
   const [posts,setPosts] = useState([
       {id: 1,title: 'Javascript', body: 'Description'},
       {id: 2,title: 'Javascript', body: 'Description'},
       {id: 3,title: 'Javascript', body: 'Description'},
   ])

    const [post,setPost] = useState({title: '', body: ''})

    const addNewPost = (e) =>{
       e.preventDefault()

console.log(post)
        setPosts([...posts,{...post, id: Date.now()}])
        setPost({title: '', body: ''})
    }

  return (
    <div className="App">
        <form>
            <MyInput value={post.title}
                     type="text"
                     placeholder="Post name"
                     onChange={e=> setPost({...post, title: e.target.value})}
            />
            <MyInput value={post.body}
                     type="text"
                     placeholder="Post Description"
                     onChange={e=> setPost({...post, body: e.target.value})}
                     // onChange={e  => setBody(e.target.value)}
            />
            <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>
        <PostList posts={posts} title={"list of posts: 1"}/>
    </div>
  );
}

export default App;
