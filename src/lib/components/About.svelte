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
</script>

<section id="about" bind:this={section}>
  <div class="container">
    <div class="about-grid">
      <div class="about-left">
        <div class="section-label reveal" class:visible>01 — About Me</div>
        <h2 class="section-title reveal" class:visible><span class="title Who">Who am I</span></h2>
        <div class="about-text reveal reveal-delay-1" class:visible>
          <p>I'm <strong>Martin Farel</strong>, UI/UX Designer and Fullstack Developer focused on building interfaces that blend solid logic with intentional design.</p>
          <p>I specialize in end-to-end digital products — from research and wireframes to production deployment. I work with <strong>Svelte, React, Angular, Flutter, Kotlin and Dart</strong> as needed, <strong>NestJS/Node.js</strong> for backend, <strong>PostgreSQL</strong> for databases, and deploy on <strong>Heroku, Vercel and Firebase</strong>. For design I use <strong>Figma, Illustrator and After Effects</strong>.</p>
          <p>I believe the best software is invisible: it works so well the user never notices it.</p>
        </div>
        <div class="about-stats reveal reveal-delay-2" class:visible>
          <div class="stat-card"><span class="stat-number">8+</span><span class="stat-label">Years of experience</span></div>
          <div class="stat-card"><span class="stat-number">High</span><span class="stat-label">Completion rate</span></div>
        </div>
      </div>
      <div class="about-visual">
        <div class="about-frame">
          <div class="code-block">
            <div><span class="ln">01</span><span class="cm">// martin-farel.config.ts</span></div>
            <div><span class="ln">02</span></div>
            <div><span class="ln">03</span><span class="kw">const</span> <span class="fn">developer</span> = {'{'}</div>
            <div><span class="ln">04</span>&nbsp; name: <span class="st">'Martin Farel'</span>,</div>
            <div><span class="ln">05</span>&nbsp; role: [</div>
            <div><span class="ln">06</span>&nbsp; &nbsp; <span class="st">'Lead Fullstack Developer and AI Implementation Specialist'</span>,</div>
            <div><span class="ln">07</span>&nbsp; &nbsp; <span class="st">'UI/UX Designer'</span>,</div>
            <div><span class="ln">08</span>&nbsp; ],</div>
            <div><span class="ln">09</span>&nbsp; location: <span class="st">'Buenos Aires'</span>,</div>
            <div><span class="ln">10</span>&nbsp; stack: {'{'}</div>
            <div><span class="ln">11</span>&nbsp; &nbsp; frontend: [<span class="hi">'Svelte'</span>, <span class="hi">'React'</span>, <span class="hi">'Flutter'</span>],</div>
            <div><span class="ln">12</span>&nbsp; &nbsp; backend: [<span class="hi">'Node.js'</span>, <span class="hi">'Express'</span>],</div>
            <div><span class="ln">13</span>&nbsp; &nbsp; db: [<span class="hi">'PostgreSQL'</span>, <span class="hi">'MongoDB'</span>],</div>
            <div><span class="ln">14</span>&nbsp; &nbsp; design: [<span class="hi">'Figma'</span>],</div>
            <div><span class="ln">15</span>&nbsp; {'}'},</div>
            <div><span class="ln">16</span>&nbsp; available: <span class="hi">true</span>,</div>
            <div><span class="ln">17</span>{'}'}</div>
            <div><span class="ln">18</span></div>
            <div><span class="ln">19</span><span class="kw">export default</span> <span class="fn">developer</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  section { position: relative; z-index: 1; padding: 7rem 0; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  .about-text p { font-size: 15px; line-height: 1.9; color: var(--muted2); margin-bottom: 1.3rem; }
  .about-text p strong { color: var(--white); font-weight: 500; }
  .section-title { font-family: var(--font-display); font-size: 52px; line-height: 1.1; color: var(--white); letter-spacing: -0.02em; }
  .section-title .Who { display: inline; }
  .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2.5rem; }
  .stat-card { border: 1px solid var(--border); border-radius: 5px; padding: 1.4rem 1.6rem; background: var(--bg-card); position: relative; overflow: hidden; }
  .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(to right, var(--accent-mid), transparent); }
  .stat-number { font-family: var(--font-display); font-size: 46px; line-height: 1; color: var(--white); display: block; margin-bottom: 0.25rem; }
  .stat-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
  .about-visual { position: relative; height: 430px; }
  .about-frame { position: absolute; inset: 0; border: 1px solid var(--border); border-radius: 6px; overflow: hidden; background: var(--bg-card); }
  .code-block { padding: 2rem; font-family: var(--font-mono); font-size: 12px; line-height: 2.1; color: var(--muted); height: 100%; overflow: hidden; }
  .code-block .ln { color: rgba(92,98,128,0.35); margin-right: 1.5rem; user-select: none; }
  .code-block .kw { color: #8888cc; }
  .code-block .fn { color: #8ab4d4; }
  .code-block .st { color: #9cbf88; }
  .code-block .cm { color: rgba(92,98,128,0.55); }
  .code-block .hi { color: var(--accent); }
  
  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; gap: 3rem; }
    .about-visual { display: none; }
    .section-title { font-size: 38px; }
    .section-title .Who { display: block; }
  }
</style>