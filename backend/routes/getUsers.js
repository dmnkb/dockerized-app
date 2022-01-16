import { getPool } from "../mysql/mysql"

const getUsers = async () => {		
    return new Promise((resolve, reject) => {
        getPool().query("SELECT * FROM users", (error, rows) => {
            if (error) return reject(error)
            resolve(rows)
        })
    })
}

export default getUsers