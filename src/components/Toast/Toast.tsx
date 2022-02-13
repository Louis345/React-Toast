import React, { useMemo } from "react";
import styles from "./style.module.css";

interface ToastProps {
  message: string;
  onClose: () => void;
  mode: "success" | "error" | "info" | "error";
  toastStyles: { [key: string]: string };
}

export const Toast: React.FC<ToastProps> = ({
  mode,
  onClose,
  message,
  toastStyles,
  children,
}) => {
  const classes = useMemo(() => [styles.toast, styles[mode]].join(" "), [mode]);
  return (
    <div className={classes} onClick={onClose} style={toastStyles}>
      {children || <div className={styles.message}>{message}</div>}
    </div>
  );
};
