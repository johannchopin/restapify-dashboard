<script lang="ts">
  import { Highlight } from 'svelte-highlight'
  import { json } from 'svelte-highlight/languages'

  import type { RouteResponse } from '../types'

  import { theme as themeStore } from '../stores'

  export let statusCode: number
  export let header: RouteResponse['header']
  export let body: string

  const getStatusColor = (statusCode: number): string => {
    if (statusCode < 300) {
      return 'text-success'
    }

    if (statusCode < 400) {
      return 'text-warning'
    }

    return 'text-danger'
  }
</script>

<table class={`table table-striped table-bordered table-${$themeStore.mode}`}>
  <tbody>
    <tr>
      <th scope="row">status code</th>
      <td class="w-100">
        <p class={`status ${getStatusColor(statusCode)} font-weight-bold m-0`}>
          {statusCode}
        </p>
    </td>
    </tr>
    {#if header}
       <tr>
        <th scope="row">header</th>
        <td class="w-100">
          <Highlight language={json} code={JSON.stringify(header, null, 2)} class="rounded m-0" />
        </td>
      </tr>
    {/if}
    {#if body}
      <tr>
        <th scope="row">body</th>
        <td class="w-100">
          <Highlight language={json} code={body} class="rounded m-0" />
        </td>
      </tr>
    {/if}
  </tbody>
</table>

<style lang="scss">
  table {
    max-width: 40vw;

    th {
      white-space: nowrap;
    }
  }
</style>