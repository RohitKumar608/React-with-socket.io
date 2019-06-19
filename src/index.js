import React from 'react';
import ReactDOM from 'react-dom';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
require('dotenv').config();
const socket = io.connect(process.env.REACT_APP_SOCKET_URL);
ReactDOM.render( <SocketProvider socket={socket}><App /> </SocketProvider>, document.getElementById('root'));

serviceWorker.unregister();
