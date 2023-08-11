<script>
  export let password
  export let handleOnSubmit
</script>

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

<style>
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
