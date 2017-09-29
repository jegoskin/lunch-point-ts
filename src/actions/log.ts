export const log = (message: string): IAction => ({
	type: 'LOG',
	payload: {
		message
	}
})

export const logAsync = (message: string): FActionAsync => (dispatch => {
	dispatch({
		type: 'LOG',
		payload: {
			message: 'async log in 3s'
		}
	});
	setTimeout(() => {
		dispatch({
			type: 'LOG',
			payload: {
				message
			}
		})
	}, 3000)
})