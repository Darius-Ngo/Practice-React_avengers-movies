import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import tmdbApi, { category } from '../../api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';

import img_404 from '../../assets/404.png';
import './MovieSearch.scss';

const MovieSearch = () => {
    const { keyword } = useParams();

    const [movieItems, setMovieItems] = useState([]);
    const [tvItems, setTvItems] = useState([]);

    useEffect(() => {
        const params = {
            query: keyword
        }
        const getMovie = async () => {
            const res = await tmdbApi.search(category.movie, { params });
            setMovieItems(res.results);
        }
        getMovie();

        const getTv = async () => {
            const res = await tmdbApi.search(category.tv, { params });
            setTvItems(res.results);
        }
        getTv();
    }, [keyword]);

    return (
        <div className="movies-search section">
            {movieItems.length > 0 && (
                <div className="mb-3">
                    <h1 className="mb-2">Your Movies</h1>
                    <div className="movies__grid">
                        {movieItems.map((item, i) => (
                            <div key={i} className="movies__grid__item">
                                <MovieCard key={i} category={category.movie} item={item} ></MovieCard>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {tvItems.length > 0 && (
                <div className="mb-3">
                    <h1 className="mb-2">Your TV Series</h1>
                    <div className="movies__grid">
                        {tvItems.map((item, i) => (
                            <div className="movies__grid__item" key={i}>
                                <MovieCard category={category.movie} item={item} ></MovieCard>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {movieItems.length === 0 && tvItems.length === 0 && (
                <div className="not_found">
                    <img src={img_404} alt="" />
                </div>
            )}
        </div>
    )
}

export default MovieSearch