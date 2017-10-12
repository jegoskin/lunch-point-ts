import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { ConnectedRouter, push } from 'react-router-redux';
import { log, logAsync } from '../../actions/log';
import Home from '../Home/Home';
import Ingredient from '../Ingredient/Ingredient'
import MealDetail from '../Detail/MealDetail';
import AddMeal from	'../Add/AddMeal'

import './Root.css';

import { AppBar, Drawer, MenuItem } from 'material-ui';

interface IRootProps {
	history: any;
	log: (message: string) => void;
	logAsync: (message: string) => void,
	navigate: (url: string) => void
}
interface IRootState {
	drawer: boolean
}
class Root extends React.Component<IRootProps, IRootState> {
	constructor() {
		super();
		this.state = {
			drawer: false
		}
	}
	toogleDrawer = (show?: boolean) => {
		if (show) {
			this.setState({
				drawer: show
			})
		} else {
			this.setState({
				drawer: !this.state.drawer
			})
		}
	}
	render() {
		return (
			<ConnectedRouter history={this.props.history}>
				<div>
					<div>
						<AppBar title="Lunch Time" onTitleTouchTap={() => this.props.navigate('/')} onLeftIconButtonTouchTap={() => this.toogleDrawer()} />
						<Drawer
							docked={false}
							width={300}
							open={this.state.drawer}
							onRequestChange={(open) => this.toogleDrawer(open)}
						>
							<AppBar title="Lunch Time" onLeftIconButtonTouchTap={() => this.toogleDrawer()} />
							<MenuItem primaryText="Home" onClick={() => {this.toogleDrawer(false); this.props.navigate('/')}}/>
							<MenuItem primaryText="Ingredient" onClick={() => {this.toogleDrawer(false); this.props.navigate('/ingredient/')}}/>
						</Drawer>
					</div>
					<Route exact path="/" component={Home}/>
					<Route exact path="/ingredient/" component={Ingredient}/>
					<Route exact path="/meal/detail/:id" component={MealDetail}/>
					<Route exact path="/meal/add/" component={AddMeal}/>
				</div>
			</ConnectedRouter>
		);
	}
}

const mapStateToProps = (state: IAppState) => ({

})

const mapDispatchToProps = {
	log,
	logAsync,
	navigate: (url: string) => push(url)
}

export default connect<object, object, any>(mapStateToProps, mapDispatchToProps)(Root);