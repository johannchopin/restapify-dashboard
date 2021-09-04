<script lang="ts">
  import { onMount } from 'svelte'
  import Icon from './Icon/Icon.svelte'
  import { theme as themeStore } from '../stores'
  import api from '../axiosStore'
  import type { GetLocalizesResponse, GetLocalizeResponse } from '../types/api'

  let localizes: string[] = []
  let localize: string = '...'

  const fetchLocalizes = (): void => {
    api.get<GetLocalizesResponse>('/configs/locales')
      .then((response) => {
        localizes = response.data
      })
  }

  const fetchLocalize = (): void => {
    api.get<GetLocalizeResponse>('/configs/locale')
      .then((response) => {
        localize = response.data.locale
      })
  }

  onMount(() => {
    fetchLocalize()
    fetchLocalizes()
  })
</script>

<div 
  class={`locale-select position-relative btn btn-outline-${$themeStore.mode === 'light' ? 'dark' : 'light'} d-flex align-items-center`}
  title="update API's locale"
>
  <select bind:value={localize} class="opacity-0 p-0 m-0 position-absolute w-100 h-100 start-0">
    {#each localizes as localizeOpt}
       <option value={localizeOpt}>{localizeOpt}</option>
    {/each}
  </select>
  
  <Icon name='globe' class="me-1" /> {localize}
</div>

<style lang="scss">
  select {
    opacity: 0;
    cursor: pointer;
  }
</style>
