import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Modal({ roomID }) {
  const idContainer = useRef();
  const [status, setStatus] = useState('Copy ID');
  const [admin, setAdmin] = useState('');
  const [valid, setValid] = useState(false);
  const handleCopy = () => {
    const text = idContainer.current.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setStatus('Copied!!');
        setTimeout(() => {
          setStatus('copy');
        }, 5000);
        console.log('copied to clipboard');
      })
      .catch(() => {
        console.log('some error occured while copying ID to clipboard');
      });
  };
  const containerVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
    },
    exit: {
      scale: 0,
      opacity: 0,
    },
  };
  const handleAdminName = (e) => {
    const name = e.target.value;
    setAdmin(name);
    const format = '*|,":<>[]{}=`\'-+/;()@&$#%';

    for (let i = 0; i < format.length; i++) {
      if (name.includes(format[i])) {
        setValid(false);
        return;
      }
    }
    setValid(true);
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modal"
    >
      <h5>Share Room ID with your friends!!</h5>
      <h4 ref={idContainer}>{roomID}</h4>
      <h5>Enter your name:</h5>

      <input type="text" value={admin} onChange={handleAdminName} />
      <div>
        {!valid ? (
          <>
            <p className="error-msg">Name invalid!!</p>

            <button className="modal-btn modal-btn-deactive">Enter</button>
          </>
        ) : (
          <a href={`/${roomID}/${admin}`} className="modal-btn">
            Enter
          </a>
        )}
        <button className="modal-btn" onClick={handleCopy}>
          {status}
        </button>
      </div>
      <p className="attention">*Room ID is case-sensitive</p>
    </motion.div>
  );
}
