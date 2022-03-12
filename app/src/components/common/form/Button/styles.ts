import { ButtonVariant } from 'react-bootstrap/esm/types'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export enum ButtonVariants {
	DEFAULT = 'DEFAULT',
	DELETE = 'DELETE',
}

const ButtonVariantsMap: any = {
	DEFAULT: ``,
	DELETE: css`
		${tw`
            text-white
            bg-error-500
            hover:bg-error-600 
        `}
		& > .spinner {
			${tw` border-error-900 `}
		}
	`,
}

interface StyledButtonProps {
	variant?: ButtonVariants
}

const StyledButton = styled.button`
	${(props: StyledButtonProps) => css`
		${tw`
            px-4
            py-4
            
            flex
            justify-center
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
			${tw` border-primary-500 `}
		}

		${props.variant && ButtonVariantsMap[props.variant]}
	`}
`

export default StyledButton
