import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import Loading from '../loading/Loading';
import MovieCard from '../movie-card/MovieCard';
import tmdbApi, { category as cate, movieType, tvType } from '../../api/tmdbApi';
import useGenres from '../hooks/useGenres';

import './MovieGrid.scss';

const MovieGrid = (props) => {

    const { category } = useParams();

    const [title, setTitle] = useState('');
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loader, setLoader] = useState(true);

    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const GenresID = useGenres(selectedGenres)

    useEffect(() => {
        switch (category) {
            case cate.movie:
                return setTitle('TRENDING MOVIES');
            case cate.tv:
                return setTitle('TV SERIES');
            case 'favorites':
                return setTitle('YOUR FAVORITES');
            case 'history':
                return setTitle('YOUR HISTORY');
            default:
                return setTitle('EXPLORE');
        }
    }, [category])

    useEffect(() => {
        const getMovies = async () => {
            let res = null;
            const params = {
                page: page,
                with_genres: GenresID
            };
            switch (category) {
                case cate.tv:
                    res = await tmdbApi.getTvList(tvType.popular, { params });
                    break;
                default:
                    res = await tmdbApi.getMovieList(movieType.popular, { params });
                    break;
            }
            setItems(res.results);
            setTotalPage(res.total_pages)
        }
        getMovies();
        if (items) {
            setTimeout(() => {
                setLoader(false);
            }, 1000);
        }
        window.scrollTo(0, 0);
    }, [category, page, totalPage, selectedGenres])

    useEffect(() => {
        const getGenres = async () => {
            const params = {
                page: page,
            };
            const res = await tmdbApi.genres(category, { params })
            setGenres(res.genres);
        }
        getGenres();
        setSelectedGenres([]);
    }, [category])

    useEffect(() => {
        if (items.length > 0) {
            setTimeout(() => {
                setLoader(false);
            }, 1000);
        }
    }, [])

    const handlePageChange = (e) => {
        setPage((e.selected + 1));
        window.scrollTo(0, 0);
    }

    const addSelectedGenres = (item) => {
        setGenres(prep => [...prep.filter((data) => data.id !== item.id)]);
        setSelectedGenres(prep => [...prep, item]);
    }
    const removeSelectedGenres = (item) => {
        setGenres(prep => [...prep, item]);
        setSelectedGenres(prep => [...prep.filter((data) => data.id !== item.id)]);
    }

    return (
        <div className="catalog section">
            {loader && (
                <Loading />
            )}
            <div className="page-header">
                <div className="title"><h1>{title}</h1></div>
                <div className="genre">
                    {
                        selectedGenres.length > 0 && selectedGenres.map((item, i) => (
                            <span onClick={() => removeSelectedGenres(item)} className="genre__item active" key={i}>
                                {item.name}
                                <i className="bx bx-x"></i>
                            </span>
                        ))
                    }
                    {
                        genres.length > 0 && genres.map((item, i) => (
                            <span onClick={() => addSelectedGenres(item)} className="genre__item" key={i}>
                                {item.name}
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className="movies__grid mb-3">
                {items.length > 0 && items.map((item, i) => (
                    <div className="movies__grid__item" key={i}>
                        <MovieCard category={category} item={item}></MovieCard>
                    </div>
                ))}
            </div>
            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={totalPage}
                marginPagesDisplayed={2} // số trang có thể hiển thị ở đầu và cuối trang
                pageRangeDisplayed={1}  // phạm vi trang
                onPageChange={handlePageChange}  //xử lý khi page thay đổi
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    )
}

export default MovieGrid