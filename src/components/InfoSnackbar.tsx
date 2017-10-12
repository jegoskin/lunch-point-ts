import * as React from 'react';
import { Snackbar } from 'material-ui';

interface IInfoSnackbarProps{}
interface IInfoSnackbarState{
	open: boolean;
	message: string;
}

class InfoSnackbar extends React.Component<IInfoSnackbarProps, IInfoSnackbarState> {
	constructor(){
		super();
		this.state = this.getInitState();
	}

	getInitState: () => IInfoSnackbarState = () => ({
		open: false,
		message: '',
	})

	show = (message: string) => {
		this.setState({open: true, message: message});
	}

	hide = () => {
		this.setState(this.getInitState());
	}

	render(){
		return(
			<div>
				<Snackbar 
				open={this.state.open}
				message={this.state.message}
				autoHideDuration={3000}
				onRequestClose={this.hide}
				action="Ok"
				onActionTouchTap={this.hide}
				/>
			</div>
		)
	}
}

export default InfoSnackbar;