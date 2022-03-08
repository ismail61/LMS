import React from 'react'

const Search = (props) => {
    return (
        <>
            <div className="container mt-3">
                <center>
                    <div style={{ width: '300px' }} className="input-group">
                        <input onChange={props.searchHandler} type="text" id="search" className="form-control" placeholder="Search Here" />
                    </div>
                </center>
            </div>
        </>
    )
}

export default Search
