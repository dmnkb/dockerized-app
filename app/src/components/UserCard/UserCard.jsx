import * as api from '../../api/Api'
import StyledButton from "../common/form/Button/styles"

const UserCard = ({ name, id, onDeleteUser, className }) => {
    return (
		<div className={className}>
			<h3>{name}</h3>			
			<StyledButton variant={'delete'} onClick={() => {
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
			</StyledButton>
		</div>
	)
}

export default UserCard
