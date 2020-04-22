import React, { Component } from 'react';
import { Route, Redirect, NavLink, Switch } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Search from './pages/Search';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Newpost from './pages/Newpost';
import AuthContext from './context/auth-context';
import MainNavigation from './components/MainNavigation/MainNavigation';

class App extends Component {

	state = {
		token: null,
		userId: null
	}

	login = (token, userId) => {
		this.setState({token: token, userId: userId});
	};

	logout = () => {
		this.setState({token: null, userId: null});
	};

	render() {
		return (
			<AuthContext.Provider 
				value={{
					token: this.state.token, 
					userId: this.state.userId, 
					login: this.login, 
					logout: this.logout }}>
				<header> 
					<div className="container">
						<div className="header-left">
							<NavLink to="/"><h1 className="site-title">Read<span className="more">More</span></h1></NavLink>
						</div>
						<MainNavigation />
					</div>
				</header>
				<main>
					<div className="container">
						<Switch>
							{ this.state.token && <Redirect from="/" to="/feed" exact />}
							{!this.state.token && <Route path="/" component={Home} exact />}
							{/* {!this.state.token && <Redirect from="/feed" to="/signup" />} */}
							{/* { this.state.token && <Route path="/feed" component={Feed} />} */}
							<Route path="/feed" component={Feed} />
							{!this.state.token && <Redirect from="/search" to="/signup" />}
							{ this.state.token && <Route path="/search" component={Search} />}
							{ this.state.token && <Redirect from="/signup" to="/feed" />}
							{!this.state.token && <Route path="/signup" component={Signup} />}
							{ this.state.token && <Redirect from="/login" to="/feed" />}
							{!this.state.token && <Route path="/login" component={Login} />}
							{!this.state.token && <Redirect from="/new" to="/signup" />}
							{ this.state.token && <Route path="/new" component={Newpost} />}
						</Switch>
					</div>
				</main>
				<footer>
					<div className="container">
						<p>&copy; 2020 Daniel Shamburger &middot; <a href="https://github.com">About</a> </p>
					</div>		
				</footer>
			</AuthContext.Provider>
		);
	}
}

export default App;