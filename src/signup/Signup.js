import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormControl, Input, InputLabel, Paper, withStyles, CssBaseline, Typography, Button } from '@material-ui/core';
import styles from './styles';
const firebase = require("firebase");

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			passwordConfirmation: '',
			signupError: ''
		};
	}

	submitSignup = e => {
		e.preventDefault();
		if (!this.formValidation()) {
			this.setState({signupError: 'Passwords do not match!'});
			return;
		}
		firebase.auth()
		.createUserWithEmailAndPassword(this.state.email, this.state.password)
		.then(authRes => {
			const userObj = {
				email: authRes.user.email
			};
			firebase.firestore()
			.collection('users')
			.doc(this.state.email)
			.set(userObj)
			.then(() => {
				this.props.history.push('/dashboard')
			}, dbError => {
				this.setState({signupError: dbError.message});
			})
		}, authError => {
			this.setState({signupError: authError.message});
		})
	}

	userInput = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	formValidation = () => this.state.password === this.state.passwordConfirmation;

	render() {
		const {classes} = this.props;
		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Typography component='h1' variant='h5'>Sign Up!</Typography>
					<form onSubmit={this.submitSignup} className={classes.form}>
						<FormControl required fullWidth margin='normal'>
							<InputLabel htmlFor='signup-email-input'>Enter Your Email</InputLabel>
							<Input onChange={this.userInput} name='email' autoComplete='email' autoFocus id='signup-email-input' value={this.state.email} />
						</FormControl>
						<FormControl required fullWidth margin='normal'>
							<InputLabel htmlFor='signup-password-input'>Create Your Password</InputLabel>
							<Input onChange={this.userInput} name='password' type='password' id='signup-password-input' value={this.state.password}  />
						</FormControl>
						<FormControl required fullWidth margin='normal'>
							<InputLabel htmlFor='signup-password-confirmation-input'>Confirm Your Password</InputLabel>
							<Input onChange={this.userInput} name='passwordConfirmation' type='password' id='signup-password-confirmation-input' value={this.state.passwordConfirmation} />
						</FormControl>
						<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
					</form>
					{
						this.state.signupError ? 
						<Typography className={classes.errorText} component='h5' variant='h6'>{this.state.signupError}</Typography> 
						: null
					}
					<Typography component='h5' variant='h6' className={classes.hasAccountHeader}>Already Have An Account?</Typography>
					<Link className={classes.loginLink} to='/'>Log In!</Link>
				</Paper>
			</main>
		)
	}
}

export default withStyles(styles)(Signup);