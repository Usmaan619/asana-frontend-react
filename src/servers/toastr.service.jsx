import { toast } from "react-toastify";

const config = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const toastSuccess = (msg) => toast.success(msg, config);

export const toastError = (msg) => toast.error(msg, config);

export const toastWarning = (msg) => toast.warning(msg, config);

export const toastInfo = (msg) => toast.info(msg, config);
