import React, { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { motion } from 'framer-motion';

export default function Modal({ handleModal }) {
  const [roomId, setroomId] = useState('');
  const [name, setName] = useState();
  const [valid, setValid] = useState(false);

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

  const handleName = (e) => {
    const name = e.target.value;
    setName(name);
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
      <h5>
        Enter Room ID
        <MdCancel onClick={handleModal} />
      </h5>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setroomId(e.target.value)}
      />
      <h5>Enter Your Name</h5>
      <input type="text" onChange={handleName} />
      {!valid ? (
        <>
          <p className="error-msg">Name invalid!!</p>
          <button className="modal-btn modal-btn-deactive">Enter</button>
        </>
      ) : (
        <a href={`/${roomId}/${name}`} className="modal-btn">
          Enter
        </a>
      )}
    </motion.div>
  );
}
