import { useState, useEffect } from "react"
import StyledUserCard from "../../UserCard/styles"
import StyledTextField from "../../common/form/TextField/styles"
import StyledButton from "../../common/form/Button/styles"

import { Lock } from "../../common/Illustrations/Illustrations"

const Login = () => {
	
	const [name, setName] = useState("")
    const [submitting, setSubmitting] = useState(false)
	const [users, setUsers] = useState(null)
	
	const apiPath = window.location.protocol + "//" + window.location.hostname

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
		<div className="flex items-center h-screen w-full">
			<div className="grid grid-cols-6 gap-4 w-full">
				<div className="col-start-2 col-span-4 flex">
					<div className="w-1/2 flex relative">
						<Lock className="absolute h-full"/>
					</div>
					<div className="w-1/2">
						<form onSubmit={addUser}>
							<StyledTextField
								value={name}
								onChange={e => setName(e.target.value)}
								type='text'
								placeholder='Please enter your name'
							/>
							<StyledButton
								type='submit'
								variant='success'
								disabled={!name.length}
								className={submitting ? "disabled" : ""}
							>
								{submitting ? "Adding..." : "Add"}
							</StyledButton>
						</form>
						<h2>Active users</h2>
						<ul>
							{users && users.map(user => 
								<li key={user.id}>
									<StyledUserCard userName={user.username} />
									<StyledButton 
										variant={"delete"}
										onClick={() => removeUser(user.id)}
										>
											Delete
										</StyledButton>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
			
    )
}

export default Login