import React, { Component } from 'react';
import { withStyles, TextField } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import styles from './styles';

class Chatbox extends Component {
	constructor() {
		super();
		this.state = {
			chatText: ''
		}
	}

	userInput = e => {
		if (e.keyCode === 13) {
			this.submitMessage();
			this.setState({chatText: ''});
		}
		this.setState({[e.target.name]: e.target.value});
	}

	messageValid = text => text && text.replace(/\s/g, '').length > 0 ? true : false;

	userClicked = e => {
		this.props.messageRead();
	}

	submitMessage = () => {
		if (this.messageValid(this.state.chatText)) {
			this.props.submitMessage(this.state.chatText);
			document.getElementById('chatText').value = '';
		}
	}

	render() {
		const {classes} = this.props;
		return (
			<div className={classes.chatboxContainer}>
				<TextField 
				name='chatText'
				id='chatText'
				placeholder='Type your message...' 
				onKeyUp={this.userInput} 
				className={classes.chatbox} 
				onFocus={this.userClicked} 
				/>
				<Send onClick={this.submitMessage} className={classes.sendBtn} />
			</div>
		)
	}
}

export default withStyles(styles)(Chatbox);