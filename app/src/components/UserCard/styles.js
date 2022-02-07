import tw, { styled } from  'twin.macro'
import UserCard from './UserCard'

const StyledUserCard = styled(UserCard)`
	${tw`
		flex
		items-center

		p-1
		pl-3
		m-1.5

		bg-white
		border-2
		border-gray-100
		rounded-md
	`}	
	
	h3 {
		${tw`
				
		`}
	}
	button {
		${tw`
			col-span-1
			ml-3
		`}
	}

`

export default StyledUserCard