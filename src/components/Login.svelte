<script>
  import { slide } from 'svelte/transition'

  import {
    isAuthenticationError,
    isAuthenticated,
  } from '../store'
  import lightdm from '../constants/lightdm'
  import Form from './Form.svelte'

  let username ='devcote' 
  let password = ''

  let handleOnSubmit = () => {
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
  {:else if $isAuthenticated }
    <h1 transition:slide class="message">ACCESS GRANTED</h1>
  {:else}
  <Form {handleOnSubmit} {password} />
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
</style>
