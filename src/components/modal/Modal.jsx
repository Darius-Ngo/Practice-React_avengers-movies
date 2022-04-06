import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import './Modal.scss';

const Modal = props => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active])

    return (
        <div
            id={props.id}
            className={`modal ${active ? 'active' : ''} ${props.className ? props.className : ''}`}
        >
            {props.children}
        </div>
    )
}

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}

export const ModalContent = props => {

    const modalContentRef = useRef(null);

    const closeModal = () => {
        modalContentRef.current.parentElement.classList.remove('active');
        if (props.onClose) {
            props.onClose();
        }
    }

    return (
        <div ref={modalContentRef} className="modal__content">
            <div className="modal__content__close" onClick={closeModal}>
                <i className='bx bx-x'></i>
            </div>
            {props.children}
        </div>
    )
}

export default Modal