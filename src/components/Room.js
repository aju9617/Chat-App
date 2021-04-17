import React from 'react';
import Updater from './Updater';
import socketIoClient from 'socket.io-client';
import Messenger from './Messenger';

let ENDPOINT;
if (process.env.NODE_ENV === 'development') {
  ENDPOINT = process.env.REACT_APP_API_DEV;
} else ENDPOINT = process.env.REACT_APP_API_PROD;
const socket = socketIoClient(ENDPOINT);

let data = [];
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.roomID = this.props.roomID.trim().toLocaleLowerCase();
    this.name = this.props.name;
    this.state = {
      isThereUpdate: false,
    };
  }

  updateScroll() {}

  componentDidMount() {
    socket.emit('create', this.roomID, this.name);

    socket.on('toClient', (message, sender) => {
      data.push({ type: 'received', message, sender, key: Date.now() });
      this.setState({ isThereUpdate: !this.state.isThereUpdate });
    });

    socket.on('user-joined', (name) => {
      data.push({ type: 'notice', message: `${name} joined`, key: Date.now() });
      this.setState({ isThereUpdate: !this.state.isThereUpdate });
    });

    socket.on('user-left', (name) => {
      data.push({ type: 'notice', message: `${name} left`, key: Date.now() });
      this.setState({ isThereUpdate: !this.state.isThereUpdate });
    });
  }
  componentWillUnmount() {
    socket.emit('i-m-leaving', this.roomID, this.name);
  }
  sendMessage = (message) => {
    if (message) {
      socket.emit('toServer', message, this.roomID, this.name);
      data.push({ type: 'sent', message, sender: this.name, key: Date.now() });
    }
    this.setState({
      isThereUpdate: !this.state.isThereUpdate,
    });
  };

  render() {
    return (
      <>
        <Updater data={data} />
        <Messenger sendMessage={this.sendMessage} />
        <p className="notice-footer">
          Send this Room ID <span>{this.roomID}</span> with your friends and
          invite them into Group.
        </p>
        <h5 className="notice">Created by Ajju :)</h5>
      </>
    );
  }
}
