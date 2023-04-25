import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData= async () =>{
            const {data} = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: true })
            // set state of posts
            setPosts(data);
        }
        setPosts(props.data);
        fetchData().catch(console.error());
    }, [props]);
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} title={post.title} content={post.content} createdpost={post.created_at}/>
                ) : <h2>{'No Sports Posts Were Added. Please Add a Post. 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;