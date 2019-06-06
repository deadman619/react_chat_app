import React, { Component } from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import styles from './styles';
const firebase = require("firebase");

class Chatroom extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			message: ''
		}
	}

	userInput = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	createChatroom = async e => {
		e.preventDefault();
		const userExists = await this.userExists();
		if (userExists) {
			const chatExists = await this.chatExists();
			chatExists ? this.goToChatroom() : this.createChatroom();
		}
	}

	createChatroom = () => {
		this.props.newChatroomSubmit({
			sendTo: this.state.email,
			message: this.state.message
		});
	}

	goToChatroom = () => this.props.goToChatroom(this.buildDocKey(), this.state.message);

	userExists = async () => {
		const usersSnapshot = await firebase.firestore().collection('users').get();
		const exists = usersSnapshot.docs.map(doc => doc.data().email).includes(this.state.email);
		return exists;
	}

	chatExists = async () => {
		const docKey = this.buildDocKey();
		const chat = await firebase.firestore().collection('chats').doc(docKey).get();
		return chat.exists;
	}

	buildDocKey = () => {
		return [firebase.auth().currentUser.email, this.state.email].sort().join(':');
	}

	render() {
		const {classes} = this.props;
		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Typography component='h1' variant='h5'>Send A Message!</Typography>
					<form onSubmit={this.createChatroom} className={classes.form}>
						<FormControl fullWidth>
							<InputLabel htmlFor='new-chat-email'>Enter Your Friend's Email</InputLabel>
							<Input required name='email' id='new-chat-email' onChange={this.userInput} className={classes.input} autoFocus></Input>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel htmlFor='new-chat-message'>Enter Your Message</InputLabel>
							<Input required name='message' id='new-chat-message' onChange={this.userInput} className={classes.input}></Input>
						</FormControl>
						<Button type='submit' fullWidth className={classes.submit} variant='contained' color='primary'>Submit</Button>
					</form>
				</Paper>
			</main>
		)
	}
}

export default withStyles(styles)(Chatroom);