<script lang="ts">
  import Icon from './Icon/Icon.svelte'
  import { theme as themeStore } from '../stores'

  export let onInput: (value: string) => void

  let value = ''

  $: onInput(value)
</script>

<div class="input-group d-flex p-3 m-0">
  <input
    maxlength="70"
    type="text"
    placeholder="Search for a route..."
    bind:value={value}
    class={`form-control rounded bg-${$themeStore.mode} m-0`}
  />
  <button class="btn m-0 p-0" class:visible={value !== ''} type="button" on:click={() => {value = ''}}>
    <Icon name='close' />
  </button>
</div>


<style lang="scss">
  input {
    font-size: 0.7em;
  }

  .btn {
    position: absolute;
    visibility: hidden;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>