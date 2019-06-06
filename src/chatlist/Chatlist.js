import React, { Component } from 'react';
import { withStyles, Avatar, Divider, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, ListItemIcon } from '@material-ui/core';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import styles from './styles';

class Chatlist extends Component {
	newChat = () => {
		this.props.newChat();
	}

	selectChat = index => {
		this.props.selectChat(index);
	}

	userIsSender = chat => {
		return chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
	}

	render() {
		const {classes} = this.props;
		let listItems = this.props.chats.map((chat, index) => {
			return (
				<div key={index}>
					<ListItem 
					onClick={() => this.selectChat(index)} 
					className={classes.listItem} 
					selected={this.props.currentChatIndex === index} 
					alignItems='flex-start'
					>
						<ListItemAvatar>
							<Avatar alt='avatar'>{chat.users.filter(user => user !== this.props.userEmail)[0].split('')[0]}</Avatar>
						</ListItemAvatar>
						<ListItemText 
						primary={chat.users.filter(user => user !== this.props.userEmail)[0]} 
						secondary={
							<React.Fragment>
								<Typography component='span' color='textPrimary'>
									{
										chat.messages[chat.messages.length - 1].message.substring(0, 30)
									}
								</Typography>
							</React.Fragment>
						}>	
						</ListItemText>
						{
							chat.receiverHasRead === false && !this.userIsSender(chat) ? 
							<ListItemIcon> 
								<NotificationImportant className={classes.unreadMessage} />
							</ListItemIcon>
							: null
						}
					</ListItem>
					<Divider />
				</div>
			)
		});
		return (
			<main className={classes.root}>
				<Button onClick={this.newChat} variant='contained' fullWidth color='primary' className={classes.newChatBtn}>New Chat</Button>
				<List>
					{
						listItems
					}
				</List>
			</main>
		)
	}
}

export default withStyles(styles)(Chatlist);