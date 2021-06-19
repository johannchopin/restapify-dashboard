import { writable } from 'svelte/store';
import api from './axiosStore'

import type { GetApiInfosResponse, Theme, GetStatesResponse, StateResponse, HttpMethod, Mode } from './types';

interface AlertStore {
	show: boolean
	type: 'success' | 'danger' | 'warning'
	message: string
}

const createThemeStore = () => {
  const { subscribe, update } = writable<Theme>({ 
		mode: localStorage.getItem('mode') as Mode || 'light' 
	})

  return {
		subscribe,
		toggleMode: () => {
			return update(value => {
					const mode = value.mode === 'light' ? 'dark' : 'light'
					localStorage.setItem('mode', mode)
					return {...value, mode }
				})
			}
	}
}

const createStatesStore = () => {
	const { subscribe, update, set } = writable<GetStatesResponse | null>(null)

	return {
		subscribe,
		update,
		set,
		fetch: (): void => {
			api.get<GetStatesResponse>('/states')
			.then((response) => {
				set(response.data)
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getStateForRoute: (states: GetStatesResponse, route: string, method: HttpMethod): StateResponse | null => {
			if (states) {
				return states.find(state => {
					return state.route === route 
						&& (state.method === method 
							|| state.method === undefined && (method === 'GET' || method === undefined))
				})
			}

			return null
		}
	}
}

const createAlertStore = () => {
	const { subscribe, update, set } = writable<AlertStore>({type: 'success', show: false, message: ''})

	return {
		subscribe,
		update,
		set,
		show: (data: Omit<AlertStore, 'show'>): void => {
			set({
				show: true,
				...data
			})
		},
		hide: () => {
			update((value) => ({...value, show: false}))
		}
	}
}

const createApiInfosStore = () => {
	const { subscribe, update, set } = writable<GetApiInfosResponse | null>(null)

	return {
		subscribe,
		update,
		set,
		fetch: () => {
			api.get<GetApiInfosResponse>('/api')
			.then((response) => {
				set(response.data)
			})
			.catch((error) => {
				console.log(error);
			})
		}
	}
}

export const theme = createThemeStore()
export const apiInfos = createApiInfosStore()
export const states = createStatesStore()
export const alert = createAlertStore()