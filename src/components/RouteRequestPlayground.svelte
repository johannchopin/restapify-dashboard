<script lang="ts">
  import MethodBadge from './MethodBadge.svelte'
  import { getRouteStructure } from '../utils'
  import type { HttpMethod } from '../types'

	import api from '../axiosStore'

  export let method: HttpMethod
  export let route: string

  type Response {
    status: number
    header: Object
    body: null | Object | any[]
  }

  const routeStructure = getRouteStructure(route)

  let request = routeStructure.map((structure) => structure.value)
  let queries = null

  let response: Response | null = null

  const fetch = (): void => {
    let requestCall = `http://localhost:6768/api/${request.join('/')}`
    if (queries) requestCall += `?${queries}`
    api[method.toLowerCase()](requestCall)
      .then((response) => {
        console.log(response)
      })
  }
</script>

<div class="playground row">
  <div class="d-flex align-items-center">
    <div class="request d-flex align-items-center border border-1 border-secondary p-2 rounded-2">
      <MethodBadge {method} />
      <div class="d-flex ms-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            {#each routeStructure as routeComponent, i}
              <li class="breadcrumb-item d-flex align-items-center ps-1">
                {#if routeComponent.type === 'variable'}
                  <input 
                    type="text" 
                    class="form-control mb-0 py-0 px-1" 
                    placeholder={routeComponent.value} 
                    on:input={(event) => {
                      const requestClone = [...request]
                      requestClone[i] = event.target.value
                      request = requestClone
                    }}
                  />
                {:else}
                  {routeComponent.value}
                {/if}
              </li>
            {/each}
            <li class="d-flex align-items-center ps-1">
                ?<input 
                  type="text" 
                  class="form-control queries mb-0 py-0 px-1" 
                  placeholder="queries..."
                  bind:value={queries}
                >
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <button 
      type="button" 
      class="btn btn-outline-primary mb-0 ms-2"
      on:click={fetch}
      >Send
    </button>
  </div>
</div>

<style>
  button {
    height: 100%;
  }
  .request {
    width: fit-content;
  }

  .breadcrumb-item::before {
    padding-right: 0.25rem !important;
  }

  .form-control {
    width: 7em;
    font-size: .8em;
  }

  .form-control.queries {
    width: 10em;
  }
</style>