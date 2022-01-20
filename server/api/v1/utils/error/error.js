module.exports = ()=>{
    return {
        serverError : (res)=>{
            res.status(500).json({
                err: "Server Error"
            })
        },
        resourceError : (res,msg,statusCode)=>{
            res.status(statusCode).json({
                err: msg
            })
        }

    }
}