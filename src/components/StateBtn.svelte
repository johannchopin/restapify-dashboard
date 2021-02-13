<script lang="ts">
  import { theme as themeStore } from '../stores'

  export let selected = false
  export let checked = false
  export let value: string
  export let sectionId: string
  export let onCheckState: () => void
  export let onClickState: () => void
</script>

<button 
  class="btn d-flex align-items-center m-0 btn-outline-success"
  class:btn-outline-success={!selected} 
  class:btn-success={selected} 
  on:click={onClickState}
>
  <input 
    type="radio" 
    name={`state-for-${sectionId}`} 
    class="mb-0 me-1" 
    checked={checked} 
    on:click={onCheckState}
  >{value}
</button>
