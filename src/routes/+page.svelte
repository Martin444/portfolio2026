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
  <title>Martin Farel — UI/UX Designer & Fullstack Developer</title>
  <meta name="description" content="Portfolio de Martin Farel - UI/UX Designer y Fullstack Developer especializado en experiencias digitales modernas con IA." />
  
  <!-- Open Graph / Facebook (WhatsApp usa estas etiquetas) -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Martin Farel — UI/UX Designer & Fullstack Developer" />
  <meta property="og:description" content="Portfolio de Martin Farel - UI/UX Designer y Fullstack Developer especializado en experiencias digitales modernas con IA." />
  <meta property="og:image" content="/assets/perfilmartin.jpg" />
  <meta property="og:image:secure_url" content="/assets/perfilmartin.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://martinfarel.dev" />
  <meta property="og:site_name" content="Martin Farel Portfolio" />
  <meta property="og:locale" content="es_ES" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Martin Farel — UI/UX Designer & Fullstack Developer" />
  <meta name="twitter:description" content="Portfolio de Martin Farel - UI/UX Designer y Fullstack Developer especializado en experiencias digitales modernas con IA." />
  <meta name="twitter:image" content="/assets/perfilmartin.jpg" />
  <meta name="twitter:image:alt" content="Foto de perfil de Martin Farel" />
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