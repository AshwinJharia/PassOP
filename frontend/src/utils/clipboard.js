import { toast } from 'react-toastify';

export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};