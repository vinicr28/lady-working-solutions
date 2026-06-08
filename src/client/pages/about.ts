export function renderAbout(): string {
  return `
  <div class="page">
    <div class="container">
      <!-- Mission -->
      <section class="section">
        <div class="about-hero-grid">
          <div>
            <h1>Sobre a Lady Working Solutions</h1>
            <p class="mt-md">
              <strong>11 milhões de mulheres brasileiras</strong> deixaram o mercado para cuidar de alguém.
              Nossa missão é reconectar essas profissionais talentosas a empresas que precisam de talentos remotos.
            </p>
          </div>
          <div class="about-hero-image">
            <img src="/assets/images/team/team-diverse-women.jpg" alt="Equipe diversa de mulheres profissionais" />
          </div>
        </div>
      </section>

      <!-- Team -->
      <section class="section">
        <h2 class="section-title">Nosso Time</h2>
        <div class="grid grid-2">
          <div class="card team-card text-center">
            <div class="team-avatar">LG</div>
            <h3>Luis Guilherme</h3>
          </div>
          <div class="card team-card text-center">
            <div class="team-avatar">YY</div>
            <h3>Yago Yan</h3>
          </div>
          <div class="card team-card text-center">
            <div class="team-avatar">LA</div>
            <h3>Lucas Almeida</h3>
          </div>
          <div class="card team-card text-center">
            <div class="team-avatar">ES</div>
            <h3>Edson Sales</h3>
          </div>
        </div>
      </section>

      <!-- UN SDGs -->
      <section class="section">
        <h2 class="section-title">ODS da ONU</h2>
        <div class="grid grid-3">
          <div class="card sdg-card text-center">
            <span class="sdg-number">5</span>
            <h3>Igualdade de Gênero</h3>
          </div>
          <div class="card sdg-card text-center">
            <span class="sdg-number">8</span>
            <h3>Trabalho Decente</h3>
          </div>
          <div class="card sdg-card text-center">
            <span class="sdg-number">10</span>
            <h3>Redução das Desigualdades</h3>
          </div>
        </div>
      </section>

      <!-- Partnership Ecosystem -->
      <section class="section">
        <h2 class="section-title">Ecossistema de Parcerias</h2>
        <div class="card">
          <div class="partnership-flow">
            <div class="flow-item text-center">
              <img src="/assets/images/partners/partners-corporate.jpg" alt="Instituições de ensino" class="flow-img" />
              <h3>Instituições de Ensino</h3>
              <p class="text-muted">SEBRAE, SENAI, SENAC</p>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-item text-center">
              <img src="/assets/images/hero/hero-woman-laptop.jpg" alt="Lady Working Solutions" class="flow-img" />
              <h3>LWS</h3>
              <p class="text-muted">Curadoria & matching</p>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-item text-center">
              <img src="/assets/images/team/team-collaboration.jpg" alt="Empresas parceiras" class="flow-img" />
              <h3>Empresas Parceiras</h3>
              <p class="text-muted">Talentos qualificados</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Vision -->
      <section class="section">
        <div class="vision-card card text-center">
          <img src="/assets/images/impact/impact-work-life.jpg" alt="Equilíbrio trabalho e vida" class="vision-img" />
          <h2 class="mt-lg">Visão de Futuro</h2>
          <p class="mt-md" style="max-width:600px;margin-left:auto;margin-right:auto">
            Ser a principal plataforma B2B de alocação de talentos maternos do Brasil, expandindo para toda a América Latina até 2028.
          </p>
          <div class="mt-xl">
            <a href="#/register/company" class="btn btn-primary btn-lg">Seja uma Empresa Parceira</a>
          </div>
        </div>
      </section>
    </div>
  </div>
  `;
}
