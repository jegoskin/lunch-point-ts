
import * as React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton, LinearProgress } from 'material-ui';

import DetailIcon from 'material-ui/svg-icons/action/search';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import SortIcon from 'material-ui/svg-icons/content/sort';
import SortDescIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SortAscIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';
import WarningIcon from 'material-ui/svg-icons/alert/error';

const tableIconsStyle: React.CSSProperties = {
	width: '96px',
	textAlign: 'right',
	overflow: 'visible',
}
const tableHeaderStyle: React.CSSProperties = {
	paddingRight: '0px',
}

interface IMealListProps {
	selectedAlergen:  IIngredient[];
	meals: IMeal[];
	fetching: boolean;
	onDetail: (id: string | undefined) => void;
	onDelete: (item: IMeal | undefined) => void;
}
interface IMealListState {
	cols: {
		id: {sort: number},
		name: {sort: number},
		isAlergen: {sort: number},
	}
}

class MealList extends React.Component<IMealListProps, IMealListState> {
	constructor(){
		super();
		this.state = {
			cols: {
				id: {sort: 1},
				name: {sort: 0},
				isAlergen: {sort: 0},
			}
		}
	}

	displaySort = (key: string) => {
		switch (this.state.cols[key].sort) {
			case -1:
				return <SortAscIcon />
			case 0:
				return <SortIcon />
			case 1:
				return <SortDescIcon />
		}
		return null;
	}

	isDanger = (ingrediences: string[]) => {
		for(let i = 0; i < ingrediences.length; i++) {
			for(let j = 0; j < this.props.selectedAlergen.length; j++) {
				if (ingrediences[i] == this.props.selectedAlergen[j]._id) {
					return true;
				}
			}
		}
		return false;
	}

	handleColumnSortClick = (key: string) => {
		let newState = Object.assign({}, this.state);
		Object.keys(newState.cols).forEach(objectKey => {
			if (objectKey == 	key) {
				switch (newState.cols[key].sort) {
					case -1:
						newState.cols[key].sort = 0;
						break;
					case 0:
						newState.cols[key].sort = 1;
						break;
					case 1:
						newState.cols[key].sort = -1;
						break;
				}
			} else {
				newState.cols[objectKey].sort = 0;
			}
		})
		this.setState(newState);
	}

	getList = () => {
		let sortKey = '';
		let array = this.props.meals.slice(0);
		Object.keys(this.state.cols).forEach(key =>{
			if (this.state.cols[key].sort != 0)
			sortKey = key;
		});
		if (sortKey) {
			let dir = this.state.cols[sortKey].sort;
			array = array.sort((a,b) => {
				if (a[sortKey] < b[sortKey])
					return -1*dir;
				else if (a[sortKey] > b[sortKey])
					return 1*dir;
				else return 0;
			}) 
		}
		return array;
	}

	render(){
		let list = this.getList();
		let tableBody = list.map((item, index) => <TableRow key={ index }>
			<TableRowColumn>{ item._id }</TableRowColumn>
			<TableRowColumn>
				{ item.name } 
				{ this.isDanger(item.ingrediences)? <div style={{float: 'right', marginRight: '-12px' }}><WarningIcon /></div> : null }
			</TableRowColumn>
			<TableRowColumn style={tableIconsStyle}>
				<IconButton tooltip="Delete" tooltipPosition={ (list.length == index+1) ? 'top-center' : 'bottom-center'} onClick={(e) => this.props.onDelete(item)}><DeleteIcon/></IconButton>
				<IconButton tooltip="Detail" tooltipPosition={ (list.length == index+1) ? 'top-center' : 'bottom-center'} onClick={(e) => this.props.onDetail(item._id)}><DetailIcon/></IconButton>
			</TableRowColumn>
		</TableRow>);
		return(
			<div>
				<Table>
					<TableHeader
						displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
					>
						<TableRow>
							<TableHeaderColumn style={tableHeaderStyle}>
								<div style={{marginTop: '15px', float: 'left'}}>ID</div>
								<IconButton style={{float: 'right'}} onClick={() => this.handleColumnSortClick('id')}>{this.displaySort('id')}</IconButton>
							</TableHeaderColumn>
							<TableHeaderColumn style={tableHeaderStyle}>
								<div style={{marginTop: '15px', float: 'left'}}>Name</div>
								<IconButton style={{float: 'right'}} onClick={() => this.handleColumnSortClick('name')}>{this.displaySort('name')}</IconButton>
							</TableHeaderColumn>
							<TableHeaderColumn style={tableIconsStyle}></TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false} >
						{ this.props.fetching? <TableRow><TableRowColumn><LinearProgress mode="indeterminate"/></TableRowColumn></TableRow> : tableBody }
					</TableBody>
				</Table>
			</div>
		)
	}
}

export default MealList;