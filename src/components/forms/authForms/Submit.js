import React from 'react'

const Submit = ({value}) => {
    return (
        <tr>
            <td></td>
            <td>
                <center><input className="mx-3 btn btn-custom" type="submit" value={value} /></center>
            </td>
        </tr>
    )
}

export default Submit
