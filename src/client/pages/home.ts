import { api } from '../api.js';

export async function renderHome(): Promise<string> {
  return `
  <div class="home-page">
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-content">
          <h1 class="hero-title">Conectando mães talentosas ao mercado B2B</h1>
          <p class="hero-subtitle">Capacitação, alocação e impacto real para profissionais remotas.</p>
          <div class="hero-ctas">
            <a href="#/jobs" class="btn btn-primary btn-lg">Encontrar Oportunidades</a>
            <a href="#/register/company" class="btn btn-outline btn-lg">Cadastrar Empresa</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="/assets/images/hero/hero-remote-work.jpg" alt="Mulher trabalhando remotamente de casa" />
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section stats-section">
      <div class="container">
        <div class="grid grid-3">
          <div class="stat-card card text-center">
            <span class="stat-number">11M</span>
            <span class="stat-label">mulheres fora do mercado pela economia do cuidado</span>
          </div>
          <div class="stat-card card text-center">
            <span class="stat-number">2,5M</span>
            <span class="stat-label">mães que deixaram seus empregos</span>
          </div>
          <div class="stat-card card text-center">
            <span class="stat-number">60%</span>
            <span class="stat-label">das mães em home office lutam para conciliar trabalho e cuidado</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 3-Step Process -->
    <section class="section process-section">
      <div class="container">
        <h2 class="section-title">Como Funciona</h2>
        <div class="grid grid-3">
          <div class="card process-card text-center">
            <img src="/assets/images/jobs/jobs-professional-woman.jpg" alt="Profissional em busca de oportunidades" class="process-img" />
            <h3>1. Busca</h3>
            <p>Mapeamos habilidades e experiências de cada profissional.</p>
          </div>
          <div class="card process-card text-center">
            <img src="/assets/images/courses/courses-online-learning.jpg" alt="Mulher estudando online" class="process-img" />
            <h3>2. Capacitação</h3>
            <p>Trilhas em 6 áreas: atendimento, social media, AV, vendas, design e vídeo.</p>
          </div>
          <div class="card process-card text-center">
            <img src="/assets/images/team/team-collaboration.jpg" alt="Equipe colaborando" class="process-img" />
            <h3>3. Alocação</h3>
            <p>Conectamos profissionais capacitadas a empresas parceiras em modelo B2B.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Training Tracks -->
    <section class="section tracks-section">
      <div class="container">
        <h2 class="section-title">Trilhas de Capacitação</h2>
        <div class="grid grid-3">
          <div class="card track-card">
            <img src="/assets/images/course-thumbs/customer-service.jpg" alt="Atendimento ao cliente" class="track-img" />
            <h3>Atendimento ao Cliente</h3>
          </div>
          <div class="card track-card">
            <img src="/assets/images/course-thumbs/social-media.jpg" alt="Social media" class="track-img" />
            <h3>Social Media</h3>
          </div>
          <div class="card track-card">
            <img src="/assets/images/course-thumbs/virtual-assistant.jpg" alt="Assistência virtual" class="track-img" />
            <h3>Assistência Virtual</h3>
          </div>
          <div class="card track-card">
            <img src="/assets/images/course-thumbs/online-sales.jpg" alt="Vendas online" class="track-img" />
            <h3>Vendas Online</h3>
          </div>
          <div class="card track-card">
            <img src="/assets/images/course-thumbs/design.jpg" alt="Design básico" class="track-img" />
            <h3>Design Básico</h3>
          </div>
          <div class="card track-card">
            <img src="/assets/images/course-thumbs/video-editing.jpg" alt="Edição de vídeo" class="track-img" />
            <h3>Edição de Vídeo</h3>
          </div>
        </div>
        <div class="text-center mt-xl">
          <a href="#/courses" class="btn btn-primary">Ver Todas as Trilhas</a>
        </div>
      </div>
    </section>

    <!-- ESG Pillars -->
    <section class="section esg-section">
      <div class="container">
        <h2 class="section-title">Impacto ESG</h2>
        <div class="grid grid-3">
          <div class="card esg-card text-center">
            <span class="esg-badge">ODS 5</span>
            <h3>Igualdade de Gênero</h3>
          </div>
          <div class="card esg-card text-center">
            <span class="esg-badge">ODS 8</span>
            <h3>Trabalho Decente</h3>
          </div>
          <div class="card esg-card text-center">
            <span class="esg-badge">ODS 10</span>
            <h3>Redução das Desigualdades</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Counters -->
    <section class="section impact-section">
      <div class="container">
        <div class="impact-grid">
          <div class="impact-image">
            <img src="/assets/images/impact/impact-mom-working.jpg" alt="Mãe trabalhando de casa" />
          </div>
          <div class="impact-numbers">
            <h2>Nosso Impacto</h2>
            <div class="impact-counter-grid" id="impact-counters">
              <div class="impact-item">
                <span class="stat-number" id="counter-professionals">--</span>
                <span class="stat-label">Profissionais alocadas</span>
              </div>
              <div class="impact-item">
                <span class="stat-number" id="counter-companies">--</span>
                <span class="stat-label">Empresas parceiras</span>
              </div>
              <div class="impact-item">
                <span class="stat-number" id="counter-tracks">--</span>
                <span class="stat-label">Trilhas de capacitação</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section class="section partners-section">
      <div class="container">
        <h2 class="section-title">Parceiros</h2>
        <div class="grid grid-3" id="partners-grid"></div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container text-center">
        <h2>Pronta para transformar sua carreira?</h2>
        <div class="hero-ctas mt-lg">
          <a href="#/register" class="btn btn-primary btn-lg">Criar Minha Conta</a>
          <a href="#/about" class="btn btn-outline btn-lg">Conhecer a LWS</a>
        </div>
      </div>
    </section>
  </div>
  `;
}

export function initHome(): void {
  loadImpactData();
}

async function loadImpactData(): Promise<void> {
  try {
    const [metricsRes, partnersRes] = await Promise.all([
      api.getMetrics(),
      api.getPartnerships(),
    ]);

    if (metricsRes.success && metricsRes.data) {
      const d = metricsRes.data as Record<string, number>;
      const prof = document.getElementById('counter-professionals');
      const comp = document.getElementById('counter-companies');
      const tracks = document.getElementById('counter-tracks');
      if (prof) prof.textContent = String(d.professionalsAllocated);
      if (comp) comp.textContent = String(d.partnerCompanies);
      if (tracks) tracks.textContent = String(d.trainingTracks);
    }

    if (partnersRes.success && partnersRes.data) {
      const partners = partnersRes.data as Array<{
        id: string;
        name: string;
        description: string;
      }>;
      const grid = document.getElementById('partners-grid');
      if (grid) {
        grid.innerHTML = partners
          .map(
            (p) => `
          <div class="card text-center partner-card">
            <img src="/assets/images/partners/partners-handshake.jpg" alt="${p.name}" class="partner-img" />
            <h3>${p.name}</h3>
            <p class="text-muted">${p.description}</p>
          </div>
        `
          )
          .join('');
      }
    }
  } catch (err) {
    console.error('Failed to load impact data:', err);
  }
}
