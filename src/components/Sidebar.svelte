<script lang="ts">
  import Route from './Route'
  import Searchbar from './Searchbar'
  import { METHODS } from '../const'

  import { getRouteSectionId } from '../utils'

  // S T O R E S
  import { routes as routesStore, theme as themeStore } from '../stores'

  // T Y P E S
  import type { GetRoutesResponse, RouteResponse } from '../types'

  let routes: GetRoutesResponse | null = null
  let filters = null

	routesStore.subscribe(value => {
		routes = value
  })

  const setFilter = (value: string) => {
    filters = value.trim().toLowerCase().split(' ')
  }

  const routeMatchFilters = (routesToFilter: RouteResponse, filtersToApply: string[] | null): boolean => {
    const infosToMatch = `${routesToFilter.method} ${routesToFilter.route}`.toLowerCase()
    if (filtersToApply) {
      return filtersToApply.every((filter) => {
        return infosToMatch.includes(filter)
      })
    }
    
    return true
  }
</script>

<div class={`bg-${$themeStore.mode} border-right d-flex flex-column`} id="sidebar-wrapper">
  <Searchbar onInput={setFilter} />
  <ul class="list-group pb-3">
    {#if routes}
      {#each Object.keys(routes) as route}
        {#each METHODS as method}
          {#if routes[route][method] && routeMatchFilters(routes[route][method], filters)}
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
		margin-left: -15rem;
		transition: margin .25s ease-out;
  }
  
  #sidebar-wrapper :global(.route)  {
    :global(h3) {
      font-size: .7em;
    }

    :global(.badge) {
      font-size: .6em;
    }
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