import React, { useState, useEffect } from "react";
import { useToastPortal } from "../../hooks/useToastPortal";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import { Toast } from "../Toast/Toast";
import { uuid } from "../../shared/helpers";

interface ToastPortalProps {
  autoClose: boolean;
  autoCloseTime: number;
  position: "topRight" | "topLeft" | "center";
  message: { mode: string; message: string };
  toastStyles?: { [key: string]: string };
}

type ToastPortalState = {
  message: string;
  mode: "success" | "error" | "info";
  id: string;
}[];
export const ToastPortal: React.FC<ToastPortalProps> = ({
  autoClose,
  autoCloseTime,
  position,
  message,
  toastStyles,
  children,
}) => {
  const [toasts, setToasts] = useState<ToastPortalState>([]);

  useEffect(() => {
    if (message.message.length > 0) {
      addMessage(message);
    }
  }, [message.message]);

  const removeToast = (id: string) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    if (toasts.length && autoClose) {
      const id = toasts[toasts.length - 1].id;

      setTimeout(() => {
        setToasts((toasts) => {
          const filteredToasts = toasts.filter((toast) => toast.id !== id);
          return filteredToasts;
        });
      }, autoCloseTime);
    }
  }, [toasts, autoClose, autoCloseTime]);

  const addMessage = (toast: any) => {
    if (Object.keys(toast).length > 1) {
      setToasts([...toasts, { ...toast, id: uuid() }]);
    }
  };

  const { loaded, portalId } = useToastPortal(position);
  return loaded ? (
    ReactDOM.createPortal(
      <div className={styles.toastContainer}>
        {toasts.length > 0 &&
          toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              mode={toast.mode}
              onClose={() => removeToast(toast.id)}
              toastStyles={toastStyles}
            >
              {children}
            </Toast>
          ))}
      </div>,
      document.getElementById(portalId)
    )
  ) : (
    <div>Loading</div>
  );
};
