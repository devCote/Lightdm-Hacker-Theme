<script>
  import { slide } from 'svelte/transition'
  import { isAuthenticationError, isAuthenticated } from '../store'
  import lightdm from '../constants/lightdm'

  const username = 'devcote'
  let password = ''

  function handleOnSubmit() {
    lightdm.cancel_authentication()
    lightdm.authenticate(username)
    setTimeout(() => {
      lightdm.respond(password)
    }, 1000)
  }
</script>

<div class="main_container flex flex-col items-start justify-center">
  {#if $isAuthenticationError}
    <h1 transition:slide class="message">ACCESS DENIED</h1>
  {:else if $isAuthenticated}
    <h1 transition:slide class="message">ACCESS GRANTED</h1>
  {:else}
    <form on:submit|preventDefault={handleOnSubmit}>
      <h1 class="user">Devcote</h1>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        type="password"
        placeholder="Password"
        bind:value={password}
        autocomplete="off"
        autofocus
      />
    </form>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
  {/if}
</div>

<style>
  .main_container {
    font-family: 'june';
    background: rgba(0, 20, 0, 0.3);
    border: 1px solid #0f0;
    backdrop-filter: blur(10px); /* Blur effect */
    padding: 30px 50px;
  }

  .message {
    color: #0f0;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 2em;
  }

    h1 {
    color: #0f0;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 2em;
  }

  input {
    color: #0f0;
    font-size: 1.5em;
    border: transparent;
    background: transparent !important;
    outline: none;
    margin-top: 10px;
  }

  input::placeholder {
    color: #0f0;
  }

</style>
