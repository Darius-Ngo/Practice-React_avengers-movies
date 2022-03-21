import React from 'react'

import './Input.scss'

const Input = (props) => {
    return (
        <input
            className={`input ${props.className}`}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            ref={props.ref}
        />
    )
}

export default Input