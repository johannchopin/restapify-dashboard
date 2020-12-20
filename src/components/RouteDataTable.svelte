<script lang="ts">
  import { Highlight } from 'svelte-highlight'
  import { json } from 'svelte-highlight/languages'

  export let statusCode: number
  export let body: string

  const getStatusColor = (statusCode): string => {
    if (statusCode < 300) {
      return 'text-success'
    } 
    
    if (statusCode < 400) {
      return 'text-warning'
    } 
    
    return 'text-danger'
  }
</script>

<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <th scope="row">status code</th>
      <td class="w-100">
        <p class={`status ${getStatusColor(statusCode)} font-weight-bold m-0`}>
          {statusCode}
        </p>
    </td>
    </tr>
    <tr>
      <th scope="row">body</th>
      <td class="w-100">
        <Highlight language={json} code={body} class="rounded m-0" />
      </td>
    </tr>
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