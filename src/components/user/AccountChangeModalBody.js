import React from 'react'
const ModalBody = ({ inputHandler, user, updateUserInformation }) => {
    return (
        <>
            <form style={{ marginTop: '2px' }} onSubmit={(e) => updateUserInformation(e)}>
                <div className="row px-3">
                    <label className="mb-1">
                        <h6 className="mb-0 text-sm">Name</h6>
                    </label>
                    <input value={user.name} onChange={(e)=>inputHandler(e)} className="mb-4" type="text" name="name" required />
                </div>
                <div className="row px-3">
                    <label className="mb-1">
                        <h6 className="mb-0 text-sm">Email</h6>
                    </label>
                    <input value={user.email} className="mb-4" type="text" name="email" disabled />
                </div>
                <div className="row px-3">
                    <label className="mb-1 d-flex justify-content-between">
                        <h6 className="mb-0 text-sm">Description</h6>
                        {/*                                    <h6 className="mb-0 text-sm" id="count"></h6> */}
                    </label>
                    <textarea onChange={(e)=>inputHandler(e)} type="text" name="description" maxLength="150">{user.description ? user.description : ''}</textarea>
                </div>
                {/* <div className="row px-3">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Image</h6>
                                </label>
                                <input id="image" type="file" name="image" />
                            </div> */}
                <img height="50px" width="50px" className="img-fluid ml-5" src={user.image ? user.image : '/images/avatar.png'} alt="Profile" />
                <center>
                    <div className="row btn mb-3 px-3">
                        <button type="submit" id="update" className="btn btn-custom text-center">Update Now</button>
                    </div>
                </center>
            </form>
        </>
    )
}

export default ModalBody
