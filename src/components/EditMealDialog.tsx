import * as React from 'react';

import { Dialog, FlatButton, TextField } from 'material-ui';

interface IEditMealDialogProps {
	onResult: (newName: string) => void
}

interface IEditMealDialogStats{
	open: boolean;
	result:  string;
}

class EditMealDialog extends React.Component<IEditMealDialogProps, IEditMealDialogStats> {
	constructor(){
		super();
		this.state = this.getInitState();
	}

	getInitState: () => IEditMealDialogStats = () => ({
		open: false,
		result: ''
	})
	
	show = (name: string) => {
		this.setState({open: true, result: name});
	}
	
	hide = () => {
		this.setState(this.getInitState());
	}

	private sendResult = () => {
		let newName = this.state.result;
		this.props.onResult(newName);
	}

	handleChange = (newName: string) => this.setState(Object.assign({}, this.state, { result: newName }))

	render(){
		const actions = [
			<FlatButton
				label="Cancel"
				onClick={() => this.hide()}
			/>,
			<FlatButton
				label="Ok"
				primary={true}
				onClick={this.sendResult}
				disabled={this.state.result == ''}
			/>
		]
		return(
			<div>
				<Dialog
					contentStyle={{width: '40%', minWidth: '320px',}}
					title='Change name'
					actions={actions}
					modal={true}
					open={this.state.open}
				>
				<TextField
					floatingLabelText="Name"
					onChange={(e, newValue) => this.handleChange(newValue)}
					value={this.state.result}
					fullWidth />
			</Dialog>
			</div>
		)
	}
}

export default EditMealDialog;