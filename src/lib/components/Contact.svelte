<script lang="ts">
  import { onMount } from 'svelte';

  // Element reference
  let section: HTMLElement;
  // Reveal trigger
  let visible = $state(false);
  // Form fields
  let name = $state('');
  let email = $state('');
  let message = $state('');

   // Fallbacks / configuration
   const recipientEmail = 'mfarelback@gmail.com';
   const whatsappPhone = '543873413199'; // Argentina: 54 + número
   const apiEndpoint = (import.meta.env.VITE_CONTACT_API_ENDPOINT as string) || '';

  // UI state
  let loading = false;
  let submitted = false;
  let errorMsg = '';

  onMount(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) visible = true; });
    }, { threshold: 0.1 });
    if (section) obs.observe(section);
    return () => obs.disconnect();
  });

  async function handleSubmit() {
    // Reset feedback
    errorMsg = '';
    submitted = false;
    loading = true;

    // If a backend API endpoint is configured, use it
    if (apiEndpoint) {
      try {
        const res = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        if (res.ok) {
          submitted = true;
        } else {
          errorMsg = 'Message could not be sent. Please try again.';
        }
      } catch (err) {
          errorMsg = 'Network error while sending message.';
      } finally {
        loading = false;
        if (submitted) {
          name = '';
          email = '';
          message = '';
        }
      }
      return;
    }

     // Fallback: open WhatsApp (temporary)
    const text = encodeURIComponent(`Nuevo mensaje desde portfolio\n\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`);
    window.open(`https://wa.me/${whatsappPhone}?text=${text}`, '_blank');
    // Reset fields after attempting WhatsApp
    loading = false;
    name = '';
    email = '';
    message = '';
  }
</script>

<section id="contact" class="contact-section" bind:this={section}>
  <div class="container">
     <div class="section-label reveal" class:visible>05 — Contact</div>
    <h2 class="section-title reveal" class:visible>Let's Talk</h2>
    <div class="contact-inner">
      <form class="contact-form reveal reveal-delay-1" class:visible onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" bind:value={name} placeholder="Tu nombre">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" bind:value={email} placeholder="tu@email.com">
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" bind:value={message} placeholder="Tell me about your project..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message →'}
        </button>
      </form>
      <div class="contact-info reveal reveal-delay-2" class:visible>
        <p>Got an idea? Let's talk.</p>
        <div class="contact-links">
          <a href="mailto:mfarelback@gmail.com" class="contact-link">
             <span class="contact-link-badge">Email</span>mfarelback@gmail.com
           </a>
           <a href="https://www.linkedin.com/in/martin-farel-603a1615b" class="contact-link" target="_blank">
             <span class="contact-link-badge">LinkedIn</span>/in/martin-farel-603a1615b
           </a>
           <a href="https://github.com/Martin444" class="contact-link" target="_blank">
             <span class="contact-link-badge">GitHub</span>/Martin444
           </a>
          <a href="#" class="contact-link">
            <span class="contact-link-badge">CV</span>Download PDF
          </a>
        </div>
        {#if submitted}
          <p class="success" style="margin-top: 1rem; color: #4CAF50;">Thanks for your message! I've received it and will reply soon.</p>
        {:else if errorMsg}
          <p class="error" style="margin-top: 1rem; color: #f44336;">{errorMsg}</p>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .contact-section { background: var(--bg-navy); position: relative; z-index: 1; }
  .contact-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
  .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-group label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
  .form-group input, .form-group textarea { 
    background: var(--bg-card); 
    border: 1px solid var(--border); 
    border-radius: 3px; 
    padding: 0.85rem 1rem; 
    font-family: var(--font-body); 
    font-size: 14px; 
    color: var(--white); 
    transition: border-color var(--transition-base), background var(--transition-base); 
    outline: none; 
    resize: none; 
  }
  .form-group input::placeholder, .form-group textarea::placeholder { color: var(--muted); opacity: 0.5; }
  .form-group input:focus, .form-group textarea:focus { border-color: var(--border-hi); background: var(--bg-surface); }
  .form-group textarea { min-height: 130px; }
  .contact-info p { font-size: 15px; color: var(--muted2); line-height: 1.85; margin-bottom: 2.5rem; }
  .contact-links { display: flex; flex-direction: column; gap: 1rem; }
  .contact-link { display: flex; align-items: center; gap: 1rem; text-decoration: none; color: var(--muted2); font-size: 14px; transition: color var(--transition-fast); }
  .contact-link:hover { color: var(--white); }
  .contact-link-badge { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--muted2); border: 1px solid var(--border); padding: 0.35rem 0.7rem; border-radius: 3px; background: var(--accent-dim); min-width: 68px; text-align: center; }
  
  @media (max-width: 768px) {
    .contact-inner { grid-template-columns: 1fr; gap: 3rem; }
  }
</style>
