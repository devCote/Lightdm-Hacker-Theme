<script>
  import { onMount } from "svelte"
  import Matrix from "../constants/matrix"

  let canvas;

  const matrixOptions = {
    font_size: 26,
    width: window.innerWidth,
    height: window.innerHeight,
    font: 'monospace',
    color: '#0f0',
    columns: 0,
    speed: 3,
    background: 'rgba(0,0,0, 0.05)'
  }

  onMount(() => {
    const matrix = new Matrix(canvas, matrixOptions)
    matrix.start()
  })

</script>

<canvas bind:this={canvas} class="absolute top-0 bottom-0 -z-10" />
<div class="sitelayout-wrapper text-green-200 dark:text-green-400 bg-cover bg-center z-10">
  <main class="main main-wrapper">
    <slot />
  </main>
</div>
