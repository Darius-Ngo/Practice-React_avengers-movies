import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Slider from '../components/slider/Slider';
import MovieList from '../components/movie-list/MovieList';
import { category, movieType, tvType } from '../api/tmdbApi';
import { ButtonOutline } from '../components/button/Button';
import Footer from '../components/footer/Footer';

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const style1 = {
        position: 'relative',
    }
    const style2 = {
        position: 'absolute',
        top: '-10rem'
    }

    return (
        <div className="container">
            <div>
                <Slider />
                <div className="padding-content">
                    <div className="section mb-3 list" style={style1}>
                        <div style={style2} id="top_movie"></div>
                        <div className="section__header mb-1">
                            <h1>Top Movies</h1>
                            <Link to={`/${category.movie}`}>
                                <ButtonOutline className='small flex'>View more </ButtonOutline>
                            </Link>
                        </div>
                        <MovieList category={category.movie} type={movieType.top_rated} />
                    </div>
                    <div id="" className="section mb-3 list" style={style1}>
                        <div style={style2} id="popular_movie"></div>
                        <div className="section__header mb-1">
                            <h1>Popular Movies</h1>
                            <Link to={`/${category.movie}`}>
                                <ButtonOutline className='small flex'>View more </ButtonOutline>
                            </Link>
                        </div>
                        <MovieList category={category.movie} type={movieType.popular} />
                    </div>
                    <div id="" className="section mb-3 list" style={style1}>
                        <div style={style2} id="upcoming_movie"></div>
                        <div className="section__header mb-1">
                            <h1>Upcoming Movies</h1>
                            <Link to={`/${category.movie}`}>
                                <ButtonOutline className='small flex'>View more </ButtonOutline>
                            </Link>
                        </div>
                        <MovieList category={category.movie} type={movieType.upcoming} />
                    </div>

                    <div id="" className="section mb-3 list" style={style1}>
                        <div style={style2} id="popular_tv"></div>
                        <div className="section__header mb-1">
                            <h1>Popular Tv Series</h1>
                            <Link to={`/${category.tv}`}>
                                <ButtonOutline className='small flex'>View more </ButtonOutline>
                            </Link>
                        </div>
                        <MovieList category={category.tv} type={tvType.popular} />
                    </div>
                    <div id="" className="section mb-3 list" style={style1}>
                        <div style={style2} id="top_tv"></div>
                        <div className="section__header mb-1">
                            <h1>Top Tv Series</h1>
                            <Link to={`/${category.tv}`}>
                                <ButtonOutline className='small flex'>View more </ButtonOutline>
                            </Link>
                        </div>
                        <MovieList category={category.tv} type={tvType.top_rated} />
                    </div>
                    <div id="" className="section mb-3 list" style={style1}>
                        <div style={style2} id="on_the_air_tv"></div>
                        <div className="section__header mb-1">
                            <h1>On The Air TV</h1>
                            <Link to={`/${category.tv}`}>
                                <ButtonOutline className='small flex'>View more </ButtonOutline>
                            </Link>
                        </div>
                        <MovieList category={category.tv} type={tvType.on_the_air} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Home