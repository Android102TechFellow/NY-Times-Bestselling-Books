import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import './CrewGallery.css';

const CrewGallery = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            const { data } = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: true });

            setPosts(data);
        }
        fetchPosts().catch(console.error);
    }, []);
    
    return (
        <div className="CrewGallery">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} title={post.title} author={post.author} description={post.description}/>
                ) : 
                (
                  <div>
                      <h1>Your Crew is Empty!</h1>
                      <h2><Link to="/create">Create a Vigilante Here</Link></h2>
                  </div>
              )}
            
        </div>  
)
}

export default CrewGallery;