<script lang="ts">
	import { onMount } from 'svelte'
	import Route from './components/Route.svelte'

	import type { GetRoutesResponse } from './types'

	import api from './axiosStore'

	let routes: GetRoutesResponse | null = null

	onMount(async () => {
		api.get<GetRoutesResponse>('/routes')
		.then(function (response) {
			routes = response.data
			console.log(response.data)
		})
		.catch(function (error) {
			console.log(error);
		})
	})

	const close = (): void => {
		api.get('/close')
	}

</script>

<header>
	<h1>Restapify</h1>
	<button on:click={close}>Close server</button>
</header>

<main>
	{#if routes}
		{#each Object.keys(routes) as route}
			{#each Object.keys(routes[route]) as method}
				<Route route={{...routes[route][method], method}} />
			{/each}
		{/each}
	{/if}
</main>

<style>
</style>