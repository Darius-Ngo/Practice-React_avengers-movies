import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import tmdbApi, { category } from '../../api/tmdbApi';

import './Footer.scss';

const Footer = () => {

    const [genresMovie, setGenresMovie] = useState([]);
    const [genresTV, setGenresTV] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            const params = {
                page: 1,
            }

            const resMovies = await tmdbApi.genres(category.movie, { params });
            setGenresMovie(resMovies.genres.slice(0, 10));

            const resTv = await tmdbApi.genres(category.tv, { params });
            setGenresTV(resTv.genres.slice(0, 10));
        }
        getGenres();
    }, [])

    return (
        <div className="container footer">
            <div className="footer__header">
                <div className="footer__header__title">
                    <Link to='/'>
                        AVENGERS
                    </Link>
                </div>
                <div className="footer__header__contact">
                    <div className="footer__header__contact__item">
                        <Link to="/">
                            <i className='bx bxl-facebook'></i>
                            <span>
                                Facebook
                            </span>
                        </Link>
                    </div>
                    <div className="footer__header__contact__item">
                        <Link to="/">
                            <i className='bx bxl-twitter'></i>
                            <span>
                                Twitter
                            </span>
                        </Link>
                    </div>
                    <div className="footer__header__contact__item">
                        <Link to="/">
                            <i className='bx bxl-google-plus' ></i>
                            <span>
                                Google+
                            </span>
                        </Link>
                    </div>
                    <div className="footer__header__contact__item">
                        <Link to="/">
                            <i className='bx bxl-instagram' ></i>
                            <span>
                                Instagram
                            </span>
                        </Link>
                    </div>
                    <div className="footer__header__contact__item">
                        <Link to="/">
                            <i className='bx bx-rss' ></i>
                            <span>
                                RSS
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="footer__content">
                <div className="footer__content__menu">
                    <div className="footer__content__menu__title">Movie Categories</div>
                    <div className="footer__content__menu__list">
                        <div className="footer__content__menu__list__link">
                            {genresMovie.slice(0, 5).map((genre, i) => (
                                <Link to='/movie' key={i}>{genre.name}</Link>
                            ))}
                        </div>
                        <div className="footer__content__menu__list__link">
                            {genresMovie.slice(5).map((genre, i) => (
                                <Link to='/movie' key={i}>{genre.name}</Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer__content__menu">
                    <div className="footer__content__menu__title">Tv Series</div>
                    <div className="footer__content__menu__list">
                        <div className="footer__content__menu__list__link">
                            {genresTV.slice(0, 5).map((genre, i) => (
                                <Link to='/tv' key={i}>{genre.name}</Link>
                            ))}
                        </div>
                        <div className="footer__content__menu__list__link">
                            {genresTV.slice(5).map((genre, i) => (
                                <Link to='/tv' key={i}>{genre.name}</Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer__content__menu">
                    <div className="footer__content__menu__title">Support</div>
                    <div className="footer__content__menu__list">
                        <div className="footer__content__menu__list__link">
                            <Link to='/'>My Account</Link>
                            <Link to='/'>FAQ</Link>
                            <Link to='/'>Watch on TV</Link>
                            <Link to='/'>Help Center</Link>
                            <Link to='/'>Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);
