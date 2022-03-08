import React from 'react'

const BookCard = ({book,orderHandler}) => {
    return (
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div className="card">
                    <a className="img-card">
                        <img src={book.image} />
                    </a>
                    <div className="card-content">
                        <h4 className="card-title">   
                                {book.title}
                        </h4>
                        <p>
                            Edition : <b>{book.edition}</b>
                        </p>
                        <div style={{float : 'right'}}>
                            Written By : {book.author}
                        </div>
                    </div>
                    <div className="footer mt-5">
                        <div className="d-flex justify-content-between align-items-center">
                        <div className={book?.quantity?'text-success':'text-danger'} style={{fontSize : '19px'}}>{book?.quantity?'Available':"UnAvailable"}</div>
                            <button disabled={(book?.quantity)?false:true} type="button" onClick ={()=>orderHandler(book._id)} className="btn btn-success">Order Now</button>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}

export default BookCard
