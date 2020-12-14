<script lang="ts">
  import link from './icons/link.svg'
  import github from './icons/github.svg'
  import circleHalf from './icons/circle-half.svg'

  let className = ''

  type Name = 'link' | 'github' | 'circle-half'

  export let name: Name = 'github'
  export { className as class }


  const icons: {[name in Name]: any} = {
    'circle-half': circleHalf,
    'link': link,
    'github': github
  }
</script>

<style lang="scss">
  .icon {
    display: flex;
    width: 1em;

    :global(svg) {
      width: 1em;
    }
  }  
</style>

<i class={`icon ${className}`}>
  {@html icons[name]}
</i>