import React from 'react';
import { useParams } from 'react-router-dom';

import MovieSearch from '../components/movie-search/MovieSearch';
import MovieGrid from '../components/movie-grid/MovieGrid';
import Footer from '../components/footer/Footer';

const Catalog = () => {
    const { category, keyword } = useParams();

    return (
        <div className="padding-content">
            {keyword && (
                <MovieSearch />
            )}
            {category && (
                <MovieGrid />
            )}
            <Footer />
        </div>
    )
}

export default Catalog