<script>
  import Layout from './components/SiteLayout.svelte'
  import Login from './components/Login.svelte';
  import {
    initiateAuthenticationComplete,
  } from './helpers/functions'
  import { onMount } from 'svelte'

  onMount(() => {
    initiateAuthenticationComplete()
  })
</script>

<Layout>
    <Login />
</Layout>
