<script lang="ts">
  import { onMount } from 'svelte';
  
  let visible = $state(false);
  
  onMount(() => {
    const handleScroll = () => {
      visible = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

  <nav class:scrolled={visible}>
    <a href="/" class="nav-logo">
      <img src="/assets/perfilmartin.jpg" alt="Martin Farel" class="nav-avatar" />
      <span class="nav-name"><span>/</span>Martin Farel</span>
    </a>
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <a href="#contact" class="nav-cta">Let's Talk →</a>
</nav>

<style>
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 1.2rem 3rem; display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid var(--border); backdrop-filter: blur(20px);
    background: rgba(13,15,26,0.75);
    transition: padding var(--transition-slow), background var(--transition-slow);
  }
  nav.scrolled {
    padding: 0.8rem 3rem;
    background: rgba(13,15,26,0.95);
  }
  .nav-logo { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; }
  .nav-avatar {
    width: 36px; height: 36px; border-radius: 5px; border: 1px solid var(--border-hi);
    object-fit: cover;
  }
  .nav-name { font-family: var(--font-mono); font-size: 13px; color: var(--white); letter-spacing: 0.05em; }
  .nav-name span { color: var(--muted2); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--muted); text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--white); }
  .nav-cta {
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--white); text-decoration: none; border: 1px solid var(--border-hi);
    padding: 0.6rem 1.4rem; border-radius: 3px; transition: all 0.25s;
  }
  .nav-cta:hover { background: var(--accent-dim); }
  
  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
  }
</style>