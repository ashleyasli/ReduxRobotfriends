import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
/*import {robots} from './robots';*/
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import {setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error		
	}
}

const mapDispacthToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: []
		}
	}

	componentDidMount() {
		/*console.log(this.props.store.getState())*/
		fetch('https://jsonplaceholder.typicode.com/users')
		.then( response => response.json())
		.then(users => this.setState({robots: users}));
		
	}
	
	render() {
		const {robots} =this.state;
		const { searchField, onSearchChange }=this.props;
		const filteredRobots = robots.filter(robot => {
		return  robot.name.toLowerCase().includes(searchField.toLowerCase());
		/*console.log(filteredRobots);*/
	})
		if (!robots.length) {
		return <h1>Loading</h1>
	} else {
		return(
		<div className='tc'>
			<h1 className='f1'>RobotFriends</h1>
			<SearchBox searchChange={onSearchChange}/>
			<Scroll>
				<ErrorBoundary>
					<CardList robots = {filteredRobots} />
				</ErrorBoundary>
			</Scroll>
		</div>	
			);
	}
	
}
}	

export default connect(mapStateToProps, mapDispacthToProps)(App);

