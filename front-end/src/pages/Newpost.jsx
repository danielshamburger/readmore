import React, { Component } from "react";
import AuthContext from '../context/auth-context';
import { Redirect } from 'react-router-dom';

class Newpost extends Component {
	constructor(props) {
		super(props);
		this.isbnElement = React.createRef();
        this.descriptionElement = React.createRef();
        this.ratingElement = React.createRef();
	}
        
    static contextType = AuthContext;

  	submitHandler = (e) => {
        e.preventDefault();
        
        const isbn = this.isbnElement.current.value;
        const description = this.descriptionElement.current.value;
        const rating = this.ratingElement.current.value;

		if ( isbn.length < 1 || description.length < 1 || rating.length < 1 ) {
			return;
		}

		const requestBody = {
            token: this.context.token,
            user: this.context.userId,
            isbn: isbn,
            description: description,
            rating: rating
		};

        console.log(requestBody);

		fetch('http://localhost:3001/posts/', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			},
		}).then((response) => {
			if ( response.status !== 201 ) 
				throw new Error('Error');
			return response.json();
		})
		.then((data) => {
			console.log(data);
			return <Redirect to="/feed" />
		})
		.catch(error => {
			console.log(error);
		});
	};

	render() {
		return (
			<React.Fragment>
				<h2 className="page-title">New Review</h2>
				<form onSubmit={this.submitHandler}>
					<div className="form-control" >
						<label htmlFor="isbn">ISBN</label>
						<input type="text" id="isbn" ref={this.isbnElement} />
					</div>
					<div className="form-control" >
						<label htmlFor="description">Description</label>
						<textarea id="description" ref={this.descriptionElement} />
					</div>
					<div className="form-control">
						<label htmlFor="rating">Rating</label>
						<select id="rating" name="rating" ref={this.ratingElement}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>
					</div>
					<div className="form-actions">
						<button className="submit btn" type="submit">Post</button>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default Newpost;
