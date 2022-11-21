// npm packages
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Component
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {

    const { categoryId } = useParams();

    const [loading, setLoading ] = useState(false);
    const [pins, setPins ] = useState(null);

    /**
     * Component Did Mount
     */
    useEffect(() => {
        setLoading(true);
        if(categoryId) {
            const query = searchQuery(categoryId);

            client.fetch(query)
            .then((data) => {
                setPins(data);
                setLoading(false);
            })

        } else {
            client.fetch(feedQuery)
            .then((data) => {
                setPins(data);
                setLoading(false);
            })
        }

    }, [categoryId])

    if(loading) return <Spinner message="We are adding ideas to your feed!"/>

    if(!pins?.length) return <h2> No pins available</h2>

  return (
    <div>
        {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed