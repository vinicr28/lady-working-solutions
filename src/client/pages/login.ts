import { api } from '../api.js';
import { navigate } from '../router.js';
import { updateHeaderAuth } from '../components/header.js';

export function renderLogin(): string {
  return `
  <div class="page">
    <div class="container" style="max-width:450px">
      <h1 class="section-title">Entrar</h1>
      <p class="section-subtitle">Acesse sua conta na Lady Working Solutions</p>

      <div id="login-alert"></div>

      <form id="login-form" class="card">
        <div class="form-group">
          <label for="login-email" class="form-label">E-mail</label>
          <input type="email" id="login-email" class="form-input" placeholder="seu@email.com" required />
        </div>
        <div class="form-group">
          <label for="login-password" class="form-label">Senha</label>
          <input type="password" id="login-password" class="form-input" placeholder="Sua senha" required />
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%">Entrar</button>
      </form>

      <div class="login-test-info card mt-md">
        <h4>Contas de teste</h4>
        <p class="text-muted"><strong>Profissional:</strong> maria@email.com / senha123</p>
        <p class="text-muted"><strong>Empresa:</strong> rh@technova.com.br / senha123</p>
      </div>

      <p class="text-center mt-md">
        Ainda não tem conta? <a href="#/register">Cadastre-se como profissional</a>
      </p>
      <p class="text-center mt-sm">
        É uma empresa? <a href="#/register/company">Cadastre sua empresa</a>
      </p>
    </div>
  </div>
  `;
}

export function initLogin(): void {
  const form = document.getElementById('login-form') as HTMLFormElement;
  const alert = document.getElementById('login-alert');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;

    const res = await api.login(email, password);

    if (res.success) {
      await updateHeaderAuth();

      // Check for redirect param
      const hash = window.location.hash;
      const redirectMatch = hash.match(/[?&]redirect=([^&]+)/);
      if (redirectMatch) {
        navigate(decodeURIComponent(redirectMatch[1]));
      } else {
        navigate('/jobs');
      }
    } else if (alert) {
      alert.innerHTML = `<div class="alert alert-error">${res.error || 'E-mail ou senha inválidos.'}</div>`;
    }
  });
}
