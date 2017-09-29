import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { ConnectedRouter, push } from 'react-router-redux';
import { log, logAsync } from '../../actions/log';

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
	componentDidMount() {
		this.props.log('Root mount.');
		this.props.logAsync('Root mount asynch.');
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
		console.log(this.props);
		return (
			<ConnectedRouter history={this.props.history}>
				<div>
					<div>
						<AppBar title="Blank" onTitleTouchTap={() => this.props.navigate('/')} onLeftIconButtonTouchTap={() => this.toogleDrawer()} />
						<Drawer
							docked={false}
							width={300}
							open={this.state.drawer}
							onRequestChange={(open) => this.toogleDrawer(open)}
						>
							<AppBar title="Blank" onLeftIconButtonTouchTap={() => this.toogleDrawer()} />
							<MenuItem primaryText="About" onClick={() => {this.toogleDrawer(false); this.props.navigate('/about')}}/>
						</Drawer>
					</div>
					<Route exact path="/" component={() => <h1>Home</h1>}/>
					<Route exact path="/about" component={() => <h1>About</h1>}/>
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