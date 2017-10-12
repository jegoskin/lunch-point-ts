const initState = () => ({
	list: [],
	lastLog: ""
}) 

const logs = (state: ILogsState = initState(), action: IAction<string>) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case '@@redux/INIT':
			break;
		case 'LOG': {
			newState.list.push(action.payload? action.payload : "");
			newState.lastLog = action.payload;
			console.log(action.payload)
		}
		default: break;
	}
	return newState;
}
export default logs;