import { toast } from "react-toastify";

const showToastError = (message: string = "Unexpected error") => {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    });
}

export default showToastError;