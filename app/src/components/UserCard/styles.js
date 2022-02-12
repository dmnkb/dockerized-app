import tw, { styled } from 'twin.macro'
import UserCard from './UserCard'

const StyledUserCard = styled(UserCard)`
	${tw`
		flex
		items-center

		p-1
		pl-3
		m-0.5

		text-eggshell-900

		bg-white
		border-2
		border-eggshell-400
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
