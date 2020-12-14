<script lang="ts">
	import { onMount } from 'svelte'
	import RouteSection from './components/RouteSection.svelte'
	import Navbar from './components/Navbar.svelte'
	import Sidebar from './components/Sidebar.svelte'

  import { METHODS } from './const'

	// S T O R E S
	import { routes as routesStore } from './stores'

	// T Y P E S
	import type { GetRoutesResponse } from './types'

	import api from './axiosStore'

	let routes: GetRoutesResponse | null = null
	let isSidebarToggled = true

	routesStore.subscribe(value => {
		routes = value
	})

	onMount(async () => {
		api.get<GetRoutesResponse>('/routes')
		.then(function (response) {
			routesStore.set(response.data)
		})
		.catch(function (error) {
			console.log(error);
		})
	})
</script>

<Navbar />
<div class="d-flex" class:toggled={isSidebarToggled} id="wrapper">
	<Sidebar />
	<div id="page-content-wrapper">
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