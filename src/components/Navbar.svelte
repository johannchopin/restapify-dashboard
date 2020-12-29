<script lang="ts">
  import Icon from './Icon/Icon'
  import { theme as themeStore } from '../stores'
</script>

<nav class={`navbar navbar-expand-lg pl-4 pr-4 navbar-${$themeStore.mode} bg-${$themeStore.mode} shadow`}>
  <h1>
    <a class="navbar-brand" href="/">Restapify</a>
  </h1>
  <ul class="d-flex ml-auto mb-0">
    <li class="nav-item">
      <a class="nav-link" href="https://github.com/johannchopin/restapify" target="_blank">
        <Icon name='github' class={`${$themeStore.mode}`} />
      </a>
    </li>
    <li class="nav-item">
      <button id="toggleTheme" class="btn mb-0" on:click={themeStore.toggleMode}>
        <Icon name='circle-half' class={`${$themeStore.mode}`} />
      </button>
    </li>
  </ul>
</nav>

<style lang="scss">
  .navbar {
    z-index: 1;

    &.bg-dark {
      background: black!important;
      box-shadow: 0 .5rem 1rem rgba(0,0,0,.65)!important;
    }
  }

  ul {
    li {
      list-style-type: none;

      #toggleTheme {
        border: none;

        :global(.icon) {
          transform: rotate(-135deg);
        }
      }
    }
  }
</style>