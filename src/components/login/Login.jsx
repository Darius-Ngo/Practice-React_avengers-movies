import React, { useEffect } from 'react';

import Modal from '../modal/Modal';

import './Login.scss';

const Login = (props) => {

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    useEffect(() => {
        const tabs = $$('.modal__login__tabs__item');
        const line = $('.modal__login__tabs__line');
        const tabActive = $('.modal__login__tabs__item.active');
        const panes = $$('.modal__login__content__pane');
        line.style.left = tabActive.offsetLeft + 'px';
        line.style.width = tabActive.offsetWidth + 'px';

        tabs.forEach((tab, i) => {
            const pane = panes[i];
            tab.addEventListener('click', () => {
                const tabActive = $('.modal__login__tabs__item.active');
                const paneActive = $('.modal__login__content__pane.active');
                tabActive.classList.remove('active');
                paneActive.classList.remove('active');
                tab.classList.add('active');
                pane.classList.add('active');
                line.style.left = tab.offsetLeft + 'px';
                line.style.width = tab.offsetWidth + 'px';
            })
        });

        return () => {
            tabs.forEach((tab, i) => {
                const pane = panes[i];
                tab.removeEventListener('click', () => {
                    const tabActive = $('.modal__login__tabs__item.active');
                    const paneActive = $('.modal__login__content__pane.active');
                    tabActive.classList.remove('active');
                    paneActive.classList.remove('active');
                    tab.classList.add('active');
                    pane.classList.add('active');
                    line.style.left = tab.offsetLeft + 'px';
                    line.style.width = tab.offsetWidth + 'px';
                })
            });
        }
    }, [])

    const handedClosed = () => {
        const modalActived = $('.modal__login.active');
        modalActived.classList.remove('active');
    }

    return (
        <Modal active={props.active} className={`modal__login ${props.className ? props.className : ''}`}>
            <div className="modal__login__container">
                <i className='bx bx-x close-button' onClick={handedClosed}></i>
                <div className="modal__login__tabs">
                    <div className="modal__login__tabs__item active" >
                        LOGIN
                    </div>
                    <div className="modal__login__tabs__item" >
                        REGISTER
                    </div>
                    <div className="modal__login__tabs__line"></div>
                </div>
                <div className="modal__login__content">
                    <div className="modal__login__content__pane active">
                        <div className="input-box">
                            <input id='username' type="text" required />
                            <label htmlFor="username">UserName</label>
                        </div>
                        <div className="input-box">
                            <input id='password' type="password" required />
                            <label htmlFor="password">Password</label>
                            <i className='bx bx-low-vision'></i>
                        </div>
                        <button className="submit-button">LOGIN</button>
                    </div>
                    <div className="modal__login__content__pane">
                        <div className="input-box">
                            <input id='username' type="text" required />
                            <label htmlFor="username">UserName</label>
                        </div>
                        <div className="input-box">
                            <input id='password' type="password" required />
                            <label htmlFor="password">Password</label>
                            <i className='bx bx-low-vision'></i>
                        </div>
                        <div className="input-box">
                            <input id='password' type="password" required />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <i className='bx bx-low-vision'></i>
                        </div>
                        <button className="submit-button">REGISTER</button>
                    </div>
                    <div className="modal__login__footer">
                        <div className="modal__login__footer__line">
                            <span>or</span>
                        </div>
                        <div className="modal__login__footer__option facebook">
                            <i className='bx bxl-facebook-circle'></i>
                            <span>Login width Facebook</span>
                        </div>
                        <div className="modal__login__footer__option google">
                            <i className='bx bxl-google'></i>
                            <span>Login width Google</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Login