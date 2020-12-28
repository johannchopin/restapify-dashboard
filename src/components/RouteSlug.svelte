<script lang="ts">
  export let route: string

  interface RouteComponent {
    type?: 'variable'
    value: string 
  }
  const getRouteStructure = (): RouteComponent[] => {
    const routeComponents = route.split('/')
    return routeComponents
      .filter(routeComponent => {
        return routeComponent.trim().length > 0
      })
      .map(routeComponent => {
        const isVariable = routeComponent.startsWith('[') && routeComponent.endsWith(']')
          return {
            type: isVariable ? 'variable' : undefined,
            value: routeComponent
          }
        })
  }
</script>

<span class="route">
{#each getRouteStructure() as routeComponent}
   <span class="route-delimiter">/</span>
   <span class:route-variable={routeComponent.type === 'variable'}>{routeComponent.value}</span>
{/each}
</span>

<style type="scss">
  .route {
    display: flex;
  }

  .route-delimiter {
    margin: 0 1px;
  }

  .route-variable {
    opacity: .9;
    color: lightcoral;
  }

  :global(.bg-dark) {
    .route-variable {
      color: aquamarine;
    }
  }
</style>