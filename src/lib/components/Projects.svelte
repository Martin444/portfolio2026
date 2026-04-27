<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { _, json } from 'svelte-i18n';
    
  let section: HTMLElement;
  let visible = $state(false);
  
  const getJson = (id: string): any => get(json)(id);
  
  onMount(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) visible = true; });
    }, { threshold: 0.1 });
    if (section) obs.observe(section);
    return () => obs.disconnect();
  });
</script>

<section id="projects" bind:this={section}>
  <div class="container">
    <div class="section-label reveal" class:visible>{@html $_('projects.label')}</div>
    <h2 class="section-title reveal" class:visible>{@html $_('projects.title')}</h2>
    <div class="projects-grid">
        <div class="project-card reveal" class:visible={visible} style="transition-delay: 0.12s">
          <div class="project-info">
            <div class="project-number">01</div>
            <div class="project-title">{$_('projects.dashboard.title')}</div>
            <div class="project-desc">{$_('projects.dashboard.desc')}</div>
            <div class="project-meta">
              {#each getJson('projects.dashboard.tags') as tag}
                <span class="tag">{tag}</span>
              {/each}
              <button class="project-link">{$_('projects.view')}</button>
            </div>
          </div>
          <div class="project-image-wrapper">
             <img src="/proyects/menucom1.png" alt="Menucom Project" loading="lazy" />
          </div>
        </div>
        <div class="project-card reveal" class:visible={visible} style="transition-delay: 0.24s">
          <div class="project-info">
            <div class="project-number">02</div>
            <div class="project-title">{$_('projects.ecommerce.title')}</div>
            <div class="project-desc">{$_('projects.ecommerce.desc')}</div>
            <div class="project-meta">
              {#each getJson('projects.ecommerce.tags') as tag}
                <span class="tag">{tag}</span>
              {/each}
              <button class="project-link">{$_('projects.view')}</button>
            </div>
          </div>
          <div class="project-image-wrapper">
             <img src="/proyects/phasioner1.png" alt="Phasioner Project" loading="lazy" />
          </div>
        </div>
        <div class="project-card reveal" class:visible={visible} style="transition-delay: 0.36s">
          <div class="project-info">
            <div class="project-number">03</div>
            <div class="project-title">{$_('projects.design.title')}</div>
            <div class="project-desc">{$_('projects.design.desc')}</div>
            <div class="project-meta">
              {#each getJson('projects.design.tags') as tag}
                <span class="tag">{tag}</span>
              {/each}
              <button class="project-link">{$_('projects.view')}</button>
            </div>
          </div>
          <div class="project-image-wrapper">
             <img src="/proyects/fichap1.png" alt="Fichap Project" loading="lazy" />
          </div>
        </div>
      </div>
  </div>
</section>

<style>
  section { position: relative; z-index: 1; padding: 7rem 0; }
  .projects-grid { display: grid; gap: 2rem; }
  .project-card {
    border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card);
    display: grid; grid-template-columns: 1fr 45%; align-items: stretch;
    transition: background var(--transition-slow), border-color var(--transition-slow), transform var(--transition-slow), box-shadow var(--transition-slow);
    position: relative; overflow: hidden; cursor: pointer;
  }
  .project-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--accent-mid); transform: scaleY(0); transform-origin: top; transition: transform 0.4s ease; z-index: 2; }
  .project-card:hover { border-color: var(--border-hi); background: var(--bg-surface); transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.2); }
  .project-card:hover::before { transform: scaleY(1); }
  
  .project-info {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .project-image-wrapper {
    overflow: hidden;
    position: relative;
    border-left: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.2);
  }
  .project-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .project-card:hover .project-image-wrapper img {
    transform: scale(1.08);
  }
  .project-number { font-family: var(--font-display); font-size: 64px; color: rgba(255,255,255,0.03); line-height: 1; margin-bottom: 1rem; position: absolute; top: 2rem; right: 2rem; }
  .project-title { font-size: 24px; font-weight: 600; color: var(--white); margin-bottom: 1rem; margin-top: 1rem; }
  .project-desc { font-size: 15px; color: var(--muted2); line-height: 1.7; max-width: 580px; }
  .project-meta { display: flex; align-items: center; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; }
  .project-link { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--white); text-decoration: none; border: 1px solid var(--accent-mid); padding: 0.6rem 1.2rem; border-radius: 4px; transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast); cursor: pointer; background: rgba(var(--accent-rgb), 0.1); margin-left: auto; }
  .project-card:hover .project-link { border-color: var(--accent); background: var(--accent); color: var(--bg-dark); font-weight: 600; }
  
  @media (max-width: 992px) {
    .project-card { grid-template-columns: 1fr; display: flex; flex-direction: column; }
    .project-image-wrapper { border-left: none; border-top: 1px solid var(--border); height: 300px; order: -1; border-bottom: 1px solid var(--border); }
    .project-number { position: static; margin-bottom: 0.5rem; font-size: 48px; }
    .project-title { margin-top: 0; }
    .project-card::before { width: 100%; height: 3px; bottom: auto; right: 0; transform: scaleX(0); transform-origin: left; }
    .project-card:hover::before { transform: scaleX(1); }
  }
  @media (max-width: 768px) {
    .project-info { padding: 2rem; }
    .project-meta { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
    .project-link { margin-left: 0; width: 100%; text-align: center; }
    .project-image-wrapper { height: 250px; }
  }
</style>