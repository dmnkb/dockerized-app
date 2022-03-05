import axios, { AxiosResponse, AxiosError } from 'axios'

const PATH = window.location.protocol + '//' + window.location.hostname

const axiosClient = axios.create()
axiosClient.defaults.baseURL = `${PATH}/api/v1`

export interface Error {
	message: string
}

export interface User {
	id: number
	username: string
	password: string
}

export type TError = Error | AxiosError

export const getUsers = (): Promise<User> | any => {
	return axios
		.get(`${PATH}/api/users`)
		.then(res => res.data as User[])
		.catch(error => error)
}

export const addUser = (name: string, password: string): Promise<User> => {
	return axios
		.post(`${PATH}/api/users`, {
			username: name,
			password: password,
		})
		.then(res => res.data as User)
	// .catch(error => error)
}

export const deleteUser = (id: number) => {
	return axios
		.delete(`${PATH}/api/users/${id}`)
		.then(response => ({ response, error: undefined }))
		.catch(error => ({ response: undefined, error }))
}

export const signUp = (
	username: string,
	password: string
): Promise<User> | Promise<AxiosError> => {
	return axiosClient
		.post('auth/signup', {
			username: username,
			password: password,
		})
		.then(res => res.data)
		.catch(err => err as Promise<AxiosError>)
}
