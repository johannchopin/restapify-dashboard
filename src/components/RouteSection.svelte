<script  lang="ts">
  import Route from './Route.svelte'
  import RouteDataTable from './RouteDataTable.svelte'
  import LinkToCopy from './LinkToCopy.svelte'
  import StateBtn from './StateBtn.svelte'

	import api from '../axiosStore'
	import { states as statesStore } from '../stores'
  import type { RouteResponse } from '../types'

  import { getRouteSectionId } from '../utils'

  export let route: RouteResponse

  let states = null
  let selectedState = null
  let checkedState = null
  let matchingState = null

  statesStore.subscribe(value => {
    states = value
    matchingState = statesStore.getStateForRoute(value, route.route, route.method)
  })

  $: {
    if (matchingState) {
      selectedState = matchingState.state
      checkedState = matchingState.state
    }
  }

  $: statusCode = selectedState ? route.states[selectedState].statusCode : route.statusCode
  $: body = selectedState ? route.states[selectedState].body : route.body

  const sectionId = getRouteSectionId(route)

  const onCheckState = (state): void => {
    const updatedState = state ? 
      {
        route: route.route,
        state,
        method: route.method
      } : { route: route.route }

    api.put('/states', updatedState).then(({ status }) => {
      console.log(status)
    })

    checkedState = state
  }

  const onClickState = (state) => {
    selectedState = state
  }
</script>

<section class="route">
  <header class="d-flex mb-3" id={sectionId}>
    <LinkToCopy link={window.location.origin + '#' + sectionId} />
    <Route route={route} />
  </header>

  <div class="route-body d-flex">
    <div class="route-content w-100">
      <RouteDataTable {body} {statusCode} />
    </div>
    {#if route.states}
      <div class="route-states">
        <div class="btn-group-vertical">
          <StateBtn 
            value="Default" 
            selected={selectedState === null} 
            checked={checkedState === null}
            sectionId={sectionId} 
            onCheckState={() => { onCheckState(null) }} 
            onClickState={() => onClickState(null)}
          />
          {#each Object.keys(route.states) as state}
            <StateBtn 
              value={state} 
              sectionId={sectionId} 
              selected={selectedState === state} 
              checked={checkedState === state}
              onCheckState={() => { onCheckState(state) }} 
              onClickState={() => { onClickState(state) }}
            />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<style lang="scss">
  section.route {
    min-height: 100vh;
  }

  header {
    align-items: center;

    :global(.link-to-copy) {
        visibility: hidden;
      }

    &:hover {
      :global(.link-to-copy) {
        visibility: visible;
      }
    }
  }

  header p {
    margin-bottom: 0;
  }

  .route-body {
    :global(.hljs) {
      max-width: 40vw;
    }
  }
</style>