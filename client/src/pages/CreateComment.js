import React, {useState} from 'react';
import './CreatePost.css'
import { useParams } from 'react-router-dom';
import { supabase } from '../client'
import { useEffect } from 'react';

const CreateComment = ()=> {
    const {id}=useParams()
    const [post, setPost] = useState({title: "", content: ""})
    const createPost = async (event) => {
        event.preventDefault();
       await supabase
        .from('comment')
        .insert({content: post.content, post: id})
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
               
                <label for="content">Comment </label><br />
                <textarea onChange={handleChange} value={post.content} rows="5" cols="50" id="content" title="content">
                </textarea>
                <br/>
               
                
                <input onClick={createPost} type="submit" value="Create Post" />
            </form>
        </div>
    )
}

export default CreateComment