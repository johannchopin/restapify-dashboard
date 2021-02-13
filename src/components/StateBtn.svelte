<script lang="ts">
  import { theme as themeStore } from '../stores'
  import Icon from './Icon/Icon.svelte'

  export let selected = false
  export let checked = false
  export let value: string
  export let sectionId: string
  export let onCheckState: () => void
  export let onClickState: () => void
</script>

<div class="state-btn btn-group pt-1" role="group">
  <button 
    class="btn d-flex align-items-center m-0 btn-outline-success fw-bold"
    class:btn-outline-success={!checked} 
    class:btn-success={checked} 
    on:click={onCheckState}
  >
    {value}
  </button>
   <button
    class="btn d-flex align-items-center m-0 btn-outline-success"
    class:btn-outline-success={!selected} 
    class:btn-success={selected} 
    on:click={onClickState}
  >
    <Icon name='eye' />
  </button>
</div>


