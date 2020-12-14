import { writable } from 'svelte/store';
import type { GetRoutesResponse, Theme } from './types';

export const routes = writable<GetRoutesResponse | null>(null);

const createThemeStore = () => {
  const { subscribe, update } = writable({ mode: 'light' })

  return {
		subscribe,
		toggleMode: () => update(value => ({...value, mode: value.mode === 'light' ? 'dark' : 'light'})),
	}
}
export const theme = createThemeStore()
