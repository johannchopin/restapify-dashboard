<script lang="ts">
  import Route from '../Route.svelte'

  import type { GetRoutesResponse, RouteResponse } from '../../types'
  import { METHODS } from '../../const';
  import { getRouteSectionId } from '../../utils'

  export let routes: GetRoutesResponse
  export let filters: string[] | null


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

<ul class="list-group pb-3">
  {#each Object.keys(routes) as route}
    {#each METHODS as method}
      {#if routes[route][method] && routeMatchFilters(routes[route][method], filters)}
        <li class="list-group-item p-0">
          <a href={`#${getRouteSectionId(routes[route][method])}`} class="d-flex justify-content-between p-2">
            <Route route={{...routes[route][method], method}} />
            {#if routes[route][method].states}
              <span class="badge rounded-pill bg-light text-dark">
                {Object.keys(routes[route][method].states).length + 1}
              </span>
            {/if}
          </a>
        </li>
      {/if}
    {/each}
  {/each}
</ul>

<style lang="scss">
.list-group {
  max-height: 100%;
  overflow: auto;

  a {
    display: block;
    transition: padding-left .3s;

    &:hover,
    &:focus {
      color: inherit;
      padding-left: 5%!important;
    }
  }
}
</style>