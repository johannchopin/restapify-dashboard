<script lang="ts">
  import link from './icons/link.svg'
  import github from './icons/github.svg'
  import close from './icons/close.svg'
  import circleHalf from './icons/circle-half.svg'
  import book from './icons/book.svg'
  import eye from './icons/eye.svg'
  import clipboard from './icons/clipboard.svg'
  import check from './icons/check.svg'

  let className = ''

  type Name = 'link' | 'github' | 'circle-half' | 'close' | 'book' | 'eye' | 'clipboard' | 'check'

  export let name: Name = 'github'
  export { className as class }

  const icons: {[name in Name]: any} = {
    'circle-half': circleHalf,
    link,
    github,
    close,
    book,
    eye,
    clipboard,
    check
  }
</script>

<style lang="scss">
  .icon {
    display: flex;
    width: 1em;
    height: 1em;

    &.dark {
      color: white;
    }

    :global(svg) {
      width: 1em;
    }
  }  
</style>

<i class={`icon ${className}`}>
  {@html icons[name]}
</i>