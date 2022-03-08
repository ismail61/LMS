import { toast } from 'react-toastify'
const options = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    toastId: '1234',
}
const ErrorToast = (msg) => {
    toast.error(msg, options);
}
const SuccessToast = (msg) => {
    toast.success(msg, options);
}
export { ErrorToast, SuccessToast }
