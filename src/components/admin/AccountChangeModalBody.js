import React from 'react'
const ModalBody = ({ admin, updateAdminInformation, inputHandler }) => {
    return (
        <>
            <form style={{ marginTop: '2px' }} onSubmit={(e) => updateAdminInformation(e)}>
                <div className="row px-3">
                    <label className="mb-1">
                        <h6 className="mb-0 text-sm">Name</h6>
                    </label>
                    <input value={admin.name} onChange={(e) => inputHandler(e)} className="mb-4" type="text" name="name" required />
                </div>
                <div className="row px-3">
                    <label className="mb-1">
                        <h6 className="mb-0 text-sm">Email</h6>
                    </label>
                    <input value={admin.email} className="mb-4" type="text" name="email" disabled />
                </div>
                <div className="row px-3">
                    <label className="mb-1 d-flex justify-content-between">
                        <h6 className="mb-0 text-sm">Description</h6>
                    </label>
                    <textarea onChange={inputHandler} type="text" name="description" maxLength="150">{admin.description ? admin.description : ''}</textarea>
                </div>
                <img height="50px" width="50px" className="img-fluid ml-5" src={admin.image ? admin.image : '/images/avatar.png'} alt="Profile" />
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
