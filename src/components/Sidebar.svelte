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

  let sidebarWidth = 400

	routesStore.subscribe(value => {
		routes = value
  })

  const setFilter = (value: string) => {
    filters = value.trim().toLowerCase().split(' ')
  }

  const resizeSidebar = (elmt) => {
    sidebarWidth = elmt.pageX
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

<div class={`bg-${$themeStore.mode} border-right d-flex flex-column`} id="sidebar-wrapper" style={`width: ${sidebarWidth}px;`}>
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
  <button class="resize-sidebar-line"
    on:mousedown={() => {
      document.addEventListener('mousemove', resizeSidebar)
    }}
    on:mouseup={() => {
      document.removeEventListener('mousemove', resizeSidebar)
    }}
  />
</div>

<style lang="scss">
	#sidebar-wrapper {
    position: relative;
		min-height: 100vh;
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

  .resize-sidebar-line {
    position: absolute;
    height: 100%;
    width: 6px;
    right: -3px;
    background-color: red;
    cursor: col-resize;
  }
</style>
