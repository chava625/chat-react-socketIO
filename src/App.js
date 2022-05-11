import './App.css';
import React, { Component } from "react";
import CreateMsg from './components/createMessage';
import Messages from './components/messages';
import socktIOClient from 'socket.io-client';

let socket = null;

class App extends Component{
  constructor(){
    super();
    this.state = {
      username:'',
      messages:[]
  }
  }
  componentDidMount = () =>{
      // if socket = null connect to server
  if(socket === null){
    socket = socktIOClient('http://localhost:4000')
  }
  socket.on('addUsername', (username)=>{
    this.setState({username})
  })
  socket.on('createMessage', (messageObject) => {
    this.setState({
      messages: [...this.state.messages, messageObject]
    });
    this.myRef.current.scrollTop = this.myRef.current.clientHeight;
  });

  this.myRef = React.createRef();

  }
  createMessage =(message)=>{
   message.user = this.state.username;
    socket.emit('sendMessage', message);
  }

  
  render() {
    return (
      <div className="chat">
      <Messages refProp={this.myRef} messages={this.state.messages} username={this.state.username}/>
      <CreateMsg createMessage={this.createMessage} />
    </div>
    );
  }
}

export default App;
