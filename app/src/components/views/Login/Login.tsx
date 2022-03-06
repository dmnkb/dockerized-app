import { useState } from 'react'
import axios from 'axios'

import { signUp } from '../../../api/Api'

import Container from '../../common/layout/Container/styles'
import StyledTextField from '../../common/form/TextField/styles'
import StyledButton from '../../common/form/Button/styles'
import StyledSpinner from '../../common/form/Spinner/styles'

const Login = () => {
	const [submitting, setSubmitting] = useState(false)
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [isSignUp, setIsSignUp] = useState(true) // change later

	const SignUpMap = {}

	const onSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		setSubmitting(true)

		if (isSignUp) {
			try {
				let res = await signUp(name, password)
				// res will have type of User
			} catch (err) {
				// Handle error
			}
		} else {
			return
		}
	}

	const displaySwitchSignInSignUp = () => {
		if (isSignUp) {
			return (
				<span className='text-l mt-2 text-left'>
					Already member?
					<a
						href='#'
						onClick={() => setIsSignUp(false)}
						className='ml-1 text-primary-500'
					>
						Sign in instead
					</a>
				</span>
			)
		} else {
			return (
				<span className='text-l mt-2 text-left'>
					Not a member yet?
					<a
						href='#'
						onClick={() => setIsSignUp(true)}
						className='ml-1 text-primary-500'
					>
						Sign up
					</a>
				</span>
			)
		}
	}

	return (
		<Container className='grid grid-cols-12 gap-4 pt-3'>
			<div className='col col-span-4 p-3'>
				<h1 className='text-xl mb-3'>
					{isSignUp ? 'Sign up' : 'Sign in'}
				</h1>
				<form onSubmit={onSubmit} className='flex flex-col'>
					<StyledTextField
						type='text'
						placeholder='username'
						className='mb-3'
						onChange={(e: any) => setName(e.currentTarget.value)}
						value={name}
					/>
					<StyledTextField
						type='password'
						placeholder='password'
						className='mb-3'
						onChange={(e: any) =>
							setPassword(e.currentTarget.value)
						}
						value={password}
					/>
					<StyledButton
						type='submit'
						value='Send'
						variant='success'
						disabled={!name.length}
						className={submitting ? 'disabled' : ''}
					>
						Send
						{submitting && <StyledSpinner />}
					</StyledButton>
					{displaySwitchSignInSignUp()}
				</form>
			</div>
		</Container>
	)
}

export default Login
