import { writable } from 'svelte/store';
import type { GetRoutesResponse, Theme, GetStatesResponse, StateResponse, HttpMethod } from './types';

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

export const theme = createThemeStore()
export const routes = writable<GetRoutesResponse | null>(null)
export const states = createStatesStore()
