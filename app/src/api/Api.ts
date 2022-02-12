import axios from 'axios'

const apiPath = window.location.protocol + '//' + window.location.hostname

export const getUsers = () => {
	return axios
		.get(`${apiPath}/api/users`)
		.then(response => ({ response, error: undefined }))
		.catch(error => ({ resonse: undefined, error }))
}

export const addUser = (name: string, password: string) => {
	return axios
		.post(`${apiPath}/api/users`, {
			username: name,
			password: password,
		})
		.then(response => ({ response, error: undefined }))
		.catch(error => ({ response: undefined, error }))
}

export const deleteUser = (id: number) => {
	return axios
		.delete(`${apiPath}/api/users/${id}`)
		.then(response => ({ response, error: undefined }))
		.catch(error => ({ response: undefined, error }))
}
