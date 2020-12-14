<script lang="ts">
  export let selected = false
  export let checked = false
  export let value: string
  export let sectionId: string
  export let onCheckState: () => void
  export let onClickState: () => void
</script>

<button 
  class="btn d-flex align-items-center m-0" 
  class:btn-secondary={!selected} 
  class:btn-primary={selected} 
  on:click={onClickState}
>
  <input 
    type="radio" 
    name={`state-for-${sectionId}`} 
    class="mb-0 mr-1" 
    checked={checked} 
    on:click={onCheckState}
  >{value}
</button>