<script lang="ts">
	import Icon from './Icon/Icon.svelte'
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <h1>
    <a class="navbar-brand" href="/">Restapify</a>
  </h1>
  <ul class="navbar-nav ml-auto nav-flex-icons">
    <li class="nav-item">
      <a class="nav-link" href="https://github.com/johannchopin/restapify" target="_blank">
        <Icon name='github'/>
      </a>
    </li>
    <li class="nav-item">
      <button id="toggleTheme" class="nav-link">
        <Icon name='circle-half'/>
      </button>
    </li>
  </ul>
</nav>

<style lang="scss">
  .navbar-nav {
    li {
      #toggleTheme {
        border: none;
      }
    }
  }
</style>