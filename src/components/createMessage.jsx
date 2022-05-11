import React, { Component } from "react";

class CreateMsg extends Component {
    state = {
          messageContent: ''
      }
  changeMsgContent =(event)=>{
      this.setState({
        messageContent: event.target.value
      })
  }

  submitMessage =(event)=>{
      event.preventDefault();

      const message = {
          content: this.state.messageContent
      }
      this.setState({
        messageContent: ''
      })
      this.props.createMessage(message)
  }

  render() {
    return (
      <form className="createMessage" onSubmit={this.submitMessage} >
        <input type="text" value={this.state.messageContent} onChange={this.changeMsgContent} placeholder="Enter Message"/>
        <input type="submit" value="SEND" />
      </form>
    );
  }
  
}

export default CreateMsg;
