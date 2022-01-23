import tw, { styled } from  'twin.macro'
import TextField from './TextField'

const StyledTextField = styled(TextField)`
	${tw`
        bg-gray-200 
        appearance-none 
        border-2 
        border-gray-200 
        rounded         
        py-2 
        px-4 
        mr-4
        text-gray-700 
        leading-tight
        focus:outline-none 
        focus:bg-white 
        focus:border-green-500
    `}
`

export default StyledTextField