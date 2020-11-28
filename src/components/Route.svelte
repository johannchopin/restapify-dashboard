<script  lang="ts">
  import MethodBadge from './MethodBadge.svelte'
  import type { RouteResponse } from '../types'

  export let route: RouteResponse
</script>

<div class="route">
  <MethodBadge method={route.method} />
  <h2>{route.route}</h2>
</div>

<style>
  .route {
    display: flex;
    align-items: center;
  }

  .route :global(.badge.method) {
    margin-right: 5px;
  }
</style>