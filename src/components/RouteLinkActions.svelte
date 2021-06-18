<script lang="ts">
  import Icon from "./Icon/Icon.svelte"
  import { setClipboard } from "../utils";

  export let route: string

  let isLinkCopied = false

  const copyLinkToClipboard = () => {
    setClipboard(route)
    isLinkCopied = true

    setTimeout(() => {
      isLinkCopied = false
    }, 800)
  }

</script>

<div class="d-flex ms-4">
  <button class="btn btn-light p-1 m-1" on:click={copyLinkToClipboard}>
     <Icon name={isLinkCopied ? 'check' : 'clipboard'} />
  </button>
  <a href={route} target="_blank" class="btn btn-link p-1 m-1">
     <Icon name='link' />
  </a>
</div>

<style lang="scss">
  div :global(.icon.link) {
    transform: rotate(45deg);
  }
</style>