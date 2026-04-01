export function renderFooter(): string {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="logo-icon">LWS</span>
          <p class="footer-tagline">Conectando mães talentosas ao mercado B2B</p>
        </div>
        <div class="footer-links">
          <h4>Plataforma</h4>
          <a href="#/jobs">Oportunidades</a>
          <a href="#/courses">Trilhas de Capacitação</a>
          <a href="#/about">Sobre Nós</a>
        </div>
        <div class="footer-links">
          <h4>Para Empresas</h4>
          <a href="#/register/company">Cadastrar Empresa</a>
          <a href="#/about">Parcerias</a>
        </div>
        <div class="footer-links">
          <h4>Equipe</h4>
          <p class="text-muted">Vinicius, Roberta, Paola & Giuliana</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Lady Working Solutions. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
  `;
}
