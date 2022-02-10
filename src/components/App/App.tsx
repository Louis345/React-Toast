import React from 'react';
import {useState } from 'react';
import { ToastPortal } from '../ToastPortal/ToastPortal';
import styles from './styles.module.css';

export const App = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('');
  const [position, setPosition] = useState(null);
  const [autoClose, setAutoClose] = useState(false);
  const [toastMessage,setToastMessage] = useState<{mode:string,message:string}>({mode:'',message:''});


  return (
    <div className={styles.main}>
      <h1>Portals and Toast</h1>
      <div className={styles.content}>
        <img
          alt="toaster"
          src="/assets/toaster.svg"
          className={styles.toaster}
        />
        <form
          onSubmit={e => {
            e.preventDefault();
            setToastMessage({ mode, message: text }) 
          }}
        >
          <div className={styles.autoClose}>
            <input
              type="checkbox"
              value={autoClose}
              onChange={e => setAutoClose(e.target.checked)}
            />
            <label>Auto Close</label>
          </div>

          <select value={mode} onChange={e => setMode(e.target.value)}>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <select value={position} onChange={e => setPosition(e.target.value)}>
            <option value="topLeft">Top Left</option>
            <option value="center">center</option>
            <option value="topRight">Top Right</option>
          </select>
          
          <input
            type="text"
            value={text}
            placeholder="Toast Value"
            onChange={e => setText(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastPortal autoClose={autoClose}  autoCloseTime={5000} position={position}  message={toastMessage} />
    </div>
  );
};