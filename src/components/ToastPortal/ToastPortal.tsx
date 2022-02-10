import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { useToastPortal } from '../../hooks/useToastPortal';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { Toast } from '../Toast/Toast';
import { uuid } from '../../shared/helpers';


interface ToastPortalProps {
 autoClose: boolean;
  autoCloseTime: number;
  position: 'topRight' | 'topLeft' | 'center';
  ref: React.Ref<any>;
  message: string;
}


export const ToastPortal:React.FC<ToastPortalProps> = forwardRef(({ autoClose, autoCloseTime,position }, ref) => {
    const [toasts, setToasts] = useState([]);

    


    const removeToast = (id) => {
        setToasts(toasts.filter(toast => toast.id !== id));
    }

    useEffect(() => {
        if (toasts.length && autoClose) {
            const id = toasts[toasts.length - 1].id;

            setTimeout(() => {
                setToasts((toasts) => {
                    const filteredToasts = toasts.filter(toast => toast.id !== id);
                    return filteredToasts;
                })
            }, autoCloseTime);
        }
        
    }, [toasts, autoClose, autoCloseTime])

    const addMessage = (toast) => {
        if (toast) {
            setToasts([...toasts, { ...toast, id: uuid() }]);
        }

    }

    useImperativeHandle(ref, () => ({
        addMessage(toast) {
            addMessage(toast);
            setToasts([...toasts, { ...toast, id: uuid() }]);
        }
    }));
   
    const { loaded, portalId } = useToastPortal(position);
    return loaded ? ReactDOM.createPortal(
        <div className={styles.toastContainer}>
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    mode={toast.mode}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>,
        document.getElementById(portalId)
    ) : (
        <div>Loading</div>
    );
});

