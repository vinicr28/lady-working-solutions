import { getUser, checkAuth, navigate } from '../router.js';
import { api } from '../api.js';

export function renderHeader(): string {
  return `
  <header class="site-header">
    <div class="container header-inner">
      <a href="#/" class="logo" aria-label="Lady Working Solutions - Início">
        <span class="logo-icon"><img src="/assets/logo.svg" alt="" /></span>
        <span class="logo-text">Lady Working Solutions</span>
      </a>
      <nav class="nav-desktop" aria-label="Navegação principal">
        <a href="#/jobs" class="nav-link">Oportunidades</a>
        <a href="#/courses" class="nav-link">Trilhas</a>
        <a href="#/planos" class="nav-link">Planos</a>
        <a href="#/about" class="nav-link">Sobre</a>
      </nav>
      <div class="header-actions" id="header-actions">
        <a href="#/login" class="btn btn-outline btn-sm">Entrar</a>
        <a href="#/register" class="btn btn-primary btn-sm">Cadastrar</a>
      </div>
      <button class="hamburger" id="hamburger-btn" aria-label="Abrir menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav aria-label="Menu mobile">
        <a href="#/jobs" class="mobile-link">Oportunidades</a>
        <a href="#/courses" class="mobile-link">Trilhas</a>
        <a href="#/planos" class="mobile-link">Planos</a>
        <a href="#/about" class="mobile-link">Sobre</a>
        <hr />
        <div id="mobile-actions">
          <a href="#/login" class="btn btn-outline" style="width:100%">Entrar</a>
          <a href="#/register" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Cadastrar</a>
        </div>
      </nav>
    </div>
  </header>
  `;
}

export function initHeader(): void {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
    mobileMenu?.setAttribute('aria-hidden', String(expanded));
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  updateHeaderAuth();
}

export async function updateHeaderAuth(): Promise<void> {
  await checkAuth();
  const user = getUser();
  const actions = document.getElementById('header-actions');
  const mobileActions = document.getElementById('mobile-actions');

  if (user) {
    const loggedInHTML = `
      <span class="user-greeting">Olá, ${user.name.split(' ')[0]}</span>
      <button class="btn btn-outline btn-sm" id="logout-btn">Sair</button>
    `;
    const mobileLoggedInHTML = `
      <p class="user-greeting" style="text-align:center;margin-bottom:0.5rem">Olá, ${user.name.split(' ')[0]}</p>
      <button class="btn btn-outline" id="mobile-logout-btn" style="width:100%">Sair</button>
    `;
    if (actions) actions.innerHTML = loggedInHTML;
    if (mobileActions) mobileActions.innerHTML = mobileLoggedInHTML;

    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
    document.getElementById('mobile-logout-btn')?.addEventListener('click', handleLogout);
  } else {
    if (actions) {
      actions.innerHTML = `
        <a href="#/login" class="btn btn-outline btn-sm">Entrar</a>
        <a href="#/register" class="btn btn-primary btn-sm">Cadastrar</a>
      `;
    }
    if (mobileActions) {
      mobileActions.innerHTML = `
        <a href="#/login" class="btn btn-outline" style="width:100%">Entrar</a>
        <a href="#/register" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Cadastrar</a>
      `;
    }
  }
}

async function handleLogout(): Promise<void> {
  await api.logout();
  navigate('/');
  setTimeout(() => updateHeaderAuth(), 100);
}
