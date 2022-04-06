import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';

import poster_404 from '../../assets/poster-404.png';

import './MovieCard.scss';

const MovieCard = (props) => {

    const [details, setDetails] = useState([]);

    const item = props.item;

    const link = `/${props.category}/${item.id}`;

    const imgSrc = apiConfig.w500Image(item.poster_path || item.background_path);

    useEffect(() => {
        const getDetail = async () => {
            const res = await tmdbApi.getDetail(props.category, item.id, { params: {} })
            setDetails(res);
        }
        getDetail();

    }, [props.category, props.item])

    useEffect(() => {
        const posters = document.querySelectorAll('.poster');
        posters.forEach((poster) => {
            poster.addEventListener('error', () => {
                poster.setAttribute('src', poster_404);
            })
        })

        return () => {
            posters.forEach((poster) => {
                poster.removeEventListener('error', () => {
                    poster.setAttribute('src', poster_404);
                })
            })
        }
    }, [])

    return (
        <Link to={link}>
            <div className="movie__card">
                <div className="movie__card__img">
                    <img className="poster" src={imgSrc} alt={item.title || item.name || "poster"} />
                </div>
                <Button className='circle'>
                    <i className='bx bx-play'></i>
                </Button>
                <div className="movie__card__rated">
                    <i className='bx bxs-star'></i>
                    {(item.vote_average).toFixed(1)}
                    {/* {console.log(item)} vote_average, vote_count, release_date, first_air_date */}
                </div>
                <div className="movie__card__info">
                    <h4 className="title">{item.title || item.name}</h4>
                    <div className="release_date">
                        <i className='bx bx-calendar'></i>
                        {(item.release_date || item.first_air_date)}
                    </div>
                    <div className="genres">
                        Genres:
                        <div className="genres__list">
                            {details.genres && details.genres.slice(0, 3).map((genre, i) => (
                                <span className="genres__item" key={i}>{genre.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard