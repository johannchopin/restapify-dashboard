import { writable } from 'svelte/store';
import type { GetRoutesResponse } from './types';

export const routes = writable<GetRoutesResponse | null>(null);