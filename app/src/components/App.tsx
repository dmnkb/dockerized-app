import Login from './views/AuthMask/AuthMask'
import { GlobalStyles } from 'twin.macro'
import './index.css'

const App = () => {
	return (
		<div className='flex justify-center w-full min-h-screen'>
			<GlobalStyles />
			<Login />
		</div>
	)
}

export default App
