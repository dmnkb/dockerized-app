import { useState, useEffect } from 'react'
import * as api from '../../../api/Api'

import StyledUserCard from '../../UserCard/styles'
import StyledTextField from '../../common/form/TextField/styles'
import StyledButton from '../../common/form/Button/styles'

import Container from '../../common/layout/Container/styles'
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
		<Container className="pt-32 grid grid-cols-12">
			<div className='col-start-1 col-span-4'>
				<form onSubmit={submitForm} className='mb-3'>
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
				<h2 className="text-xl mb-3">Active users</h2>
				<ul className="flex flex-wrap -m-1.5">
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
		</Container>
	)
}

export default Login
