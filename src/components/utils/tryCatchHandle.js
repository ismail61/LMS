import { ErrorToast } from '../error/Error'
async function tryCatch(fn) {
    try {
        await fn()
    } catch (error) {
        if (error.response) { 
            ErrorToast(error.response?.data?.err) ;
        }else{
            console.log(error)
            ErrorToast('Something went wrong') ;
        }
    }
};

export { tryCatch }