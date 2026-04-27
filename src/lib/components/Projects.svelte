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
  
  const projects = [
    { number: '01', title: 'Dashboard Analytics', desc: 'Real-time data visualization platform for business metrics. Integration with multiple sources, interactive charts and report exports.', tags: ['SvelteKit', 'Node.js', 'PostgreSQL'] },
    { number: '02', title: 'E-Commerce Platform', desc: 'Complete online store with cart, payments, admin panel and inventory system. Responsive design focused on conversion and mobile UX.', tags: ['Next.js', 'Stripe', 'MongoDB'] },
    { number: '03', title: 'Design System Library', desc: 'Design system with over 60 documented components, design tokens, usage guidelines and integrated Storybook.', tags: ['React', 'Figma', 'Storybook'] },
  ];
</script>

<section id="projects" bind:this={section}>
  <div class="container">
    <div class="section-label reveal" class:visible>03 — Work</div>
    <h2 class="section-title reveal" class:visible>Featured<br>Projects</h2>
    <div class="projects-grid">
      {#each projects as project, i}
        <div class="project-card reveal" class:visible={visible} style="transition-delay: {i * 0.12}s">
          <div class="project-info">
            <div class="project-number">{project.number}</div>
            <div class="project-title">{project.title}</div>
            <div class="project-desc">{project.desc}</div>
            <div class="project-meta">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
              <a href="#" class="project-link">Ver proyecto</a>
            </div>
          </div>
          <div class="project-arrow">→</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  section { position: relative; z-index: 1; padding: 7rem 0; }
  .projects-grid { display: grid; gap: 1.25rem; }
  .project-card {
    border: 1px solid var(--border); border-radius: 6px; padding: 2.5rem; background: var(--bg-card);
    display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: center;
    transition: background var(--transition-slow), border-color var(--transition-slow);
    position: relative; overflow: hidden; cursor: pointer;
  }
  .project-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--accent-mid); transform: scaleY(0); transform-origin: top; transition: transform 0.4s ease; }
  .project-card:hover { border-color: var(--border-hi); background: var(--bg-surface); }
  .project-card:hover::before { transform: scaleY(1); }
  .project-number { font-family: var(--font-display); font-size: 56px; color: rgba(200,205,224,0.05); line-height: 1; margin-bottom: 0.4rem; }
  .project-title { font-size: 21px; font-weight: 500; color: var(--white); margin-bottom: 0.5rem; }
  .project-desc { font-size: 14px; color: var(--muted2); line-height: 1.7; max-width: 580px; }
  .project-meta { display: flex; align-items: center; gap: 1rem; margin-top: 1.25rem; flex-wrap: wrap; }
  .project-link { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted2); text-decoration: none; border: 1px solid var(--border); padding: 0.4rem 1rem; border-radius: 3px; transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast); }
  .project-link:hover { color: var(--white); border-color: var(--border-hi); background: var(--accent-dim); }
  .project-arrow { font-size: 28px; color: var(--border); transition: color var(--transition-slow), transform var(--transition-slow); padding: 1rem; }
  .project-card:hover .project-arrow { color: var(--muted2); transform: translateX(4px); }
  
  @media (max-width: 768px) {
    .project-card { grid-template-columns: 1fr; }
    .project-arrow { display: none; }
  }
</style>