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

<section id="stack" class="stack-section" bind:this={section}>
  <div class="container">
    <div class="section-label reveal" class:visible>{@html $_('stack.label')}</div>
    <h2 class="section-title reveal" class:visible>{@html $_('stack.title')}</h2>
    
    <div class="category-group">
      <h3 class="category-title">{$_('stack.categories.frontend')}</h3>
      <div class="skills-grid">
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.05s">
          <div class="skill-icon"><img src="/assets/reactjs 1.png" alt="React" /></div>
          <div class="skill-name">{$_('stack.skills.react.name')}</div>
          <div class="skill-desc">{$_('stack.skills.react.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.react.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.1s">
          <div class="skill-icon"><img src="/assets/svelte 1.png" alt="Svelte" /></div>
          <div class="skill-name">{$_('stack.skills.svelte.name')}</div>
          <div class="skill-desc">{$_('stack.skills.svelte.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.svelte.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.15s">
          <div class="skill-icon"><img src="/assets/angular 1.png" alt="Angular" /></div>
          <div class="skill-name">{$_('stack.skills.angular.name')}</div>
          <div class="skill-desc">{$_('stack.skills.angular.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.angular.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.2s">
          <div class="skill-icon"><img src="/assets/html5 1.png" alt="HTML/CSS" /></div>
          <div class="skill-name">{$_('stack.skills.html.name')}</div>
          <div class="skill-desc">{$_('stack.skills.html.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.html.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="category-group">
      <h3 class="category-title">{$_('stack.categories.mobile')}</h3>
      <div class="skills-grid">
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.25s">
          <div class="skill-icon"><img src="/assets/flutter 1.png" alt="Flutter" /></div>
          <div class="skill-name">{$_('stack.skills.flutter.name')}</div>
          <div class="skill-desc">{$_('stack.skills.flutter.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.flutter.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.3s">
          <div class="skill-icon"><img src="/assets/dart 1.png" alt="Dart" /></div>
          <div class="skill-name">{$_('stack.skills.dart.name')}</div>
          <div class="skill-desc">{$_('stack.skills.dart.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.dart.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.35s">
          <div class="skill-icon"><img src="/assets/kotlin 1.png" alt="Kotlin" /></div>
          <div class="skill-name">{$_('stack.skills.kotlin.name')}</div>
          <div class="skill-desc">{$_('stack.skills.kotlin.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.kotlin.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="category-group">
      <h3 class="category-title">{$_('stack.categories.backend')}</h3>
      <div class="skills-grid">
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.4s">
          <div class="skill-icon"><img src="/assets/nodejs 1.png" alt="Node.js" /></div>
          <div class="skill-name">{$_('stack.skills.node.name')}</div>
          <div class="skill-desc">{$_('stack.skills.node.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.node.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.45s">
          <div class="skill-icon"><img src="/assets/postgres 1.png" alt="PostgreSQL" /></div>
          <div class="skill-name">{$_('stack.skills.postgres.name')}</div>
          <div class="skill-desc">{$_('stack.skills.postgres.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.postgres.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.5s">
          <div class="skill-icon"><img src="/assets/firebase 1.png" alt="Firebase" /></div>
          <div class="skill-name">{$_('stack.skills.firebase.name')}</div>
          <div class="skill-desc">{$_('stack.skills.firebase.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.firebase.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="category-group">
      <h3 class="category-title">{$_('stack.categories.devops')}</h3>
      <div class="skills-grid">
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.55s">
          <div class="skill-icon"><img src="/assets/docker 1.png" alt="Docker" /></div>
          <div class="skill-name">{$_('stack.skills.docker.name')}</div>
          <div class="skill-desc">{$_('stack.skills.docker.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.docker.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.6s">
          <div class="skill-icon"><img src="/assets/heroku 1.png" alt="Heroku" /></div>
          <div class="skill-name">{$_('stack.skills.heroku.name')}</div>
          <div class="skill-desc">{$_('stack.skills.heroku.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.heroku.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.65s">
          <div class="skill-icon"><img src="/assets/typescript 1.png" alt="Vercel" /></div>
          <div class="skill-name">{$_('stack.skills.vercel.name')}</div>
          <div class="skill-desc">{$_('stack.skills.vercel.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.vercel.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="category-group">
      <h3 class="category-title">{$_('stack.categories.design')}</h3>
      <div class="skills-grid">
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.7s">
          <div class="skill-icon"><img src="/assets/figma 1.png" alt="Figma" /></div>
          <div class="skill-name">{$_('stack.skills.figma.name')}</div>
          <div class="skill-desc">{$_('stack.skills.figma.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.figma.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.75s">
          <div class="skill-icon"><img src="/assets/illustrator 1.png" alt="Illustrator" /></div>
          <div class="skill-name">{$_('stack.skills.illustrator.name')}</div>
          <div class="skill-desc">{$_('stack.skills.illustrator.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.illustrator.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card reveal" class:visible={visible} style="transition-delay: 0.8s">
          <div class="skill-icon"><img src="/assets/after 1.png" alt="After Effects" /></div>
          <div class="skill-name">{$_('stack.skills.after.name')}</div>
          <div class="skill-desc">{$_('stack.skills.after.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.skills.after.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>
    
    <div class="category-group ai-group">
      <h3 class="category-title">{$_('stack.ai')}</h3>
      <div class="skills-grid ai-grid">
        <div class="skill-card ai-card reveal" class:visible={visible} style="transition-delay: 0.85s">
          <div class="skill-icon"><img src="/assets/typescript 1.png" alt="AI Process" /></div>
          <div class="skill-name">{$_('stack.aiSkills.process.name')}</div>
          <div class="skill-desc">{$_('stack.aiSkills.process.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.aiSkills.process.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="skill-card ai-card reveal" class:visible={visible} style="transition-delay: 0.9s">
          <div class="skill-icon"><img src="/assets/firebase 1.png" alt="AI Product" /></div>
          <div class="skill-name">{$_('stack.aiSkills.product.name')}</div>
          <div class="skill-desc">{$_('stack.aiSkills.product.desc')}</div>
          <div class="skill-tags">
            {#each $_('stack.aiSkills.product.tags') as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .stack-section { background: var(--bg-navy); position: relative; z-index: 1; padding-bottom: 6rem; }
  .category-group { margin-top: 2.5rem; }
  .category-group:first-of-type { margin-top: 2rem; }
  .category-title { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 1.25rem; padding-left: 1px; }
  .skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
  .ai-grid { grid-template-columns: repeat(2, 1fr); max-width: 50%; }
  .skill-card {
    border: 1px solid var(--border); border-radius: 5px; padding: 1.75rem; background: var(--bg-card);
    transition: background var(--transition-slow), border-color var(--transition-slow);
    position: relative; overflow: hidden; cursor: default;
  }
  .skill-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: var(--accent-mid); transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease; }
  .skill-card:hover { border-color: var(--border-hi); background: var(--bg-surface); }
  .skill-card:hover::after { transform: scaleX(1); }
  .skill-icon { width: 28px; height: 28px; margin-bottom: 1rem; }
  .skill-icon img { width: 100%; height: 100%; object-fit: contain; }
  .ai-card { border-color: rgba(139, 92, 246, 0.3); }
  .ai-card::after { background: linear-gradient(90deg, #8b5cf6, transparent); }
  .ai-card:hover { border-color: rgba(139, 92, 246, 0.6); box-shadow: 0 0 30px rgba(139, 92, 246, 0.1); }
  .skill-name { font-size: 15px; font-weight: 500; color: var(--white); margin-bottom: 0.4rem; }
  .skill-desc { font-size: 12px; color: var(--muted2); line-height: 1.6; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1rem; }
  .tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); background: rgba(255,255,255,0.03); padding: 0.3rem 0.5rem; border-radius: 3px; }
  
  @media (max-width: 1024px) {
    .skills-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 768px) {
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .ai-grid { grid-template-columns: 1fr; max-width: 100%; }
    .category-title { font-size: 10px; }
  }
  @media (max-width: 480px) {
    .skills-grid { grid-template-columns: 1fr; }
  }
</style>