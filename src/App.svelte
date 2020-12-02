<script lang="ts">
	import { onMount } from 'svelte'
	import Route from './components/Route.svelte'
	import Sidebar from './components/Sidebar.svelte'

	// S T O R E S
	import { routes as routesStore } from './stores'

	// T Y P E S
	import type { GetRoutesResponse } from './types'

	import api from './axiosStore'

	let routes: GetRoutesResponse | null = null
	let isSidebarToggled = true

	const routesStoreUnsubscribe = routesStore.subscribe(value => {
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

	const close = (): void => {
		api.get('/close')
	}

</script>

<div class="d-flex" class:toggled={isSidebarToggled} id="wrapper">

	<Sidebar />

	<div id="page-content-wrapper">

		<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
			<button class="btn btn-primary" on:click={() => {isSidebarToggled = !isSidebarToggled}}>Toggle Menu</button>
			<button class="btn btn-danger" on:click={close}>Close server</button>

			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav ml-auto mt-2 mt-lg-0">
					<li class="nav-item active">
						<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link</a>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Dropdown
						</a>
						<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
							<a class="dropdown-item" href="#">Action</a>
							<a class="dropdown-item" href="#">Another action</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Something else here</a>
						</div>
					</li>
				</ul>
			</div>
		</nav>

		<div class="container-fluid" id="content">
			{#if routes}
				{#each Object.keys(routes) as route}
					{#each Object.keys(routes[route]) as method}
						<Route route={{...routes[route][method], method}} />
					{/each}
				{/each}
			{/if}	
		</div>
	</div>
</div>

<style>
	#wrapper {
		overflow-x: hidden;
		max-height: 100%;
	}

	#page-content-wrapper {
		width: 100%;
	}
</style>