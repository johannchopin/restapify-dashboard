<script  lang="ts">
  import Route from './Route.svelte'

  import { getRouteSectionId } from '../utils'

  export let route: RouteResponse

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
  <header class="d-flex" id={getRouteSectionId(route)}>
    <Route route={route} />
    <p class={`status ${getStatusColor()} font-weight-bold`}>{route.statusCode}</p>
  </header>

  <code><pre>{route.body}</pre></code>
</section>

<style>
  section.route {
    min-height: 100vh;
  }

  header {
    align-items: center;
  }

  header p {
    margin-bottom: 0;
  }

  .status {
    margin-left: 2em;
  }
</style>