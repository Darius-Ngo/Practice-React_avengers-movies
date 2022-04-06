import React from 'react';
import { useParams } from 'react-router-dom';

import MovieSearch from '../components/movie-search/MovieSearch';
import MovieGrid from '../components/movie-grid/MovieGrid';
import YourMovies from '../components/your-movies/YourMovies';
import Footer from '../components/footer/Footer';

const Catalog = () => {
    const { category, keyword } = useParams();

    return (
        <div className="padding-content">
            {keyword && (
                <MovieSearch />
            )}
            {category !== 'history' && category !== 'favorites' && !keyword && (
                <MovieGrid />
            )}
            {category === 'favorites' && (
                <YourMovies category={category} />
            )}
            {category === 'history' && (
                <YourMovies category={category} />
            )}
            <Footer />
        </div>
    )
}

export default Catalog