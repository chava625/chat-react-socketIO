import React, { Component } from "react";

class Messages extends Component {
  state = {};
  render() {
    console.log(this.props.username);
    return (
      <div className="messages" ref={this.props.refProp}>
        {this.props.messages.map((message, index) => (
          <div  className={`message ${(this.props.username === message.user ? 'myMessage' : '')}`} key={index}>
            <div className="userName">{message.user}</div>
            <div className="contentMessage">{message.content}</div>
          </div>
        ))}
      </div>
    );
    
  }
}

export default Messages;
