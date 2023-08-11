<script>
  import { slide } from 'svelte/transition'

  import {
    isAuthenticationError,
  } from '../store'
  import lightdm from '../constants/lightdm'

  let username ='devcote' 
  let password = ''

  const handleOnSubmit = () => {

    lightdm.cancel_authentication()
    lightdm.authenticate(username)

    setTimeout(() => {
      console.log(`responding for user ${username}`)
      lightdm.respond(password)
    }, 1000)
  }
</script>



    <form
      class="flex flex-col items-start justify-center"
      on:submit|preventDefault={handleOnSubmit}
    >
      <h1 class="user">Devcote</h1>

      {#if $isAuthenticationError}
        <span transition:slide class="mb-5 mt-5 text-green-400 error-message"
          >Invalid Password</span
        >
      {/if}

      <!-- svelte-ignore a11y-autofocus -->
      <input
        type="password"
        placeholder="Password"
        bind:value={password}
        autocomplete="off"
        autofocus
      />
    </form>

<style>
  form {
    font-family: 'june';
    background: rgba(0, 20, 0, 0.3);
    border: 1px solid #0f0;
    backdrop-filter: blur(10px); /* Blur effect */
    padding: 30px 50px;
  }

  .user {
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
