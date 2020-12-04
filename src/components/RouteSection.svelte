<script  lang="ts">
  import Route from './Route.svelte'
  import LinkToCopy from './LinkToCopy.svelte'

  import { getRouteSectionId } from '../utils'

  export let route: RouteResponse

  const sectionId = getRouteSectionId(route)

  const getStatusColor = (): string => {
    if (route.statusCode < 300) {
      return 'text-success'
    } 
    
    if (route.statusCode < 400) {
      return 'text-warning'
    } 
    
    return 'text-danger'
  }
</script>

<section class="route">
  <header class="d-flex" id={sectionId}>
    <LinkToCopy link={window.location.origin + '#' + sectionId} />
    <Route route={route} />
    <p class={`status ${getStatusColor()} font-weight-bold`}>{route.statusCode}</p>
  </header>

  <code><pre>{route.body}</pre></code>
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