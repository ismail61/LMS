import React from 'react'

const imageInput = (props) => {
    const imageHandlerBook = (event) => {
        props.imageHandler(event)
    }
    return (
        <tr>
            <td>Image:</td>
            <td>
                <input onChange={imageHandlerBook} className="mt-1" accept="image/*" multiple={false} type="file" name="image" size="60"
                    required={props.required} />
            </td>
        </tr>

    )
}

export default imageInput
