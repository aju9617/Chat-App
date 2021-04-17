import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { IoIosSend } from 'react-icons/io';

export default function Messenger({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };
  return (
    <form className="messenger" onSubmit={handleSubmit}>
      <input autoFocus onChange={handleInput} value={message} type="text" />
      <motion.button
        whileTap={{
          scale: 0.9,
          transition: { duration: 0.2, type: 'spring', stiffness: 110 },
        }}
        type="submit"
      >
        <IoIosSend />
      </motion.button>
    </form>
  );
}
