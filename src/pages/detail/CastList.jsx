import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const CastList = (props) => {
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const getCast = async () => {
            const res = await tmdbApi.credits(props.category, props.id)
            setCast(res.cast.slice(0, 10));
        }
        getCast();
    }, [props.id, props.category]);

    return (
        <Swiper
            grabCursor={true}
            spaceBetween={10}
            slidesPerView={'auto'}
        >
            {
                cast.map((item, i) => {
                    if (item.profile_path) {
                        return (
                            <SwiperSlide key={i}>
                                <div className="cast__item">
                                    <img src={apiConfig.w500Image(item.profile_path)} alt="" className="cast__item__img" />
                                    <span>
                                        {item.name}
                                    </span>
                                </div>
                            </SwiperSlide>
                        )
                    }
                })
            }
        </Swiper>
    )
}

export default CastList;