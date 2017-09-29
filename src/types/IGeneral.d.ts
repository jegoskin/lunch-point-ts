interface IAction {
	type: string,
	payload: {}
}

type FActionAsync = (dispatch: FDispatch) => void;

type FDispatch = (action: IAction) => void;

//Application State
interface IAppState {
	logs?: {
		list: object[],
		lastLog: object
	}
}