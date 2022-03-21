import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import './SideBar.scss';

import logoClose from '../../assets/logo-small.png';
import logo from '../../assets/logo.png';

const SideBar = () => {

    const NavList = [
        {
            icon: 'bx bxs-home',
            name: 'Home',
            path: '/',
            arrowDown: false,
            onClick: function (e) { showMenu(e) },
            subMenu: []
        },
        {
            icon: 'bx bx-movie-play',
            name: 'Movies',
            path: '/movie',
            arrowDown: true,
            onClick: function (e) { showMenu(e) },
            subMenu: [
                {
                    name: 'Popular',
                    path: '/#popular_movie'
                },
                {
                    name: 'Upcoming',
                    path: '/#upcoming_movie'
                },
                {
                    name: 'Top Rated',
                    path: '/#top_movie'
                }
            ]
        },
        {
            icon: 'bx bx-film',
            name: 'Tv Series',
            path: '/tv',
            arrowDown: true,
            onClick: function (e) { showMenu(e) },
            subMenu: [
                {
                    name: 'Popular',
                    path: '/#popular_tv'
                },
                {
                    name: 'On the Air',
                    path: '/#on_the_air_tv'
                },
                {
                    name: 'Top Rated',
                    path: '/#top_tv'
                }
            ]
        },
        {
            icon: 'bx bx-list-check',
            name: 'Favorites',
            path: '/favorites',
            arrowDown: false,
            onClick: function (e) { showMenu(e) },
            subMenu: []
        },
        {
            icon: 'bx bx-history',
            name: 'History',
            path: '/history',
            arrowDown: false,
            onClick: function (e) { showMenu(e) },
            subMenu: []
        }
    ]

    const { pathname } = useLocation();

    const IndexActive = NavList.findIndex(e => e.path === pathname)

    const [keyword, setKeyword] = useState('');

    const headerRef = useRef();

    const sideBar = useRef();

    const inputRef = useRef();

    const showSidebar = (e) => {
        e.target.classList.toggle('active');
        sideBar.current.classList.toggle('close');
    }

    const showMenu = (e) => {
        e.target.classList.toggle('active');
        const navActive = e.target.parentElement.parentElement;
        navActive.classList.toggle('showMenu');
    }

    const showInput = () => {
        inputRef.current.classList.toggle('active');
        inputRef.current.focus();
    }

    const closeSideBar = (e) => {
        sideBar.current.classList.add('close');
    }

    const navigate = useNavigate();

    const { category } = useParams();

    const gotoSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            navigate(`${category ? `/${category}` : ''}/search/${keyword}`);
        }
    }, [keyword, category, navigate]);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        }
    }, [])

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                gotoSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);

        return () => {
            document.removeEventListener('keyup', enterEvent);
        }
    }, [keyword, navigate])
    return (
        <>
            <div ref={sideBar} className="sidebar close">
                <div className="sidebar__logo">
                    <Link to='/'>
                        <img src={logo} alt="logo" className="logo" />
                        <img src={logoClose} alt="logo" className="logo-close" />
                    </Link>
                </div>

                <ul className="sidebar__nav">
                    {
                        NavList.map((item, i) => (
                            <li key={i} className={`sidebar__nav__item ${(i === IndexActive) ? 'active' : ''}`}>
                                <div className="sidebar__nav__item__detail">
                                    <Link to={item.path} onClick={closeSideBar}>
                                        <i className={item.icon}></i>
                                        <span className="sidebar__nav__item__detail__name">{item.name}</span>
                                    </Link>
                                    {item.arrowDown && (
                                        <i onClick={item.onClick} className='bx bx-chevron-down arrow'></i>
                                    )}
                                </div>
                                <ul className="sub-menu">
                                    <li className="sub-menu__header">
                                        <Link to={item.path}>{item.name}</Link>
                                    </li>
                                    {item.subMenu && item.subMenu.map((item, i) => (
                                        <li key={i} onClick={closeSideBar}>
                                            <a href={item.path}>{item.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div ref={headerRef} className="section header">
                <div className="header__logo">
                    <i onClick={(e) => showSidebar(e)} className='bx bx-menu-alt-left'></i>
                    <img src={logo} alt="" />
                </div>
                <input
                    className='header__search'
                    placeholder='Enter search ...'
                    type='search'
                    ref={inputRef}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="header__options">
                    <div className="header__options__search">
                        <i onClick={showInput} className='bx bx-search-alt-2'></i>
                    </div>
                    <div className="header__options__login">
                        <i className='bx bxs-user'></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar