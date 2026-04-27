<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  
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

<section id="experience" bind:this={section}>
  <div class="container">
    <div class="section-label reveal" class:visible>{@html $_('experience.label')}</div>
    <h2 class="section-title reveal" class:visible>{@html $_('experience.title')}</h2>
    <div class="timeline">
      <div class="timeline-item reveal" class:visible={visible} style="transition-delay: 0.12s">
        <div class="timeline-date">{$_('experience.jobs.openpass.date')}</div>
        <div class="timeline-role">{$_('experience.jobs.openpass.role')}</div>
        <div class="timeline-company">{$_('experience.jobs.openpass.company')}</div>
        <div class="timeline-desc">{$_('experience.jobs.openpass.desc')}</div>
      </div>
      <div class="timeline-item reveal" class:visible={visible} style="transition-delay: 0.24s">
        <div class="timeline-date">{$_('experience.jobs.growth.date')}</div>
        <div class="timeline-role">{$_('experience.jobs.growth.role')}</div>
        <div class="timeline-company">{$_('experience.jobs.growth.company')}</div>
        <div class="timeline-desc">{$_('experience.jobs.growth.desc')}</div>
      </div>
      <div class="timeline-item reveal" class:visible={visible} style="transition-delay: 0.36s">
        <div class="timeline-date">{$_('experience.jobs.fichap.date')}</div>
        <div class="timeline-role">{$_('experience.jobs.fichap.role')}</div>
        <div class="timeline-company">{$_('experience.jobs.fichap.company')}</div>
        <div class="timeline-desc">{$_('experience.jobs.fichap.desc')}</div>
      </div>
      <div class="timeline-item reveal" class:visible={visible} style="transition-delay: 0.48s">
        <div class="timeline-date">{$_('experience.jobs.catek.date')}</div>
        <div class="timeline-role">{$_('experience.jobs.catek.role')}</div>
        <div class="timeline-company">{$_('experience.jobs.catek.company')}</div>
        <div class="timeline-desc">{$_('experience.jobs.catek.desc')}</div>
      </div>
      <div class="timeline-item reveal" class:visible={visible} style="transition-delay: 0.6s">
        <div class="timeline-date">{$_('experience.jobs.freelance.date')}</div>
        <div class="timeline-role">{$_('experience.jobs.freelance.role')}</div>
        <div class="timeline-company">{$_('experience.jobs.freelance.company')}</div>
        <div class="timeline-desc">{$_('experience.jobs.freelance.desc')}</div>
      </div>
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