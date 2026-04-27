<script lang="ts">
  import { onMount } from 'svelte';
  import { Canvas } from '@threlte/core';
  import SpaceScene from './SpaceScene.svelte';
  
  let container: HTMLDivElement;
</script>

<div class="space-background" bind:this={container}>
  <Canvas>
    <SpaceScene />
  </Canvas>
</div>

<style>
  .space-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
  .space-background :global(canvas) {
    width: 100% !important;
    height: 100% !important;
  }
</style>