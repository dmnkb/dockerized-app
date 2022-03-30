import axios, { AxiosResponse, AxiosError } from 'axios'

const PATH = window.location.protocol + '//' + window.location.hostname

const axiosClient = axios.create()
axiosClient.defaults.baseURL = `${PATH}/api/v1`

enum MySQLErrorCodeMap {
	ER_DUP_ENTRY = 'Username already taken.',
	ER_BAD_FIELD_ERROR = 'ER_BAD_FIELD_ERROR',
}

const isMySQLError = (err: string): boolean =>
	Object.keys(MySQLErrorCodeMap).includes(err)

const getMySQLErrorMessage = (mySQLErrorCode: string) => {
	return MySQLErrorCodeMap[mySQLErrorCode as keyof typeof MySQLErrorCodeMap]
}

export interface User {
	id: number
	username: string
	password: string
}

const verboseError = (error: any) => {
	if (window.location.hostname !== 'localhost') return
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		console.log(error.response.data)
		console.log(error.response.status)
		console.log(error.response.headers)
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		console.log(error.request)
	} else {
		// Something happened in setting up the request that triggered an Error
		console.log('Error', error.message)
	}
	console.log(error.config)
}

export const signUp = async (
	username: string,
	password: string
): Promise<any> => {
	return new Promise((resolve, reject) => {
		axiosClient
			.post('auth/signup', {
				username: username,
				password: password,
			})
			.then(res => resolve(Object.freeze(res.data as User)))
			.catch(err => {
				if (process.env.NODE_ENV === 'development') {
					verboseError(err)
				}
				let errCode = err.response.data['code']
				reject(
					isMySQLError(errCode)
						? getMySQLErrorMessage(errCode)
						: `An unknown error occurred: ${errCode}`
				)
			})
	})
}

export const signIn = async (
	username: string,
	password: string
): Promise<any> => {
	return new Promise((resolve, reject) => {
		axiosClient
			.post('auth/signin', {
				username: username,
				password: password,
			})
			.then(res => resolve(Object.freeze(res.data as User))) // Recieve session token
			.catch(err => {
				if (process.env.NODE_ENV === 'development') {
					verboseError(err)
				}
				let errCode = err.response.data['code']
				reject(
					isMySQLError(errCode)
						? getMySQLErrorMessage(errCode)
						: `An unknown error occurred: ${errCode}`
				)
			})
	})
}

// User

export const getUsers = (): Promise<User | AxiosError> => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${PATH}/api/users`)
			.then(res => resolve(res.data))
			.catch(err => reject(verboseError(err)))
	})
}

export const addUser = (name: string, password: string): Promise<User> => {
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
