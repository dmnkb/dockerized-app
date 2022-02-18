import axios from 'axios'

const PATH = window.location.protocol + '//' + window.location.hostname

export interface User {
	id: number
	username: string
	password: string
}

export type Error = string

export const getUsers = (): Promise<User[]> | Promise<Error> => {
	return axios
		.get(`${PATH}/api/users`)
		.then(res => res.data as User[])
		.catch(error => error)
}

export const addUser = (
	name: string,
	password: string
): Promise<User> | Promise<Error> => {
	return axios
		.post(`${PATH}/api/users`, {
			username: name,
			password: password,
		})
		.then(res => res.data as User)
		.catch(error => error)
}

export const deleteUser = (id: number) => {
	return axios
		.delete(`${PATH}/api/users/${id}`)
		.then(response => ({ response, error: undefined }))
		.catch(error => ({ response: undefined, error }))
}
