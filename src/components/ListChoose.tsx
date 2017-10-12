import * as React from 'react';
import { List, ListItem, Subheader, CircularProgress } from 'material-ui';

import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import { listStyle } from '../constants/styles';

interface IListChooseProps<T> {
	data: T[],
	feching: boolean,
	compare: (a: T, b: T) => number,
}

interface IListChooseStats<T> {
	data: T[],
	selectedData: T[]
}

interface IName {
	name: string
}

class ListChoose<T extends IName> extends React.Component<IListChooseProps<T>, IListChooseStats<T>>{
	constructor(){
		super();
		this.state = {
			data: [],
			selectedData: []
		}
	}

	componentWillReceiveProps(nextProps: IListChooseProps<T>) {
		const newState = Object.assign({}, this.state, { data: nextProps.data.sort(this.props.compare) });
		this.setState(newState);
	}

	private handleSelect(item: T, index: number)  {
		const newState = Object.assign({}, this.state);
		newState.selectedData.push(item);
		newState.selectedData.sort(this.props.compare);
		newState.data.splice(index, 1);
		this.setState(newState);
	}

	private handleDeSelect(item: T, index: number)  {
		const newState = Object.assign({}, this.state);
		newState.data.push(item);
		newState.selectedData.splice(index, 1);
		newState.data.sort(this.props.compare)
		this.setState(newState);
	}

	getSelected = () => {
		return this.state.selectedData.slice(0);
	}

	render(){
		let avalibleData = this.state.data.map((item, index) => <ListItem 
		style={{textAlign: 'right'}}
		key={ index }
		primaryText={ item.name }
		onClick={(e) => this.handleSelect(item, index)}
		rightIcon={<ArrowRight/>} />);

		let selectedData = this.state.selectedData.map((item, index) => <ListItem 
		style={{textAlign: 'left'}}
		key={ index }
		primaryText={ item.name }
		onClick={(e) => this.handleDeSelect(item, index)}
		leftIcon={<ArrowLeft/>} />);

		return(
			<div>
					<div style={{clear: 'both'}}></div>
					<List style={listStyle}>
						<Subheader>Avaiable</Subheader>
							{ this.props.feching? <CircularProgress style={ {marginTop: 20, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto', display: 'block' } } /> : avalibleData }
					</List>
					<List style={listStyle}>
						<Subheader>Selected</Subheader>
						{ this.props.feching? <CircularProgress style={ {marginTop: 20, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto', display: 'block' } } /> : selectedData }
					</List>
					<div style={{clear: 'both'}}></div>
			</div>
		)	
	}
}

export default ListChoose;