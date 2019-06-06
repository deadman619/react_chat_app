import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core';

class Chatview extends Component {
	componentDidUpdate = () => {
		const container = document.getElementById('chatview-container');
		if (container) {
			container.scrollTo(0, container.scrollHeight);
		}
	}

	render() {
		const {classes, chat, user} = this.props;
		let chatWindow, chatHeader;
		if (chat === undefined) {
			chatWindow = <div>Select a chat room or make a new one.</div>;
		} else {
			chatHeader = <div className={classes.chatHeader}>You are having a conversation with {chat.users.filter(usr => usr !== user)[0]}</div>
			chatWindow = chat.messages.map((msg, index) => <div key={index} className={msg.sender === user ? classes.userSent : classes.friendSent}>{msg.message}</div>
			)
		}
		return (
			<div>
				{chatHeader}
				<div id='chatview-container' className={classes.content}>
					{chatWindow}
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Chatview);