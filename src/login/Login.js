import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormControl, Input, InputLabel, Paper, withStyles, CssBaseline, Typography, Button } from '@material-ui/core';
import styles from './styles';
const firebase = require("firebase");

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			loginError: ''
		};
	}

	submitLogin = e => {
		e.preventDefault();
		firebase.auth()
		.signInWithEmailAndPassword(this.state.email, this.state.password)
		.then(() => {
			this.props.history.push('/dashboard');
		}, error => {
			this.setState({loginError: 'Server Error'});
			console.log(error);
		});
	}

	userInput = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	render() {
		const {classes} = this.props;
		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Typography component='h1' variant='h5'>
						Log In!
					</Typography>
					<form onSubmit={this.submitLogin} className={classes.form}>
						<FormControl required fullWidth margin='normal'>
							<InputLabel htmlFor='login-email-input'>Enter Your Email</InputLabel>
							<Input onChange={this.userInput} name='email' autoComplete='email' autoFocus id='login-email-input' value={this.state.email} />
						</FormControl>
						<FormControl required fullWidth margin='normal'>
							<InputLabel htmlFor='login-password-input'>Enter Your Password</InputLabel>
							<Input onChange={this.userInput} name='password' type='password' id='login-password-input' value={this.state.password}  />
						</FormControl>
						<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
					</form>
					{
						this.state.loginError ? 
						<Typography className={classes.errorText} component='h5' variant='h6'>Incorrect Login Credentials</Typography> 
						: null
					}
					<Typography component='h5' variant='h6' className={classes.noAccountHeader}>Don't Have An Account?</Typography>
					<Link className={classes.signupLink} to='/signup'>Sign Up!</Link>
				</Paper>
			</main>
		)
	}
}

export default withStyles(styles)(Login);