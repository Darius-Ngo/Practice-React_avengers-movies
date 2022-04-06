import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './Slider.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Button, { ButtonOutline } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';
import Loading from '../loading/Loading';

const Slider = () => {

    SwiperCore.use([Autoplay])

    const [movieItems, setMovieItems] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, { params });
                setMovieItems(response.results.slice(0, 4));
            } catch (error) {
                console.log('error', error);
            }
        }
        getMovies();
        if (movieItems) {
            setTimeout(() => {
                setLoader(false);
            }, 2000)
        }
    }, []);

    useEffect(() => {
        if (movieItems.length > 0) {
            setTimeout(() => {
                setLoader(false);
            }, 1500)
        }
    }, []);

    return (
        <div>
            {loader && (
                <Loading />
            )}
            <div className='slider'>
                <Swiper
                    modules={[Autoplay]}
                    grabCursor={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 3000 }}
                >
                    {movieItems && movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <SliderCard item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {movieItems.map((item, i) => (
                    <TrailerModal key={i} item={item} ></TrailerModal>
                ))}

            </div>
        </div>
    )
}

const SliderCard = props => {

    const item = props.item;

    let navigate = useNavigate();

    const backgroundImage = apiConfig.originnalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const poster = apiConfig.w500Image(item.poster_path ? item.poster_path : item.backdrop_path)

    const [videos, setVideos] = useState([])

    useEffect(() => {

        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category.movie, item.id)
            setVideos(res.results.slice(0, 2))
        }
        getVideos();
    }, [])

    const setModalActive = (i = 0) => {
        const modal = document.querySelector(`#modal__${item.id}`);
        if (videos.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos[i].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No Trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`slider__item ${props.className}`}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="slider__item__content container">
                <div className="slider__item__content__info">
                    <h2 className="title">{item.title || item.original_title}</h2>
                    <div className="release_date">
                        <i className='bx bxs-calendar'></i>
                        <div className="date">{item.release_date}</div>
                    </div>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button
                            onClick={() => navigate('/movie/' + item.id)}
                        >
                            Watch Now
                        </Button>
                        <ButtonOutline
                            onClick={setModalActive}
                        >
                            Watch Trailer
                        </ButtonOutline>
                    </div>
                    <div className="slider__item__content__info__trailer">
                        <h2 className="trailer__title">Trailers</h2>
                        <div className="trailer__videoList">
                            {videos.map((item, i) => (
                                <div key={i} className="video">
                                    <iframe src={`https://www.youtube.com/embed/${item.key}`} frameBorder="0"></iframe>
                                    <div className="video__play" onClick={() => setModalActive(i)}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="slider__item__content__poster">
                    <div className="slider__item__content__poster__img">
                        <img src={poster} alt="poster" />
                        <div className="play__btn">
                            <Button className='circle' onClick={() => navigate('/movie/' + item.id)}><i className='bx bx-play'></i></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef();

    const onClose = () => {
        iframeRef.current.setAttribute('src', '');
    }

    return (
        <Modal
            active={false}
            id={`modal__${item.id}`}
        >
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default Slider