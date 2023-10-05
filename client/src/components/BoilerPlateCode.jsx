import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function BoilerPlateCode({success,open, data,setToastClosed}) {
  const toastOptions = {
    position: "bottom-right",
    draggable: true,
    theme: "light",
    onClose: () => setToastClosed(),
  };
  const notify = () => toast.success(data, toastOptions)
  const notifyErr = () => toast.error(data, toastOptions);
  useEffect(() => {
    if(open){
       if (success === true) notify();
       else notifyErr()
    }
  }, [open]);

  return (
    <div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default BoilerPlateCode;
