module.exports = ()=>{
    return {
        serverError : (res)=>{
            res.json({
                err: "Server Error"
            })
        },
        resourceError : (res,msg)=>{
            res.json({
                err: msg
            })
        }

    }
}