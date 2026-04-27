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
  
  const categories = [
    {
      title: 'Web Frontend',
      skills: [
        { icon: '/assets/reactjs 1.png', name: 'React / Next.js', desc: 'Fast and accessible interfaces focused on performance.', tags: ['React', 'Next.js', 'TypeScript'] },
        { icon: '/assets/svelte 1.png', name: 'Svelte', desc: 'Reactive web development with excellent performance.', tags: ['Svelte', 'SvelteKit', 'Stores'] },
        { icon: '/assets/angular 1.png', name: 'Angular', desc: 'Enterprise framework for complex applications.', tags: ['Components', 'Services', 'RxJS'] },
        { icon: '/assets/html5 1.png', name: 'HTML / CSS', desc: 'Semantic and styled markup.', tags: ['HTML5', 'CSS3', 'Responsive'] },
      ]
    },
    {
      title: 'Mobile',
      skills: [
        { icon: '/assets/flutter 1.png', name: 'Flutter', desc: 'Cross-platform apps for iOS and Android.', tags: ['Dart', 'Widgets', 'Material Design'] },
        { icon: '/assets/dart 1.png', name: 'Dart', desc: 'Compiled language with null safety.', tags: ['Null Safety', 'Async / Await', 'Streams'] },
        { icon: '/assets/kotlin 1.png', name: 'Kotlin', desc: 'Modern Android development.', tags: ['Coroutines', 'Jetpack Compose', 'MVVM'] },
      ]
    },
    {
      title: 'Backend / DB',
      skills: [
        { icon: '/assets/nodejs 1.png', name: 'Node.js / NestJS', desc: 'Robust APIs and scalable architectures.', tags: ['Node.js', 'NestJS', 'Express', 'REST APIs'] },
        { icon: '/assets/postgres 1.png', name: 'PostgreSQL', desc: 'Schema design and optimized queries.', tags: ['PostgreSQL', 'Prisma', 'Redis'] },
        { icon: '/assets/firebase 1.png', name: 'Firebase', desc: 'Auth, real-time database and hosting.', tags: ['Firestore', 'Auth', 'Cloud Functions'] },
      ]
    },
    {
      title: 'DevOps / Deploy',
      skills: [
        { icon: '/assets/docker 1.png', name: 'Docker', desc: 'Containers and infrastructure management.', tags: ['Docker', 'Containers', 'CI/CD'] },
        { icon: '/assets/heroku 1.png', name: 'Heroku', desc: 'Fast application deployment.', tags: ['Heroku', 'Dynos', 'Pipelines'] },
        { icon: '/assets/typescript 1.png', name: 'Vercel', desc: 'Deploy for modern frontends.', tags: ['Vercel', 'Edge Functions', 'SSR'] },
      ]
    },
    {
      title: 'Diseño',
      skills: [
        { icon: '/assets/figma 1.png', name: 'Figma', desc: 'From wireframes to interactive prototypes.', tags: ['Design Systems', 'Prototyping', 'Components'] },
        { icon: '/assets/illustrator 1.png', name: 'Illustrator', desc: 'Vector graphics and branding.', tags: ['Vectors', 'Icons', 'Branding'] },
        { icon: '/assets/after 1.png', name: 'After Effects', desc: 'Animations and motion graphics.', tags: ['Motion', 'Animations', 'Lottie'] },
      ]
    },
  ];

  const aiSkills = [
        { icon: '/assets/typescript 1.png', name: 'AI in Process', desc: 'Using AI as assistant to accelerate development and code review.', tags: ['GitHub Copilot', 'ChatGPT', 'Refactoring'] },
        { icon: '/assets/firebase 1.png', name: 'AI in Product', desc: 'Integrate AI models: NLP, chatbots and recommendations.', tags: ['OpenAI API', 'LangChain', 'Vector DB'] },
  ];
</script>

<section id="stack" class="stack-section" bind:this={section}>
  <div class="container">
    <div class="section-label reveal" class:visible>02 — Technologies</div>
    <h2 class="section-title reveal" class:visible>Mi<br>stack</h2>

    {#each categories as cat, catIdx}
      <div class="category-group">
        <h3 class="category-title">{cat.title}</h3>
        <div class="skills-grid">
          {#each cat.skills as skill, i}
            <div class="skill-card reveal" class:visible={visible} style="transition-delay: {(catIdx * 0.1) + (i * 0.05)}s">
              <div class="skill-icon"><img src={skill.icon} alt={skill.name} /></div>
              <div class="skill-name">{skill.name}</div>
              <div class="skill-desc">{skill.desc}</div>
              <div class="skill-tags">
                {#each skill.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
    
    <div class="category-group ai-group">
      <h3 class="category-title">Artificial Intelligence</h3>
      <div class="skills-grid ai-grid">
        {#each aiSkills as skill, i}
          <div class="skill-card ai-card reveal" class:visible={visible} style="transition-delay: {categories.length * 0.1 + (i * 0.05)}s">
            <div class="skill-icon"><img src={skill.icon} alt={skill.name} /></div>
            <div class="skill-name">{skill.name}</div>
            <div class="skill-desc">{skill.desc}</div>
            <div class="skill-tags">
              {#each skill.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
        {/each}
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