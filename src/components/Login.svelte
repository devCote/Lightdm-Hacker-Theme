<script>
  import { slide } from 'svelte/transition'
  import { isAuthenticationError, isAuthenticated } from '../store'
  import lightdm from '../constants/lightdm'
  import Form from './Form.svelte'
    import { getLocalStorage, setLocalStorage } from 'src/helpers/functions'
    import { DEFAULT_SESSION } from 'src/constants/variables'

  const username = 'devcote'
  let password = ''
  let sessions = lightdm.sessions
  let currentSession = getLocalStorage(DEFAULT_SESSION) || sessions[0].key;

  const handleSession = () => {
    const currentSessionId = sessions.indexOf(currentSession)
    const totalSessions = sessions.lenght

    let newSessionId = currentSessionId + 1
    if (newSessionId >= totalSessions) newSessionId = 0

    currentSession = sessions[newSessionId].key
    setLocalStorage(DEFAULT_SESSION, currentSession)
  }

  const handleOnSubmit = () => {
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
    <Form {handleOnSubmit} {password} />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h1 on:click={handleSession} class="session">{currentSession}</h1>
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

  .session {
    cursor: pointer;
    align-self: flex-end; 
    color: #0f0;
    font-weight: bold;
  }

  .message {
    color: #0f0;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 2em;
  }
</style>
