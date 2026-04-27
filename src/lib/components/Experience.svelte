<script lang="ts">
  import { onMount } from 'svelte';
  
  let section: HTMLElement;
  let visible = $state(false);
  
  onMount(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) visible = true; });
    }, { threshold: 0.1 });
    if (section) obs.observe(section);
    return () => obs.disconnect();
  });
  
  const jobs = [
    { date: '2023 — Present', role: 'Lead Fullstack Developer and AI Implementation Specialist', company: 'Growth Hackers Club', desc: 'Direct collaboration with CEO and product team to prototype, design and deliver UI/UX experiences through a lean design process: research, design, testing, iteration and development.' },
    { date: '2023 — Present', role: 'Flutter Developer', company: 'Fichap', desc: 'Led UI prototyping using the company\'s design system. Collaborated with product and development teams on core projects to improve product interfaces and experiences.' },
    { date: '2022 — 2023', role: 'UI Developer', company: 'Catatek', desc: 'Mobile UI and web application design for Catatek\'s R&D department and key clients.' },
    { date: '2018 — 2022', role: 'Graphic Designer', company: 'Freelance', desc: 'Graphic and web design for local businesses.' },
  ];
</script>

<section id="experience" bind:this={section}>
  <div class="container">
    <div class="section-label reveal" class:visible>04 — Trajectory</div>
    <h2 class="section-title reveal" class:visible>Experience</h2>
    <div class="timeline">
      {#each jobs as job, i}
        <div class="timeline-item reveal" class:visible={visible} style="transition-delay: {i * 0.12}s">
          <div class="timeline-date">{job.date}</div>
          <div class="timeline-role">{job.role}</div>
          <div class="timeline-company">{job.company}</div>
          <div class="timeline-desc">{job.desc}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  section { position: relative; z-index: 1; padding: 7rem 0; }
  .timeline { position: relative; padding-left: 2rem; }
  .timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: var(--border); }
  .timeline-item { position: relative; padding-bottom: 3.5rem; padding-left: 2.5rem; }
  .timeline-item::before { content: ''; position: absolute; left: -2rem; top: 6px; width: 7px; height: 7px; border-radius: 50%; background: var(--bg-deep); border: 1px solid var(--muted2); transform: translateX(-3px); }
  .timeline-date { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.6rem; }
  .timeline-role { font-size: 20px; font-weight: 500; color: var(--white); margin-bottom: 0.25rem; }
  .timeline-company { font-family: var(--font-mono); font-size: 11px; color: var(--muted2); margin-bottom: 1rem; letter-spacing: 0.08em; }
  .timeline-desc { font-size: 14px; color: var(--muted2); line-height: 1.8; max-width: 600px; }
</style>