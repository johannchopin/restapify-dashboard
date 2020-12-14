<script  lang="ts">
  import Route from './Route.svelte'
  import LinkToCopy from './LinkToCopy.svelte'
  import StateBtn from './StateBtn.svelte'

	import api from '../axiosStore'
	import { states as statesStore} from '../stores'
  import type { RouteResponse } from '../types'

  import { getRouteSectionId } from '../utils'

  export let route: RouteResponse

  
  let selectedState = null // TODO: Get it from api response
  let states
  
  statesStore.suscribe(value => {
    states = value
  })

  $: statusCode = selectedState ? route.states[selectedState].statusCode : route.statusCode
  $: body = selectedState ? route.states[selectedState].body : route.body

  const sectionId = getRouteSectionId(route)

  const getStatusColor = (statusCode): string => {
    if (statusCode < 300) {
      return 'text-success'
    } 
    
    if (statusCode < 400) {
      return 'text-warning'
    } 
    
    return 'text-danger'
  }
  const onCheckState = () => {
    api.put('/states', {
      route: route.route,
      state: selectedState
    }).then(({ status }) => {
      alert(status)
    })
  }

  const onClickState = (state) => {
    selectedState = state
  }
</script>

<section class="route">
  <header class="d-flex mb-3" id={sectionId}>
    <LinkToCopy link={window.location.origin + '#' + sectionId} />
    <Route route={route} />
    <p class={`status ${getStatusColor(statusCode)} font-weight-bold`}>
      {statusCode}
    </p>
  </header>

  <div class="route-body d-flex">
    <div class="route-content w-100">
      <code><pre>{body}</pre></code>
    </div>
    {#if route.states}
      <div class="route-states">
        <div class="btn-group-vertical">
          <StateBtn 
            value="Default" 
            selected={selectedState === null  } 
            sectionId={sectionId} 
            onCheckState={onCheckState} 
            onClickState={() => onClickState(null)}
          />
          {#each Object.keys(route.states) as state}
            <StateBtn 
              value={state} 
              sectionId={sectionId} 
              selected={selectedState === state} 
              onCheckState={onCheckState} 
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

  .status {
    margin-left: 2em;
  }
</style>