<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import SpaceBackground from '$lib/components/SpaceBackground.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Experience from '$lib/components/Experience.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Martin Farel — UI/UX Designer & Fullstack Developer and AI Implementation Specialist</title>
  <meta name="description" content="Portfolio de Martin Farel - UI/UX Designer y Fullstack Developer and AI Implementation Specialist especializado en experiencias digitales modernas." />
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Martin Farel — UI/UX Designer & Fullstack Developer and AI Implementation Specialist" />
  <meta property="og:description" content="Portfolio de Martin Farel - UI/UX Designer y Fullstack Developer and AI Implementation Specialist especializado en experiencias digitales modernas." />
  <meta property="og:image" content="https://martinfarel.dev/assets/perfilmartin.jpg" />
  <meta property="og:url" content="https://martinfarel.dev" />
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Martin Farel — UI/UX Designer & Fullstack Developer and AI Implementation Specialist" />
  <meta name="twitter:description" content="Portfolio de Martin Farel - UI/UX Designer y Fullstack Developer and AI Implementation Specialist especializado en experiencias digitales modernas." />
  <meta name="twitter:image" content="https://martinfarel.dev/assets/perfilmartin.jpg" />
</svelte:head>

<SpaceBackground />
<Navbar />

<main>
  <Hero />
  
  <div class="divider"></div>
  
  <About />
  
  <div class="divider"></div>
  
  <Stack />
  
  <div class="divider"></div>
  
  <Projects />
  
  <div class="divider"></div>
  
  <Experience />
  
  <div class="divider"></div>
  
  <Contact />
  
  <Footer />
</main>