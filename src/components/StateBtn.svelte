<script lang="ts">
  import { theme as themeStore } from '../stores'
  import Icon from './Icon/Icon.svelte'

  export let selected = false
  export let checked = false
  export let value: string
  export let sectionId: string
  export let onCheckState: () => void
  export let onClickState: () => void

  const getInvertedMode = (mode: string): string => {
    return mode === 'light' ? 'dark' : 'light'
  }
</script>

<div class="state-btn btn-group pt-1" role="group">
  <button 
    class={`btn d-flex align-items-center m-0 fw-bold ${checked ? `btn-${getInvertedMode($themeStore.mode)}` : `btn-outline-${getInvertedMode($themeStore.mode)}`}`}
    on:click={onCheckState}
  >
    {value}
  </button>
   <button
    class={`btn d-flex align-items-center m-0 ${selected ? `btn-${getInvertedMode($themeStore.mode)}` : `btn-outline-${getInvertedMode($themeStore.mode)}`}`}
    on:click={onClickState}
  >
    <Icon name='eye' />
  </button>
</div>


