<footer>
  <p>© 2025 Martin Farel — Todos los derechos reservados</p>
  <div class="footer-status">
    <div class="status-dot"></div>
    Disponible para nuevos proyectos
  </div>
</footer>

<style>
  footer {
    padding: 2rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border);
    position: relative;
    z-index: 1;
  }
  footer p { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; color: var(--muted); }
  .footer-status { display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; color: var(--muted); }
  .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #7cba8c; animation: pulse 2.5s ease-in-out infinite; }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  
  @media (max-width: 768px) {
    footer { flex-direction: column; gap: 1rem; text-align: center; }
  }
</style>