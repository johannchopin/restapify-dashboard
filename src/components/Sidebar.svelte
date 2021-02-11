<script lang="ts">
  import Route from './Route.svelte'
  import Searchbar from './Searchbar.svelte'
  import { METHODS } from '../const'

  import { getRouteSectionId } from '../utils'

  // S T O R E S
  import { routes as routesStore, theme as themeStore } from '../stores'

  // T Y P E S
  import type { GetRoutesResponse, RouteResponse } from '../types'

  const SIDEBAR_WIDTH_LOCALSTORAGE_KEY = 'sidebarWidth'

  let routes: GetRoutesResponse | null = null
  let filters = null

  let sidebarLineWidth = 6

  const getSiderbarWith = () => {
    return localStorage.getItem(SIDEBAR_WIDTH_LOCALSTORAGE_KEY) 
      || (300 + (sidebarLineWidth / 2)).toString()
  }

  let sidebarWidth = getSiderbarWith()

	routesStore.subscribe(value => {
		routes = value
  })

  const setFilter = (value: string) => {
    filters = value.trim().toLowerCase().split(' ')
  }

  const resizeSidebar = (elmt: MouseEvent) => {
    sidebarWidth = (elmt.pageX + (sidebarLineWidth / 2)).toString()
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

  // update sidebar width value in local storage when `sidebarWidth` change
  $: localStorage.setItem(SIDEBAR_WIDTH_LOCALSTORAGE_KEY, sidebarWidth)
</script>

<div class={`bg-${$themeStore.mode} border-right d-flex flex-column`} id="sidebar-wrapper" style={`width: ${sidebarWidth}px;`}>
  <Searchbar onInput={setFilter} />
  <ul class="list-group pb-3">
    {#if routes}
      {#each Object.keys(routes) as route}
        {#each METHODS as method}
          {#if routes[route][method] && routeMatchFilters(routes[route][method], filters)}
            <a href={`#${getRouteSectionId(routes[route][method])}`}>
              <li class="list-group-item">
                <Route route={{...routes[route][method], method}} />
              </li>
            </a>
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
    max-height: 100%;
    overflow: auto;

    a {
      display: block;
      transition: padding-left .3s;

      &:hover {
        color: inherit;
        padding-left: 2%;
      }
    }
  }


  :global(#wrapper.toggled #sidebar-wrapper)  {
		margin-left: 0;
	}

  .resize-sidebar-line {
    position: absolute;
    height: 100%;
    width: 6px;
    right: 0;
    cursor: col-resize;
    opacity: 0;
    transform: translateX(50%);
  }
</style>
