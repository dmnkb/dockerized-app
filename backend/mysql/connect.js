const waitPort = require('wait-port')
const mysql = require('mysql')

const connect = async () => {
	let host = process.env.MYSQL_HOST
	let user = process.env.MYSQL_USER
	let password = process.env.MYSQL_PASSWORD
	let database = process.env.MYSQL_DB

	await waitPort({ host, port: 3306 })

	let pool = mysql.createPool({
		connectionLimit: 5,
		host,
		user,
		password,
		database,
	})

	return new Promise((resolve, reject) => {
		const cols = [
			'id VARCHAR(36) NOT NULL PRIMARY KEY',
			'username VARCHAR(50) NOT NULL UNIQUE',
			'password VARCHAR(255) NOT NULL',
		]

		let query = `CREATE TABLE IF NOT EXISTS users (${cols.join(', ')})`

		pool.query(query, err => {
			if (err) {
				reject(err)
			} else {
				console.log(`Connected to mysql db at host ${host}`)
				resolve(pool)
			}
		})
	})
}

export default connect
