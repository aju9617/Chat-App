import React, { useRef, useEffect } from 'react';

import ChatCard from './ChatCard';

export default function Receiver({ data }) {
  const chatRef = useRef();

  useEffect(() => {
    if (chatRef.current.lastElementChild) {
      const lastElement = 150;
      const visibleHeight = chatRef.current.offsetHeight;
      const containerHeight = chatRef.current.scrollHeight;
      const scrollOffset = chatRef.current.scrollTop + visibleHeight;
      // console.log(visibleHeight, containerHeight, scrollOffset, lastElement);
      if (containerHeight - lastElement <= scrollOffset) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  });

  const handleChatRender = () => {
    return data.map((curr) => {
      if (curr.type === 'received') {
        return (
          <ChatCard
            message={curr.message}
            key={`${curr.type}--${curr.key}`}
            type="received"
            sender={curr.sender}
          />
        );
      }
      if (curr.type === 'sent') {
        return (
          <ChatCard
            message={curr.message}
            key={`${curr.type}--${curr.key}`}
            // sender={curr.sender}
            type="sent"
          />
        );
      }

      return (
        <ChatCard
          message={curr.message}
          key={`${curr.type}--${curr.key}`}
          type="notice"
        />
      );
    });
  };

  return (
    <div ref={chatRef} className="chat-container">
      {handleChatRender()}
    </div>
  );
}
