import { useState } from "react"

const apiPath = window.location.protocol + "//" + window.location.hostname

const Login = () => {

    const [name, setName] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const submitUser = e => {
		e.preventDefault()
		setSubmitting(true)
		fetch(apiPath + "/api/users", {
			method: "POST",
			body: JSON.stringify({ 
                username: name,
                password: "secret password"
            }),
			headers: { "Content-Type": "application/json" },
		})
			.then(r => r.json())
			.then(name => {				
				setSubmitting(false)
				setName("")
			})
	}

    return (
        <form onSubmit={submitUser}>
			<input
				value={name}
				onChange={e => setName(e.target.value)}
				type='text'
				placeholder='Please enter your name'
				aria-describedby='basic-addon1'
			/>
			<button
				type='submit'
				variant='success'
				disabled={!name.length}
				className={submitting ? "disabled" : ""}
			>
				{submitting ? "Adding..." : "Add"}
			</button>
		</form>
    )
}

export default Login