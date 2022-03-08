import React from 'react'

const input = (props) => {
    const inputHandlerBook = (event) => {
        props.inputHandler(event)
    }
    return (
        <div className="px-3">
            <div className='col-md-12'>
                <label className="mb-1">
                    <h6 className="mb-0 text-sm">{props.label}</h6>
                </label>
                <input onChange={inputHandlerBook} className="mb-4" type="text" name={props.name} value={props.admin}
                    required />
            </div>
        </div>
    )
}

export default input
