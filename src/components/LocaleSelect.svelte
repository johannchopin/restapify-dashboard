<script lang="ts">
  import { onMount } from 'svelte'
  import Icon from './Icon/Icon.svelte'
  import { theme as themeStore, alert as alertStore } from '../stores'
  import api from '../axiosStore'
  import type { GetLocalizesResponse, GetLocalizeResponse } from '../types/api'

  let localizes: string[] = []
  let localize: string = '...'

  const updateLocalize = (newLocalize: string): void => {
    api.put('/configs/locales', {
      localize: newLocalize
    }).then(() => {
      localize = newLocalize
    }).catch(() => {
      alertStore.show({type: 'danger', message: 'There was a problem with the localize update! Is the mocked server still running?'})
    })
  }

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
  class="locale-select position-relative btn d-flex align-items-center p-1"
  class:btn-outline-dark={$themeStore.mode === 'light'}
  class:btn-outline-light={$themeStore.mode === 'dark'}
  title="Update API's locale"
>
  <select value={localize} on:change={(e) => updateLocalize(e.currentTarget.value)} class="opacity-0 p-0 m-0 position-absolute w-100 h-100 start-0">
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
