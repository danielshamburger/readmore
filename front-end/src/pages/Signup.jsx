import React, { Component } from "react";
import AuthContext from '../context/auth-context';
import { NavLink, Redirect } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.emailElement = React.createRef();
        this.fNameElement = React.createRef();
        this.lNameElement = React.createRef();
        this.passwordElement = React.createRef();
    }
    
    static contextType = AuthContext;

  	submitHandler = (e) => {
		e.preventDefault();

        const email = this.emailElement.current.value;
        const fname = this.fNameElement.current.value;
        const lname = this.lNameElement.current.value;
		const password = this.passwordElement.current.value;
		
		if ( email.length < 1 || password.length < 1 || fname.length < 1 || lname.length < 1 ) {
			return;
		}

		const requestBody = {
            email: email,
            fname: fname,
            lname: lname,
			password: password
		};

		fetch('http://localhost:3001/user/signup', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		}).then((response) => {
			if ( response.status !== 201 ) 
				throw new Error('Error');
			return response.json();
		})
		.then((data) => {
			console.log(data);
			return <Redirect to="/login" />
		})
		.catch(error => {
			console.log(error);
		});
	};

	render() {
		return (
			<React.Fragment>
				<h2 className="page-title">Sign Up</h2>
				<form onSubmit={this.submitHandler}>
					<div className="form-control" >
						<label htmlFor="email">Email</label>
						<input type="email" id="email" ref={this.emailElement} />
					</div>
					<div className="form-control" >
						<label htmlFor="first-name">First Name</label>
						<input type="text" id="first-name" ref={this.fNameElement} />
					</div>
					<div className="form-control" >
						<label htmlFor="last-name">Last Name</label>
						<input type="text" id="last-name" ref={this.lNameElement} />
					</div>
					<div className="form-control">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" ref={this.passwordElement} />
					</div>
					<div className="form-actions">
						<button className="submit btn" type="submit">Sign Up</button>
					</div>
				</form>
				<p className="center medium-grey">Already have an account? <NavLink to="/login">Login</NavLink></p>
			</React.Fragment>
			
		);
	}
}

export default Login;
