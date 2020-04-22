import React, { Component } from "react";

class Search extends Component {

    state = {
        users: []
    }

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        fetch('http://localhost:3001/user/list').then((response) => {
			if ( response.status !== 200 ) 
				throw new Error('Auth failed');
			return response.json();
		})
		.then((data) => {
            const users = data.users;
            this.setState({users: users});
		})
		.catch(error => {
			console.log(error);
		});
    }

    followUser = (event) => {
        console.log(`follow user: ${event}`);
    }

	render() {
        const userList = this.state.users.map(user => {
            return (
                <li key={user._id} className="user">{user.fname} {user.lname} {user.email} <button onClick={(e) => this.followUser(user._id, e)}>Follow</button></li>
            );
        });

		return (
            <ul>{userList}</ul>
		);
	}
}

export default Search;
