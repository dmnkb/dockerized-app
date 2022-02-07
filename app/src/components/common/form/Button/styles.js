import tw, { styled, css } from  'twin.macro'

const StyledButton = styled.button`
    ${props => css`
        ${tw`
            px-4 
            py-2 
            text-sm 
            font-medium
            text-green-900 
            bg-green-100            
            rounded-md
            
            hover:bg-green-200
            disabled:bg-gray-200
            disabled:text-gray-500
        `}

        ${props.variant === "delete" && css`
            ${tw`
                text-red-900 
                bg-red-100

                hover:bg-red-200 
            `}
        `}
    `}
`

export default StyledButton