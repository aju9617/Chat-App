import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import shortid from 'shortid';
import Logo from './../assests/logo.png';
import JoinRoomModal from './JoinRoomModal';
import CreateRoomModal from './CreateRoomModal';

export default function Home() {
  const modal = useRef();

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleJoinModal = () => {
    setShowCreateModal(false);
    setShowJoinModal(!showJoinModal);
  };

  useEffect(() => {
    console.log('Mounted');
  }, []);
  return (
    <div className="home" ref={modal}>
      <img src={Logo} alt="chatzz" />
      <p>Chatzz</p>
      <AnimatePresence>
        {showJoinModal && (
          <JoinRoomModal path="/create-room" handleModal={handleJoinModal} />
        )}
        {showCreateModal && (
          <CreateRoomModal roomID={shortid.generate().toLocaleLowerCase()} />
        )}
      </AnimatePresence>
      <div className="home-route">
        <button
          onClick={() => {
            setShowJoinModal(false);
            setShowCreateModal(!showCreateModal);
          }}
          className="btn"
        >
          Create Room
        </button>
        <button onClick={handleJoinModal} className="btn">
          Join Room
        </button>
      </div>
      <h5 className="notice">Created by Ajju :)</h5>
    </div>
  );
}
