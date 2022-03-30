import { useState, useEffect } from 'react'
import { User, getUsers, addUser, deleteUser } from '../../api/Api'

import StyledUserCard from '../UserCard/styles'
import StyledTextField from '../common/form/TextField/styles'
import StyledButton from '../common/form/Button/styles'

import Container from '../common/layout/Container/styles'
import { Lock } from '../common/Illustrations/Illustrations'
import StyledSpinner from '../common/form/Spinner/styles'

// const UserList = () => {
// 	const [name, setName] = useState<string>('')
// 	const [submitting, setSubmitting] = useState(false)
// 	const [users, setUsers] = useState<User[] | null>(null)

// 	const loadUsers = () => {
// 		getUsers().then((data: any) => {
// 			if (typeof data === Error) {
// 				console.warn(`Error getting users: ${data.message}`)
// 			} else {
// 				setUsers(data)
// 			}
// 		})
// 	}

// 	const submitForm = (e: React.SyntheticEvent) => {
// 		e.preventDefault()
// 		setSubmitting(true)

// 		addUser(name, 'secret password').then((data: any) => {
// 			if (typeof data === 'string') {
// 				console.warn(`Error adding user: ${data}`)
// 			} else {
// 				setName('')
// 				loadUsers()
// 			}
// 			setSubmitting(false)
// 		})
// 	}

// 	useEffect(() => loadUsers(), [])

// 	return (
// 		<Container className='pt-32 grid grid-cols-12 gap-4'>
// 			<div className='col-start-1 col-span-4'>
// 				<h2 className='text-xl mb-3'>Add users</h2>
// 				<form onSubmit={submitForm} className='mb-3 flex'>
// 					<StyledTextField
// 						value={name}
// 						onChange={(
// 							e: React.FormEvent<HTMLInputElement>
// 						): void => setName(e.currentTarget.value)}
// 						type='text'
// 						placeholder='Please enter your name'
// 						className='flex-1'
// 					/>
// 					<StyledButton
// 						type='submit'
// 						variant='success'
// 						disabled={!name.length}
// 						className={submitting ? 'disabled' : ''}
// 					>
// 						Add
// 						{submitting && <StyledSpinner />}
// 					</StyledButton>
// 				</form>
// 				<ul className='flex flex-wrap -m-1.5'>
// 					{users &&
// 						users.map((user: any) => (
// 							<li key={user.id}>
// 								<StyledUserCard
// 									id={user.id}
// 									name={user.username}
// 									onDeleteUser={() => loadUsers()}
// 								/>
// 							</li>
// 						))}
// 				</ul>
// 			</div>
// 		</Container>
// 	)
// }

// export default UserList
