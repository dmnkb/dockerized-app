import { getPool } from '../mysql/mysql'

const deleteUser = async id => {
	return new Promise((resolve, reject) => {
		getPool().query('DELETE FROM users WHERE id = ?', [id], error => {
			if (error) return reject(`Error deleting user ID: ${id} ${error}`)
			resolve()
		})
	})
}

export default deleteUser
