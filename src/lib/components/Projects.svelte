<script lang="ts">
  import { onMount } from 'svelte';
  import { _, json } from 'svelte-i18n';
   
  let section: HTMLElement;
  let visible = $state(false);
  
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
              {#each $json('projects.dashboard.tags') as tag}
                <span class="tag">{tag}</span>
              {/each}
              <button class="project-link">{$_('projects.view')}</button>
            </div>
          </div>
          <div class="project-arrow">→</div>
        </div>
        <div class="project-card reveal" class:visible={visible} style="transition-delay: 0.24s">
          <div class="project-info">
            <div class="project-number">02</div>
            <div class="project-title">{$_('projects.ecommerce.title')}</div>
            <div class="project-desc">{$_('projects.ecommerce.desc')}</div>
            <div class="project-meta">
              {#each $json('projects.ecommerce.tags') as tag}
                <span class="tag">{tag}</span>
              {/each}
              <button class="project-link">{$_('projects.view')}</button>
            </div>
          </div>
          <div class="project-arrow">→</div>
        </div>
        <div class="project-card reveal" class:visible={visible} style="transition-delay: 0.36s">
          <div class="project-info">
            <div class="project-number">03</div>
            <div class="project-title">{$_('projects.design.title')}</div>
            <div class="project-desc">{$_('projects.design.desc')}</div>
            <div class="project-meta">
              {#each $json('projects.design.tags') as tag}
                <span class="tag">{tag}</span>
              {/each}
              <button class="project-link">{$_('projects.view')}</button>
            </div>
          </div>
          <div class="project-arrow">→</div>
        </div>
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
  .project-link { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted2); text-decoration: none; border: 1px solid var(--border); padding: 0.4rem 1rem; border-radius: 3px; transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast); cursor: pointer; background: transparent; }
  .project-link:hover { color: var(--white); border-color: var(--border-hi); background: var(--accent-dim); }
  .project-arrow { font-size: 28px; color: var(--border); transition: color var(--transition-slow), transform var(--transition-slow); padding: 1rem; }
  .project-card:hover .project-arrow { color: var(--muted2); transform: translateX(4px); }
  
  @media (max-width: 768px) {
    .project-card { grid-template-columns: 1fr; }
    .project-arrow { display: none; }
  }
</style>