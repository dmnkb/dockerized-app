import { getPool } from '../mysql/mysql'

const getUser = async username => {
	return new Promise((resolve, reject) => {
		getPool().query(
			`SELECT * FROM users WHERE username = "${username}"`,
			(error, rows) => {
				if (error) return reject(error)
				resolve(rows)
			}
		)
	})
}

export default getUser
