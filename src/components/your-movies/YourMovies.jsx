import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import useListMovies from '../hooks/useListMovies';
import { actions } from '../../components/hooks/reducer';

import MovieCard from '../movie-card/MovieCard';
import { ButtonOutline } from '../button/Button';
import Loading from '../loading/Loading';

import not_found from '../../assets/not_found.png';
import './YourMovies.scss';

const YourMovies = (props) => {

    const { category } = useParams();

    const [state, dispatch] = useListMovies();

    const [loader, setLoader] = useState(true);

    const [movies, setMovies] = useState([]);
    const [tvs, setTvs] = useState([]);

    const [title, setTitle] = useState('');
    const [headings, setHeadings] = useState([]);



    useEffect(() => {
        switch (category) {
            case 'favorites':
                setTitle('YOUR FAVORITES');
                setHeadings(['Movies Favorites', 'Series Favorites']);
                setMovies(() => [...state.moviesFavories]);
                setTvs(() => [...state.tvFavories]);
                break;
            case 'history':
                setTitle('YOUR HISTORY');
                setHeadings(['Movies History', 'Series History']);
                setMovies(() => [...state.moviesHistory]);
                setTvs(() => [...state.tvHistory]);
                break;
            default:
                return setTitle('EXPLORE');
        }
    }, [category, state]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, []);

    const RemoveMovie = (i) => {
        console.log(i)
        if (category === 'favorites') {
            dispatch(actions.removeMovieFavorites(i))
            console.log(actions.removeMovieFavorites(i))
        } else if (category === 'history') {
            dispatch(actions.removeMovieHistory(i))
        }
    }

    const RemoveTv = (i) => {
        if (category === 'favorites') {
            dispatch(actions.removeTvFavorites(i))
        } else if (category === 'history') {
            dispatch(actions.removeTvHistory(i))
        }
    }

    return (
        <>
            {
                loader && (
                    <Loading />
                )
            }
            <div className="catalog section">
                <div className="page-header">
                    <div className="title"><h1>{title}</h1></div>
                </div>
                <div className='your-movies'>
                    {
                        (movies.length > 0 || tvs.length > 0) ? (
                            <div className="your-movies__container">
                                {
                                    movies.length > 0 && (
                                        <>
                                            {console.log(movies)}
                                            <div className="your-movies__heading">{headings[0]}</div>
                                            <div className="your-movies__content">
                                                {
                                                    movies.map((item, i) => {
                                                        if (item.id) {
                                                            return (
                                                                <div key={i} className="your-movies__content__item">
                                                                    <MovieCard item={item} category='movie' />
                                                                    <ButtonOutline
                                                                        className='your-movies__content__item__btn small'
                                                                        onClick={() => RemoveMovie(i)}
                                                                    >
                                                                        Remove
                                                                    </ButtonOutline>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    tvs.length > 0 && (
                                        <>
                                            <div className="your-movies__heading">{headings[1]}</div>
                                            <div className="your-movies__content">
                                                {
                                                    tvs.map((item, i) => {
                                                        if (item.id) {
                                                            return (
                                                                <div key={i} className="your-movies__content__item">
                                                                    <MovieCard item={item} category='tv' />
                                                                    <ButtonOutline
                                                                        className='your-movies__content__item__btn small'
                                                                        onClick={() => RemoveTv(i)}
                                                                    >
                                                                        Remove
                                                                    </ButtonOutline>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        ) : (
                            <NotMovies />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default YourMovies;

const NotMovies = () => {
    return (
        <div className="no_movies">
            <img src={not_found} alt="" className="no_movies__img" />
            <Link to='/movie'><span className="no_movies__btn">EXPLORE
                <i className='bx bx-right-arrow-alt'></i>
            </span></Link>
        </div>
    )
}