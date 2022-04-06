import React, { useEffect, useState } from 'react';

import './Loading.scss';

const Loading = (props) => {

    const [items, setItems] = useState([])

    useEffect(() => {
        for (let i = 1; i <= 20; i++) {
            setItems((prep) => ([...prep, i]));
        }
    }, [])

    const styleItem = (i) => {
        const deg = 18 * i;

        return {
            transform: 'rotate(' + deg + 'deg)'
        }
    }

    const styleDot = (i) => {
        const timeDL = 0.1 * i;

        return {
            'animationDelay': timeDL + 's'
        }
    }

    return (
        <section className={`loading-container ${props.className}`}>
            <div className="loading__content">
                {items.map((item, i) => (
                    <span key={i} className="loading__content__item" style={styleItem(item)}>
                        <span className="loading__content__item__dot" style={styleDot(item)}></span>
                    </span>
                ))}
            </div>
        </section >
    )
}

export default Loading