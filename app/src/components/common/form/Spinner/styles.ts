import styled, { css } from 'styled-components'
import tw from 'twin.macro'
import { Spinner } from './Spinner'

const StyledSpinner = styled(Spinner)`
	${props => {
		// If dimensions are defined by user
		if (props.size) {
			if (props.size > 100 || props.size <= 0) {
				console.warn(
					"Property 'size' must be between 0 and 100. Width is set to 1em"
				)
			}
			// Limit size to something reasonable
			let size = Math.min(Math.max(props.size, 100), 0)
			return css`
				width: ${size}px;
				height: ${size}px;
			`
		} else {
			// Default to 1em
			return css`
				width: 1em;
				height: 1em;
			`
		}
	}}}

	${tw`        
        rounded-full
        border-2
        border-primary-500
        border-l-0
        animate-spin
        ml-2
        -mr-0.5
    `}
`

export default StyledSpinner
