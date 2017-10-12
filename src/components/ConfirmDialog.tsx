import * as React from 'react';
import { Dialog, FlatButton } from 'material-ui';

interface ConfirmDialogProps {
}

interface ConfirmDialogState {
	open: boolean;
	title: string;
	message: string;
	onResult?: (result: boolean) => void
}

class ConfirmDialog extends React.Component<ConfirmDialogProps, ConfirmDialogState> {
	constructor() {
		super();
		this.state = this.getInitState();
	}

	getInitState: () => ConfirmDialogState = () => ({
		open: false,
		title: '',
		message: ''
	})

	private sendResult = (result: boolean) => {
		if (this.state.onResult)
			this.state.onResult(result);
		this.hide();
	}

	show = (title: string, message: string, callback: (result: boolean) => void) => {
		this.setState({
			open: true,
			title,
			message,
			onResult: callback
		});
	};

	hide = () => {
		this.setState(this.getInitState());
	};

	render(){
		const actions = [
      <FlatButton
        label="Cancel"
				onClick={() => this.sendResult(false)}
			/>,
			<FlatButton
				label="Ok"
				primary={true}
				onClick={() => this.sendResult(true)}
			/>
    ];

		return(
			<div>
				<Dialog
					title={this.state.title}
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					{this.state.message}
				</Dialog>
			</div>
		)
	}
}

export default ConfirmDialog;