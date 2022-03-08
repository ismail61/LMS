const SignleUser = ({inc,name,email}) => {
    return (
        <>
            <tr className="cell">
                <td data="Index" className='px-md-3'>{inc + 1}</td>
                <td data="Name">{name}</td>
                <td data="Email">{email}</td>
            </tr >
        </>
    )
}

export default SignleUser
