<script lang="ts">
	import { onMount } from 'svelte'
	import { atomOneDark } from "svelte-highlight/styles"

	import RouteSection from './components/RouteSection.svelte'
	import Navbar from './components/Navbar.svelte'
	import Sidebar from './components/Sidebar.svelte'
	import AlertToast from './components/AlertToast.svelte'

  import { METHODS } from './const'

	// S T O R E S
	import { routes as routesStore, states as statesStore } from './stores'

	// T Y P E S
	import type { GetRoutesResponse, GetStatesResponse } from './types'

	import api from './axiosStore'

	let routes: GetRoutesResponse | null = null
	let isSidebarToggled = true

	routesStore.subscribe(value => {
		routes = value
	})

	const fetchRoutes = (): void => {
	api.get<GetRoutesResponse>('/routes')
		.then((response) => {
			routesStore.set(response.data)
		})
		.catch((error) => {
			console.log(error);
		})
	}

	const fetchStates = (): void => {
		api.get<GetStatesResponse>('/states')
		.then((response) => {
			statesStore.set(response.data)
		})
		.catch((error) => {
			console.log(error);
		})
	}

	onMount(async () => {
		fetchRoutes()
		fetchStates()
	})
</script>

<svelte:head>
  {@html atomOneDark}
</svelte:head>

<Navbar />
<div class="d-flex" class:toggled={isSidebarToggled} id="wrapper">
	<Sidebar />
	<div id="page-content-wrapper" class="border-top">
		<div class="container-fluid" id="content">
			{#if routes}
				{#each Object.keys(routes) as route}
        	{#each METHODS as method}
          	{#if routes[route][method]}
							<RouteSection route={{...routes[route][method], method}} />
						{/if}	
					{/each}
				{/each}
			{/if}	
		</div>
	</div>
</div>
<AlertToast />

<style lang="scss">
	@import "./custom.scss";

	#wrapper {
		overflow-x: hidden;
		max-height: 100%;
    overflow: hidden;
	}

	#content {
		height: 100%;
    overflow: scroll;
	}

	#page-content-wrapper {
		width: 100%;
	}
</style>