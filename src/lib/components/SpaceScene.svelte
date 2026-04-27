<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import * as THREE from 'three';
  
  const starCount = 1500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 3);
  
  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 40;
    positions[i3 + 1] = (Math.random() - 0.5) * 40;
    positions[i3 + 2] = -Math.random() * 40;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.06,
    color: 0xc8cde0,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true
  });
  
  let starsRef = $state<THREE.Points | undefined>(undefined);
  let time = 0;
  
  useTask((delta) => {
    time += delta;
    if (starsRef) starsRef.rotation.y = time * 0.03;
  });
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />

<T.Points 
  bind:ref={starsRef}
  {geometry} 
  {material} 
/>