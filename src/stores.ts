import { writable } from 'svelte/store';
import type { GetRoutesResponse, Theme, GetStatesResponse } from './types';

const createThemeStore = () => {
  const { subscribe, update } = writable<Theme>({ mode: 'light' })

  return {
		subscribe,
		toggleMode: () => update(value => ({...value, mode: value.mode === 'light' ? 'dark' : 'light'})),
	}
}

export const theme = createThemeStore()
export const routes = writable<GetRoutesResponse | null>(null)
export const states = writable<GetStatesResponse | null>(null)
