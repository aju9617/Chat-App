import React from 'react';
import Room from './Room';
import { useParams } from 'react-router-dom';

export default function Chat() {
  const params = useParams();

  return <Room roomID={params.roomID} name={params.name} />;
}
