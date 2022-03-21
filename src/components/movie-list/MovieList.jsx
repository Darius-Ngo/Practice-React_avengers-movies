import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category } from '../../api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';

import './MovieList.scss';

const MovieList = props => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let res = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        res = await tmdbApi.getMovieList(props.type, { params });
                        break;
                    default:
                        res = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                res = await tmdbApi.similar(props.category, props.id)
            }

            setItems(res.results);
        }
        getList();
    }, [])

    return (
        <div className="movie__list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {items.map((item, i) => (
                    <SwiperSlide key={i}>
                        <MovieCard category={props.category} item={item}></MovieCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList