import create from 'zustand'

interface AppState {
	loggedIn: boolean
	setLoggedIn: (li: boolean) => void
}

export const useStore = create<AppState>(set => ({
	loggedIn: false,
	setLoggedIn: (li: boolean) => set(state => ({ loggedIn: li })),
}))
