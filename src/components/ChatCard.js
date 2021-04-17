import React from 'react';
import { motion } from 'framer-motion';

export default function Received({ message, type, sender }) {
  const containerVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        stiffness: 150,
      },
    },
  };
  if (type === 'notice') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${type} message`}
      >
        <p>{`${message}`}</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${type} message`}
      >
        <p>{`${message}`}</p>
        {sender ? <p className={`author-${type}`}>{sender}</p> : null}
      </motion.div>
    </>
  );
}
