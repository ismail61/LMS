import React from 'react'
const ModalBody = ({changeAdminPassword,inputHandler}) => {
    return (
        <>
            <form style={{ marginTop: '2px' }} onSubmit={(e) => changeAdminPassword(e)}>
                <div class="row px-3">
                    <label class="mb-1">
                        <h6 class="mb-0 text-sm">Password</h6>
                    </label>
                    <input onChange={(e) => inputHandler(e)} class="mb-4" type="password" name="password" required />
                </div>
                <div class="row px-3">
                    <label class="mb-1">
                        <h6 class="mb-0 text-sm">New Password</h6>
                    </label>
                    <input onChange={(e) => inputHandler(e)} class="mb-4" type="password" name="newPassword" required />
                </div>
                <center>
                    <div class="row btn mb-3 px-3">
                        <button type="submit" class="btn btn-custom text-center">Change Password</button>
                    </div>
                </center>
            </form>
        </>
    )
}

export default ModalBody
