import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Button, { ButtonOutline } from '../../components/button/Button';
import CastList from './CastList';
import MovieList from '../../components/movie-list/MovieList';
import { TrailerModal } from '../../components/slider/Slider';

import poster_404 from '../../assets/poster-404.png';
import './Detail.scss';
import Footer from '../../components/footer/Footer';

const Detail = () => {
    const { category, id } = useParams();

    const [item, setItems] = useState([]);

    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getMovie = async () => {
            const params = {};
            const res = await tmdbApi.getDetail(category, id, { params });
            setItems(res);
            window.scrollTo(0, 0);
        }
        getMovie();
    }, [category, id])

    useEffect(() => {
        const posterRef = document.querySelector('.detail__content__poster__img')
        posterRef.addEventListener('error', () => {
            posterRef.setAttribute('src', poster_404);
        })

        return () => {
            posterRef.removeEventListener('error', () => {
                posterRef.setAttribute('src', poster_404);
            })
        }
    }, [])

    useEffect(() => {

        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, id)
            setVideos(res.results.slice(0, 1))
        }
        getVideos();
    }, [category, id]);

    const setModalActive = () => {
        const modal = document.querySelector(`#modal__${item.id}`);
        if (videos.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No Trailer';
        }

        modal.classList.toggle('active');
    }

    const backgroundImage = apiConfig.originnalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);
    const poster = apiConfig.w500Image(item.poster_path);

    return (
        <div className="padding-content" >
            <div className="banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <Link to={`/${category}/${id}/streaming`}>
                    <ButtonOutline className="circle">
                        <i className='bx bx-play'></i>
                    </ButtonOutline>
                </Link>
            </div>
            <div className="detail mb-3">
                <div className="detail__content">
                    <div className="detail__content__poster">
                        <Link to={`/${category}/${id}/streaming`}>
                            <img src={poster} alt="poster" className="detail__content__poster__img" />
                            <Button className="circle btn-play"><i className='bx bx-play'></i></Button>
                        </Link>
                        <div className="btns">
                            <div className="btns__trailer" onClick={setModalActive}><i className='bx bxs-video'></i><span>Trailer</span></div>
                            <div className="btns__addFV"><i className='bx bx-list-plus' ></i><span>Favorites</span></div>
                        </div>
                    </div>
                    <div className="detail__content__info">
                        <div className="btns">
                            <div className="btns__trailer" onClick={setModalActive}><i className='bx bxs-video'></i><span>Watch Trailer</span></div>
                            <div className="btns__addFV"><i className='bx bx-list-plus' ></i><span>Add to favorites</span></div>
                        </div>

                        <h1 className="title">{item.title || item.name}</h1>

                        <div className="genres">
                            {item.genres && item.genres.slice(0, 3).map((genre, i) => (
                                <span className="genres__item" key={i}>{genre.name}</span>
                            ))}
                        </div>
                        <div className="overview">
                            {item.overview}
                        </div>

                        <div className="cast">
                            <h2>Cast</h2>
                            <div className="cast__list">
                                <CastList id={id} category={category} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section mb-3 similar-movies">
                <h1 className="mb-1">SIMILAR</h1>
                <MovieList id={id} category={category} type='similar' />
            </div>
            <TrailerModal item={item}></TrailerModal>
            <Footer />
        </div>
    )
}

export default Detail