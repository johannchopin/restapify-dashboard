<script lang="ts">
  import Route from './Route.svelte'
  import { METHODS } from '../const'

  import { getRouteSectionId } from '../utils'

  // S T O R E S
  import { routes as routesStore } from '../stores'

  // T Y P E S
  import type { GetRoutesResponse } from '../types'

  let routes: GetRoutesResponse | null = null

	routesStore.subscribe(value => {
		routes = value
  })
</script>

<div class="bg-light border-right" id="sidebar-wrapper">
  <h1 class="sidebar-heading">Restapify</h1>
  <ul class="list-group">
    {#if routes}
      {#each Object.keys(routes) as route}
        {#each METHODS as method}
          {#if routes[route][method]}
            <li class="list-group-item">
              <a href={`#${getRouteSectionId(routes[route][method])}`}>
                <Route route={{...routes[route][method], method}} />
              </a>
            </li>
          {/if}
        {/each}
      {/each}
    {/if}	
  </ul>
</div>

<style lang="scss">
	#sidebar-wrapper {
		min-height: 100vh;
		margin-left: -15rem;
		transition: margin .25s ease-out;
  }
  
  #sidebar-wrapper :global(.route h3) {
    font-size: .9em;
  }

	#sidebar-wrapper .sidebar-heading {
		padding: 0.875rem 1.25rem;
		font-size: 2em;
	}

	#sidebar-wrapper .list-group {
    width: 15rem;
    max-height: 100%;
    overflow: scroll;
  }

  :global(#wrapper.toggled #sidebar-wrapper)  {
		margin-left: 0;
	}
</style>