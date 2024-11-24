import { toast } from "react-toastify";

export const notify = (message: string, type: 'success' | 'error') => {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case 'error':
      toast.error(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    default:
      break;
    }
}