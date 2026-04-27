<script lang="ts">
  import { onMount } from 'svelte';
  
  let loaded = $state(false);
  
  onMount(() => {
    setTimeout(() => loaded = true, 100);
  });
</script>

<section class="hero">
  <div class="hero-glow"></div>
  <div class="hero-content" class:loaded>
    <div class="hero-tag">Creando proyectos memorables</div>
    <h1 class="hero-name">MARTIN FAREL</h1>
    <p class="hero-subtitle"><span>UI/UX Designer</span> - <span>Fullstack Developer and AI Implementation Specialist</span></p>
    <div class="hero-cta">
      <a href="#projects" class="btn btn-primary">Ver proyectos</a>
      <a href="#contact" class="btn btn-ghost">Contactar</a>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 8rem 2rem 5rem;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(200,205,224,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,205,224,0.018) 1px, transparent 1px);
    background-size: 72px 72px;
  }
  .hero-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 500px;
    pointer-events: none;
    background: radial-gradient(ellipse, rgba(22,30,60,0.9) 0%, transparent 70%);
  }
  .hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .hero-content.loaded {
    opacity: 1;
    transform: translateY(0);
  }
  .hero-tag {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--muted2);
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }
  .hero-tag::before, .hero-tag::after {
    content: '';
    display: block;
    width: 36px;
    height: 1px;
    background: var(--muted);
    opacity: 0.35;
  }
  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(56px, 12vw, 160px);
    line-height: 1;
    letter-spacing: 0.04em;
    color: var(--white);
    white-space: nowrap;
  }
  .hero-subtitle {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 1.5rem;
  }
  .hero-subtitle span { color: var(--muted2); }
  .hero-cta {
    margin-top: 3rem;
    display: flex;
    gap: 1rem;
  }
  .hero-scroll {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    opacity: 0;
    animation: fadeIn 1s 1.6s forwards;
  }
  .hero-scroll span {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .scroll-line {
    width: 1px;
    height: 44px;
    background: linear-gradient(to bottom, var(--muted2), transparent);
    animation: scrollPulse 2.2s ease-in-out infinite;
  }
  
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.25; }
    50% { opacity: 1; }
  }
  
  @media (max-width: 768px) {
    .hero { padding: 6rem 1rem 4rem; }
    .hero-name { font-size: clamp(28px, 12vw, 48px); white-space: nowrap; }
    .hero-cta { flex-direction: column; }
  }
</style>