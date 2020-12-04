<script lang="ts">
  import Icon from './Icon/Icon.svelte'

  export let link

  const onClick = (): void => {
    navigator.clipboard.writeText(link)
  }
</script>

<a on:click={onClick} class="link-to-copy" href={link}>
  <Icon name='link' />
</a>

<style>
  a {
    font-size: 1.5em;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }
</style>