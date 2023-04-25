import React, { useState, useEffect } from 'react';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const Card = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch initial bet count from the database
      const { data, error } = await supabase
        .from('Posts')
        .select('betCount')
        .eq('id', props.id);
      if (error) {
        console.error(error);
      } else if (data.length > 0) {
        // Update state with initial bet count
        setCount(data[0].betCount);
      }
    };
    fetchData();
  }, [props.id]);

  const updateCount = async (event) => {
    event.preventDefault();
    // Update bet count in the database
    await supabase
      .from('Posts')
      .update({ betCount: count + 1 })
      .eq('id', props.id);
    // Update state variable
    setCount((count) => count + 1);
  };

  return (
    <div className="Card">
      <Link to={'edit/' + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <h2 className="title">{props.title}</h2>
      <h3 className="content">{props.content}</h3>
      <p className="color">{props.color}</p>
      <Link to={'View/'+props.id}>View this info sport post</Link>

    </div>
  );
};

export default Card;