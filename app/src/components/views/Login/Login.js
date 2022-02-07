import { useState, useEffect } from 'react'
import * as api from '../../../api/Api'

import StyledUserCard from '../../UserCard/styles'
import StyledTextField from '../../common/form/TextField/styles'
import StyledButton from '../../common/form/Button/styles'

import { Lock } from '../../common/Illustrations/Illustrations'

const Login = () => {
	const [name, setName] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [users, setUsers] = useState(null)	

	const loadUsers = () => {
		api.getUsers().then(data => {
			if (data.error) {
				console.warn(`Error getting users: ${data.error}`)
			} else {
				setUsers(data.response.data)

			}
		})
	}

	const submitForm = (e) => {
		e.preventDefault()
		setSubmitting(true)

		api.addUser(name, "secret password").then(data => {
			if (data.error) {
				console.warn(`Error adding user: ${data.error}`)
			} else {
				setSubmitting(false)
				setName('')
				loadUsers()
			}
		})
	}
	
	useEffect(() => loadUsers(), [])

	return (
		<div className='flex items-center h-screen w-full'>
			<div className='grid grid-cols-6 gap-4 w-full'>
				<div className='col-start-2 col-span-4 flex'>
					<div className='w-1/2 flex relative'>
						<Lock className='absolute h-full' />
					</div>
					<div className='w-1/2'>
						<form onSubmit={submitForm}>
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
								className={submitting ? 'disabled' : ''}
							>
								{submitting ? 'Adding...' : 'Add'}
							</StyledButton>
						</form>
						<h2>Active users</h2>
						<ul>
							{users &&
								users.map(user => (
									<li key={user.id}>
										<StyledUserCard
											id={user.id}
											name={user.username}
											onDeleteUser={() => loadUsers()}
										/>
									</li>
								))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
