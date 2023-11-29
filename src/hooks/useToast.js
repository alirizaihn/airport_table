import { toast } from 'react-toastify';

export const useToast = () => {
  const toastError = (message) => {
    if (!message || message.length < 3) return;
    toast.error(`${message} 🥺`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toastInfo = (message) => {
    if (!message || message.length < 3) return;

    toast.info(`${message} 👁`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toastSuccess = (message) => {
    if (!message || message.length < 3) return;
    toast.success(`${message} 👌`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return {
    toast,
    toastError,
    toastInfo,
    toastSuccess,
  };
};
