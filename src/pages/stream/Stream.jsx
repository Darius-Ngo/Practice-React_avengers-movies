import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';

import MovieList from '../../components/movie-list/MovieList';

import './Stream.scss';

const Stream = (props) => {
    const { category, id } = useParams();

    const [item, setItem] = useState([]);
    const [src, setSrc] = useState('');
    const [episodes, setEpisodes] = useState([]);
    const [episodePlay, setEpisodePlay] = useState(1);

    const iframeRef = useRef();

    useEffect(() => {
        const getMovie = async () => {
            const res = await tmdbApi.getDetail(category, id, { params: {} });
            setItem(res);
            for (let i = 1; i <= res.seasons[0].episode_count; i++) {
                setEpisodes((prep) => ([...prep, i]));
            }
        }
        getMovie();

    }, [category, id]);

    useEffect(() => {
        switch (category) {
            case 'movie':
                return setSrc(apiConfig.getStreamMovie(id));
            default:
                return setSrc(apiConfig.getStreamTv(id, 1, episodePlay));
        }
    }, [episodePlay, item, id]);

    useEffect(() => {
        document.addEventListener("webkitfullscreenchange", function () {
            if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
                if (window.screen && typeof window.screen.unlockOrientation === 'function') {
                    window.screen.unlockOrientation(); // Unlock screen orientation
                }
            } else {
                if (window.screen && typeof window.screen.lockOrientation === 'function') {
                    window.screen.lockOrientation('portrait-primary'); // Relock screen orientation
                }
            }
        });
    }, [])

    const posterSrc = apiConfig.w500Image(item.poster_path);

    const SelectEps = (e, episode) => {
        const Eps = document.querySelector('.list-episodes__item.active');
        if (Eps) {
            Eps.classList.remove('active');
        }
        e.target.classList.add('active');
        e.target.classList.add('selected');
        setEpisodePlay(episode);
        window.scrollTo(0, 0);
    }

    return (
        <div className="padding-content mb-3">
            <div className="stream__container">
                <div className="stream__screen">
                    {src && (
                        <iframe ref={iframeRef} src={src} frameborder="0"></iframe>
                    )}
                </div>
                {category === 'tv' && (
                    <div className="mb-3 list-episodes">
                        <div className="list-episodes__heading mb-1">
                            <i className='bx bxs-data'></i> List episodes
                        </div>
                        <div className="list-episodes__list">
                            {episodes.map((episode, i) => (
                                <span key={i} className={`list-episodes__item ${episode == 1 ? 'active selected' : ''}`} onClick={(e) => SelectEps(e, episode)}>
                                    Eps {episode}
                                </span>
                            ))
                            }
                        </div>
                    </div>
                )}
                <div className="stream__intro">
                    <div className="stream__intro__poster">
                        <div className="stream__intro__poster__img">
                            <img src={posterSrc} alt="" />
                        </div>
                        <div className="stream__intro__rating">
                            {item && (
                                <div className="stream__intro__rating__result">
                                    <div className="stream__intro__rating__result__mark">
                                        <span className="average">{item.vote_average && (item.vote_average).toFixed(1)}</span> / {item.vote_count} voted
                                    </div>
                                    <div className="stream__intro__rating__result__progress">
                                        <div className="stream__intro__rating__result__progress__bar" style={{ width: `${+(item.vote_average) * 10}%` }}></div>
                                    </div>
                                </div>
                            )}
                            <div className="stream__intro__rating__btns">
                                <div className="stream__intro__rating__btns__like">
                                    <i className='bx bxs-like'></i> Like
                                </div>
                                <div className="stream__intro__rating__btns__dislike">
                                    <i className='bx bxs-dislike'></i> Dislike
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stream__intro__info">
                        <h1 className="stream__intro__info__name">{item.title || item.name}</h1>
                        <div className="stream__intro__info__btns">
                            <span className="stream__intro__info__btns__HD">HD</span>
                            <div className="stream__intro__info__btns__addFV">
                                <i className='bx bx-list-plus' ></i>
                                <span>Add to Favorites</span>
                            </div>
                        </div>
                        <div className="stream__intro__info__overview">{item.overview}</div>
                        <div className="stream__intro__info__elements">
                            <div className="row">
                                <div className="released">
                                    <span className="title">Released: </span><span>{item.release_date || item.first_air_date}</span>
                                </div>
                                <div className="genres">
                                    <span className="title">Released: </span>
                                    {item.genres && item.genres.map((genre, i) => (
                                        <span key={i}>{genre.name}{i < item.genres.length - 1 ? ', ' : '.'}</span>
                                    ))}
                                </div>
                                {category === 'movie' && (
                                    <div className="tagline">
                                        <span className="title">Tagline: </span><span>{item.tagline || item.status}</span>
                                    </div>
                                )}
                                {category === 'tv' && (
                                    <div className="status">
                                        <span className="title">Status: </span><span>{item.status}</span>
                                    </div>
                                )}
                            </div>
                            <div className="row">
                                {category === 'movie' && (
                                    <div className="duration">
                                        <span className="title">Duration: </span><span>{item.runtime} min</span>
                                    </div>
                                )}
                                {category === 'tv' && (
                                    <div className="episode_count">
                                        <span className="title">Episodes count: </span><span>{item.number_of_episodes}</span>
                                    </div>
                                )}
                                <div className="country">
                                    <span className="title">Country: </span>
                                    {item.production_countries && (
                                        <span>{item.production_countries[0].name}</span>
                                    )}
                                </div>
                                <div className="production">
                                    <span className="title">Production: </span>
                                    {item.production_companies && item.production_companies.map((company, i) => (
                                        <span key={i}>{company.name}{i < item.production_companies.length - 1 ? ', ' : '.'}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section mb-3">
                    <h1 className='mb-1'>SIMILAR</h1>
                    <MovieList category={category} id={id} type='similar'></MovieList>
                </div>
                <div className="footer"></div>
            </div>
        </div>
    )
}

export default Stream