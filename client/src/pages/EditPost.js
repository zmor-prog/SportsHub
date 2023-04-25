import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';

const EditPost = ({ data }) => {
  const { id } = useParams();
  const [post, setPost] = useState({}); // Use state for form data

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('Posts')
        .select()
        .eq('id', id);
      setPost(data[0]); // Set initial form data
    }

    fetchData().catch(console.error());
  }, [id]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { title, value } = event.target;
    setPost(prevPost => ({ ...prevPost, [title]: value }));
  }

  // UPDATE post
  const updatePost = async (event) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .update({ title: post.title, content: post.content,upvotes:"0"})
      .eq('id', id);

    window.location = "/";
  }

  // DELETE post
  const deletePost = async (event) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .delete()
      .eq('id', id);

    window.location = "http://localhost:3000/";
  }

  return (
    <div>
      <form onSubmit={updatePost}>
        <label htmlFor="title">Title</label> <br />
        <input type="text" id="title" title="title" value={post.title} onChange={handleInputChange} /><br />
        <br />

        <label htmlFor="content">Content (Optional)</label><br />
        <textarea rows="5" cols="50" id="content" title="content" value={post.content} onChange={handleInputChange}></textarea>
        <br />

        
        <input type="submit" value="Edit Post" />
        <button className="deleteButton" onClick={deletePost}>Delete</button> {/* Add onClick event handler */}
      </form>
    </div>
  )
}

export default EditPost;
