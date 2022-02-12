interface SpinnerProps {
	size?: number
	className?: string
}

export const Spinner: React.FC<SpinnerProps> = ({ className }) => (
	<div className={`${className} spinner`}></div>
)
