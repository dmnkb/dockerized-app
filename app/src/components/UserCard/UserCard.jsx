import { useState } from 'react'
import * as api from '../../api/Api'
import StyledButton from "../common/form/Button/styles"

import StyledSpinner from '../common/form/Spinner/styles'

const UserCard = ({ name, id, onDeleteUser, className }) => {

	const [loading, setLoading] = useState(false)

    return (
		<div className={className}>
			<h3>{name}</h3>			
			<StyledButton variant={'delete'} onClick={() => {
				setLoading(true)
				api.deleteUser(id).then(data => {
					if (data.error) {
						console.log(
							`Error deleting user ${name}: ${data.error}`
						)
					} else {						
						onDeleteUser()
					}
				})
			}}>
				Delete 
				{loading && <StyledSpinner />}
			</StyledButton>
		</div>
	)
}

export default UserCard
