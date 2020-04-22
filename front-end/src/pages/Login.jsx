import React, { Component } from "react";
import AuthContext from '../context/auth-context';
import { NavLink, Redirect } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.emailElement = React.createRef();
		this.passwordElement = React.createRef();
	}

	static contextType = AuthContext;

  	submitHandler = (e) => {
		e.preventDefault();

		const email = this.emailElement.current.value;
		const password = this.passwordElement.current.value;
		
		if ( email.length < 1 || password.length < 1 ) {
			return;
		}

		const requestBody = {
			email: email,
			password: password
		};

		fetch('http://localhost:3001/user/login', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		}).then((response) => {
			if ( response.status !== 200 ) 
				throw new Error('Auth failed');
			return response.json();
		})
		.then((data) => {
			console.log(data);
			if ( data.token ) {
				this.context.login(data.token, data.user.userId);
			}
			return <Redirect to="/feed" />
		})
		.catch(error => {
			console.log(error);
		});
	};

	render() {
		return (
			<React.Fragment>
				<h2 className="page-title">Login</h2>
				<form onSubmit={this.submitHandler}>
					<div className="form-control" >
						<label htmlFor="email">Email</label>
						<input type="email" id="email" ref={this.emailElement} />
					</div>
					<div className="form-control">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" ref={this.passwordElement} />
					</div>
					<div className="form-actions">
						<button className="submit btn" type="submit">Login</button>
					</div>
				</form>
				<p className="center medium-grey">Don't have an account yet? <NavLink to="/signup">Sign Up</NavLink></p>
			</React.Fragment>	
		);
	}
}

export default Login;
