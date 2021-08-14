<script lang="ts">
  import Searchbar from './Searchbar.svelte'
  import RoutesList from './RoutesList.svelte'
  import Footer from './Footer.svelte'
  import { DEFAULT_SIDEBAR_WIDTH } from '../../const'

  // S T O R E S
  import { apiInfos as apiInfosStore, theme as themeStore } from '../../stores'

  // T Y P E S
  import type { GetApiInfosResponse } from '../../types'

  const SIDEBAR_WIDTH_LOCALSTORAGE_KEY = 'sidebarWidth'

  let apiInfos: GetApiInfosResponse | null = null
  let filters: string[] | null = null

  let sidebarLineWidth = 6

  const getSiderbarWith = () => {
    return localStorage.getItem(SIDEBAR_WIDTH_LOCALSTORAGE_KEY) 
      || (DEFAULT_SIDEBAR_WIDTH + (sidebarLineWidth / 2)).toString()
  }

  let sidebarWidth = getSiderbarWith()

	apiInfosStore.subscribe(value => {
		apiInfos = value
  })

  const setFilter = (value: string) => {
    filters = value.trim().toLowerCase().split(' ')
  }

  const resizeSidebar = (elmt: MouseEvent) => {
    sidebarWidth = (elmt.pageX + (sidebarLineWidth / 2)).toString()
  }

  // update sidebar width value in local storage when `sidebarWidth` change
  $: localStorage.setItem(SIDEBAR_WIDTH_LOCALSTORAGE_KEY, sidebarWidth)
</script>

<div class={`bg-${$themeStore.mode} border-right d-flex flex-column`} id="sidebar-wrapper" style={`width: ${sidebarWidth}px;`}>
  <Searchbar onInput={setFilter} />
  {#if apiInfos?.routes}
    <RoutesList routes={apiInfos.routes} {filters} />
  {/if}
  <Footer />
  <button class="resize-sidebar-line"
    on:mousedown={() => {
      document.addEventListener('mousemove', resizeSidebar)
    }}
    on:mouseup={() => {
      document.removeEventListener('mousemove', resizeSidebar)
    }}
  />
</div>

<style lang="scss">
	#sidebar-wrapper {
    position: relative;
		transition: margin .25s ease-out;
  }
  
  #sidebar-wrapper :global(.route)  {
    :global(h3) {
      font-size: .7em;
    }

    :global(.badge) {
      font-size: .6em;
    }
  }

	#sidebar-wrapper .sidebar-heading {
		padding: 0.875rem 1.25rem;
		font-size: 2em;
	}

  :global(#wrapper.toggled #sidebar-wrapper)  {
		margin-left: 0;
	}

  .resize-sidebar-line {
    position: absolute;
    height: 100%;
    width: 6px;
    right: 0;
    background-color: transparent;
    border: none;
    cursor: col-resize;
    transform: translateX(50%);

    &:hover {
      &::after {
        opacity: 1;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      height: 95%;
      width: 2px;
      background-color: var(--bs-secondary);
      transform: translateY(-50%);
      opacity: 0;
    }
  }

  :global(.bg-dark) .resize-sidebar-line::after {
    background-color: var(--bs-light);
  }
</style>
