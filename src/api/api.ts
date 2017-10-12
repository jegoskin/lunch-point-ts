import axios from 'axios';

const url = 'http://10.1.21.57:9999/';

class Api {
	constructor() {
	}
	get(collection: string, id?: string) {
		return new Promise ((resolve, reject) => {
			if (id) {
				axios.get(url + collection + '/' + id)
				.then(response => resolve({ body: response.data }))
				.catch(err => alert(err.message))
			} else {
				axios.get(url + collection)
					.then(response => resolve({ body: response.data }))
					.catch(err => alert(err.message))
			}
		})
	}
	insert(collection: string, object: any) {
		return new Promise((resolve, reject) => {
			axios.put(url + collection, {
				data: object
			})
				.then(response => resolve({ body: response.data }))
				.catch(err => alert(err.message))
		})
	}
	delete(collection: string, object: any) {
		return new Promise((resolve, reject) => {
			axios.delete(url + collection + '/' + object._id)
				.then(response => resolve())
				.catch(err => alert(err.message))
		})
	}
	update(collection: string, object: any) {
		return new Promise((resolve, reject) => {
			axios.post(url + collection, {
				data: object
			})
				.then(response => resolve({ body: response.data }))
				.catch(err => alert(err))
		})
	}
}
const api = new Api();
export default api;