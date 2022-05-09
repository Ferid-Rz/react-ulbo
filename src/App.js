import React, {useMemo, useState, useRef} from "react";
import PostList from "./components/PostList";
import MyInput from "./components/UI/input/MyInput";
import MyButton from "./components/UI/button/MyButton";
import './styles/App.css'
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";


function App() {
   const [posts,setPosts] = useState([
       {id: 1,title: 'aa', body: '33'},
       {id: 2,title: 'bb', body: '22'},
       {id: 3,title: 'cc', body: '11'},
   ])
    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')


    // const sortedPosts = getSortedPosts()
    const sortedPosts = useMemo(() => {
        console.log('aue')
        if(selectedSort){
            return [...posts].sort( (a,b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts
    }, [selectedSort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, sortedPosts])

    const createPost = (newPost) =>{
        setPosts([...posts, newPost])
    }
    const removePost = (post) => {
       setPosts(posts.filter(p => p.id !== post.id ))
    }
    const sortPosts = (sort) =>{
        setSelectedSort(sort)
    }

  return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
            <div>

                <MyInput
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Searching..."
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Sorting"
                    options={[
                        {value: 'title', name : 'By name'},
                        {value: 'body', name : 'By desc'}
                    ]}
                />
            </div>
        {sortedAndSearchedPosts .length !== 0
            ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"list of posts: 1"}/>
            : <h1 style={{textAlign: 'center'}}>Posts not found</h1>
        }

    </div>
  );
}

export default App;
