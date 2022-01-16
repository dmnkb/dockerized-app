import { getPool } from "../mysql/mysql"

const addUser = async (user) => {
	return new Promise((resolve, reject) => {
		getPool().query(
			'INSERT INTO users (id, username, password) VALUES (?, ?, ?)',
			[user.id, user.username, user.password],
			error => {
				if (error) return reject('Error in express: ' + error)
				resolve()
			}
		)
	})
}

export default addUser