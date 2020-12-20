import { writable } from 'svelte/store';
import type { GetRoutesResponse, Theme, GetStatesResponse, StateResponse, HttpMethod } from './types';

interface AlertStore {
	show: boolean
	type: 'success' | 'error' | 'warning'
	message: string
}

const createThemeStore = () => {
  const { subscribe, update } = writable<Theme>({ mode: 'light' })

  return {
		subscribe,
		toggleMode: () => update(value => ({...value, mode: value.mode === 'light' ? 'dark' : 'light'})),
	}
}

const createStatesStore = () => {
	const { subscribe, update, set } = writable<GetStatesResponse | null>(null)

	return {
		subscribe,
		getStateForRoute: (states: GetStatesResponse, route: string, method: HttpMethod): StateResponse | null => {
			if (states) {
				return states.find(state => {
					return state.route === route 
						&& (state.method === method 
							|| state.method === undefined && (method === 'GET' || method === undefined))
				})
			}

			return null
		},
		update,
		set
	}
}

const createAlertStore = () => {
	const { subscribe, update, set } = writable<AlertStore>({type: 'success', show: false, message: ''})

	return {
		subscribe,
		show: (data: Omit<AlertStore, 'show'>): void => {
			set({
				show: true,
				...data
			})
		},
		hide: () => {
			update((value) => ({...value, show: false}))
		},
		update,
		set
	}
}

export const theme = createThemeStore()
export const routes = writable<GetRoutesResponse | null>(null)
export const states = createStatesStore()
export const alert = createAlertStore()