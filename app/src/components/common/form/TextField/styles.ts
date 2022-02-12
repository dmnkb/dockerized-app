import styled from 'styled-components'
import tw from 'twin.macro'
import TextField from './TextField'

const StyledTextField = styled(TextField)`
	${tw`        
        appearance-none 
        border-2 
        border-eggshell-900 
        rounded         
        py-2 
        px-4 
        mr-4        
        text-primary-900 
        leading-loose
        focus:outline-none 
        focus:bg-white 
        ring-primary-500
        ring-offset-2
        focus:ring-2
    `}

	&::placeholder {
		${tw`
            text-eggshell-700
            focus:text-eggshell-900
        `}
	}
`

export default StyledTextField
