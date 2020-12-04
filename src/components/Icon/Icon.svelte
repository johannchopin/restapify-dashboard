<script lang="ts">
  import link from './icons/link.svg'

  let className = ''
  let icon

  export let name: string
  export { className as class }

  $: switch (name) {
    case 'link':
      icon = link
      break
  
    default:
      break
  }
</script>

<style lang="scss">
  .icon {
    width: 1em;

    :global(svg) {
      width: 1em;
    }
  }  
</style>

<i class={`icon ${className}`}>
  {@html icon}
</i>