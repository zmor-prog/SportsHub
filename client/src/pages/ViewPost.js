import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';
import Card from '../components/Card';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import CommentCard from '../components/CommentCard';
const ViewPost = ({ data }) => {
  const { id } = useParams();
  const [post, setPost] = useState({}); // Use state for form data
  const [comments, setComments] = useState({}); // Use state for form data
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('Posts')
        .select()
        .eq('id', id);
      setPost(data[0]); // Set initial form data
    }
    const fetchData2 = async () => {
      const { data } = await supabase
        .from('comment')
        .select()
        .eq('post', id);
        setComments(data); // Set initial form data
    }

    fetchData().catch(console.error());
    fetchData2().catch(console.error());
  }, [id]);
// UPDATE post
const updatePost = async (event) => {
  event.preventDefault();

  await supabase
    .from('Posts')
    .update({ upvotes: parseInt(post.upvotes)+1})
    .eq('id', id);

  window.location = "/";
}
  
  return (
    <div>
      <h3>Title: {post.title}</h3>
      <h3>Content(Optional): {post.content}</h3>
      <h3>Posted: {post.created_at}</h3> 
      <button onClick={updatePost}>{post.upvotes}</button>
      <Link to={'/comment/' + id}>Add Comment</Link>
      {
                comments && comments.length > 0 ?
                comments.map((post,index) => 
                   <CommentCard id={post.id} content={post.content} createdpost={post.created_at}/>
                ) : <h5>{'No Comments Were Added. Please Add a Comment. 😞'}</h5>
            }
    </div>
  )
}

export default ViewPost;
