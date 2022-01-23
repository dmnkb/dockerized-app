import tw, { styled } from  'twin.macro'

const StyledButton = styled.button`
	${tw`
        inline-flex 
        justify-center 
        px-4 
        py-2 
        text-sm 
        font-medium 
        text-green-900 
        bg-green-100 
        border 
        border-transparent 
        rounded-md 
        hover:bg-green-200 
        focus:outline-none 
        focus-visible:ring-2 
        focus-visible:ring-offset-2 
        focus-visible:ring-green-500
        disabled:bg-gray-200
        disabled:text-gray-500
    `}
`

export default StyledButton