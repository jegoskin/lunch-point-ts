export const log = (message: string): IAction<string> => ({
	type: 'LOG',
	payload: message
})

export const logAsync = (message: string): FActionAsync<string> => (dispatch => {
	dispatch({
		type: 'LOG',
		payload: 'async log in 3s'
	});
	setTimeout(() => {
		dispatch({
			type: 'LOG',
			payload: message
		})
	}, 3000)
})