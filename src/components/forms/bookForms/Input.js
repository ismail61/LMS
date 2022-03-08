import React from 'react'

const input = (props) => {
    const inputHandlerBook = (event) => {
        props.inputHandler(event)
    }
    return (
        <tr>
            <td>{props.label}:</td>
            <td>
                <input onChange={inputHandlerBook} className="mt-1" placeholder={props.placeholder} value={props.book} type="text" name={props.name} size="60" required />
            </td>
        </tr>
    )
}

export default input
