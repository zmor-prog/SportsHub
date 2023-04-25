import React, {useState} from 'react';
import './CreatePost.css'

import { supabase } from '../client'
import { useEffect } from 'react';

console.log("About to run Post")
const CreatePost = ()=> {
    const [post, setPost] = useState({title: "", content: ""})
    console.log("Running Post")
    const createPost = async (event) => {
        event.preventDefault();
       await supabase
        .from('Posts')
        .insert({title: post.title, content: post.content,upvotes:"0"})
        .select();
    
        window.location = "/";
    }
    const handleChange = (event) => {
        const {title, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [title]:value,
            }
        })
    }
    return (
        <div>
            <form >
                <label for="title">Title</label> <br />
                <input onChange={handleChange} value={post.title} type="text" id="title" title="title" /><br />
                <br/>

                <label for="content">Content (Optional)</label><br />
                <textarea onChange={handleChange} value={post.content} rows="5" cols="50" id="content" title="content">
                </textarea>
                <br/>
               
                
                <input onClick={createPost} type="submit" value="Create Post" />
            </form>
        </div>
    )
}

export default CreatePost