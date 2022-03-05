import styled, { css } from 'styled-components'
import tw from 'twin.macro'

interface StyledButtonProps {
	variant?: string
}

const StyledButton = styled.button`
	${(props: StyledButtonProps) => css`
		${tw`
            px-4
            py-4
            
            items-center

            text-sm
            text-center
            font-medium
            text-white
            bg-primary-500
            rounded-md
            
            hover:bg-primary-600
            disabled:bg-primary-100
            disabled:text-primary-500
        `}

		& > .spinner {
			${tw` border-primary-900 `}
		}

		${props.variant &&
		props.variant === 'delete' &&
		css`
			${tw`
                text-white
                bg-error-500

                hover:bg-error-600 
            `}
			& > .spinner {
				${tw` border-error-900 `}
			}
		`}
	`}
`

export default StyledButton
