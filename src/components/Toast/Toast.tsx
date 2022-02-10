import React,{useMemo} from 'react';
import styles from './style.module.css';


interface ToastProps {
    message: string;
    onClose: () => void;
    mode: 'success' | 'error' | 'info';
}

export const Toast:React.FC<ToastProps> = ({ mode, onClose, message }) => {

    const classes = useMemo(() => [styles.toast, styles[mode]].join(' '), [mode]);
    return (
        <div className={classes} onClick={onClose}>
            <div className={styles.message}>{message}</div>
        </div>
    )
}