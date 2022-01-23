import tw, { styled } from  'twin.macro'
import UserCard from './UserCard'

const StyledUserCard = styled(UserCard)`
	h3 {
		${tw`            
            text-purple-500
        `}
	}
`

export default StyledUserCard