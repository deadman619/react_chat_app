import React, { Component } from 'react';
import Chatlist from '../chatlist/Chatlist';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles';
import Chatview from '../chatview/Chatview';
import Chatbox from '../chatbox/Chatbox';
import Chatroom from '../chatroom/Chatroom';
const firebase = require("firebase");

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			currentChat: null,
			newChatFormVisible: false,
			email: '',
			chats: []
		}
	}

	componentDidMount = () => {
		firebase.auth().onAuthStateChanged(async usr => {
			if (!usr) {
				this.props.history.push('/');
			} else {
				await firebase.firestore().collection('chats').where('users', 'array-contains', usr.email).onSnapshot(async res => {
					const chats = res.docs.map(doc => doc.data());
					await this.setState({
						email: usr.email,
						chats
					});
				});
			}
		})
	}

	newChat = () => {
		this.setState({
			newChatFormVisible: true,
			currentChat: null
		});
	}

	selectChat = async chat => {
		await this.setState({
			currentChat: chat,
			newChatFormVisible: false
		});
		this.messageRead();
	}

	submitMessage = message => {
		const docKey = this.buildDocKey(this.state.chats[this.state.currentChat].users.filter(usr => usr !== this.state.email)[0]);
		firebase.firestore().collection('chats').doc(docKey).update({
			messages: firebase.firestore.FieldValue.arrayUnion({
				sender: this.state.email,
				message,
				timestamp: Date.now()
			}),
			receiverHasRead: false
		});
	}

	messageRead = () => {
		const docKey = this.buildDocKey(this.state.chats[this.state.currentChat].users.filter(usr => usr !== this.state.email)[0]);
		if (this.nonSenderClickedChat(this.state.currentChat)) {
			firebase.firestore().collection('chats').doc(docKey).update({
				receiverHasRead: true
			});
		}
	}

	goToChatroom = async (docKey, message) => {
		const usersInChat = docKey.split(':');
		const chat = this.state.chats.find(chat => usersInChat.every(user => chat.users.includes(user)));
		this.setState({
			newChatFormVisible: false
		});
		await this.selectChat(this.state.chats.indexOf(chat));
		this.submitMessage(message);
	}

	newChatroomSubmit = async chatObject => {
		const docKey = this.buildDocKey(chatObject.sendTo);
		await firebase.firestore().collection('chats').doc(docKey).set({
			users: [this.state.email, chatObject.sendTo],
			messages: [{
				message: chatObject.message,
				sender: this.state.email
			}],
			receiverHasRead: false
		});
		this.setState({
			newChatFormVisible: false
		});
		this.selectChat(this.state.chats.length - 1);
	}

	buildDocKey = friend => [this.state.email, friend].sort().join(':');

	nonSenderClickedChat = chat => this.state.chats[chat].messages[this.state.chats[chat].messages.length - 1].sender !== this.state.email;

	logout = () => firebase.auth().signOut();

	render() {
		const {classes} = this.props;
		return (
			<div>
				<Chatlist 
				newChat={this.newChat} 
				selectChat={this.selectChat} 
				chats={this.state.chats} 
				userEmail={this.state.email} 
				history={this.props.history} 
				currentChatIndex={this.state.currentChat}
				/>
				{
					this.state.newChatFormVisible ? null : <Chatview user={this.state.email} chat={this.state.chats[this.state.currentChat]} />
				}
				{
					this.state.currentChat !== null && !this.state.newChatFormVisible ? 
					<Chatbox messageRead={this.messageRead} submitMessage={this.submitMessage} /> 
					: null
				}
				{
					this.state.newChatFormVisible ? <Chatroom goToChatroom={this.goToChatroom} newChatroomSubmit={this.newChatroomSubmit} /> : null
				}
				<Button onClick={this.logout} className={classes.logoutBtn}>Log Out</Button>
			</div>
		)
	}
}

export default withStyles(styles)(Dashboard);