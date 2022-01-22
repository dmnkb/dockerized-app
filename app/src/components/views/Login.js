import { useState, useEffect } from "react"

const apiPath = window.location.protocol + "//" + window.location.hostname

const Login = () => {

    const [name, setName] = useState("")
    const [submitting, setSubmitting] = useState(false)
	const [users, setUsers] = useState(null)

    const addUser = e => {
		e.preventDefault()
		setSubmitting(true)
		fetch(apiPath + "/api/users", {
			method: "POST",
			body: JSON.stringify({ 
                username: name,
                password: "secret password"
            }),
			headers: { "Content-Type": "application/json" },
		})		
		.then(() => {
			setSubmitting(false)
			setName("")
			getUsers()
		})
		.catch(error => { console.log(`Error adding user: ${error}`) })
	}

	const getUsers = async () => {
		fetch(apiPath + '/api/users')
			.then(response => response.json())
			.then(setUsers)
			.catch(error => { console.log(`Error getting users: ${error}`) })
	}

	const removeUser = async (id) => {
		fetch(apiPath + `/api/users/${id}`, { method: 'DELETE' })
			.then(() => { getUsers() })
			.catch(error => { console.log(`Error deleting user with ID ${id}: ${error}`) })
	}

	useEffect(() => getUsers(), [])

    return (
		<>
			<form onSubmit={addUser}>
				<input
					value={name}
					onChange={e => setName(e.target.value)}
					type='text'
					placeholder='Please enter your name'
					aria-describedby='basic-addon1'
				/>
				<button
					type='submit'
					variant='success'
					disabled={!name.length}
					className={submitting ? "disabled" : ""}
				>
					{submitting ? "Adding..." : "Add"}
				</button>
			</form>
			<h2>Active users</h2>
			<ul>
				{users && users.map(user => 
					<li key={user.id}>
						<h3>{user.username}</h3>
						<button onClick={() => removeUser(user.id)}>Delete</button>
					</li>
				)}
			</ul>
		</>
    )
}

export default Login