interface IAction<T> {
	type: string,
	payload: T | undefined
}

type FActionAsync<T> = (dispatch: FDispatch<T>) => void;

type FDispatch<T> = (action: IAction<T> | FActionAsync<any>) => void;

interface IHistory {
	location: {
		hash: string;
		pathname: string;
	}
}