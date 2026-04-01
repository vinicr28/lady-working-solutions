import { api } from '../api.js';
import { navigate } from '../router.js';
import { updateHeaderAuth } from '../components/header.js';

export function renderRegisterPerson(): string {
  return `
  <div class="page">
    <div class="container" style="max-width:500px">
      <h1 class="section-title">Criar Conta</h1>
      <p class="section-subtitle">Cadastre-se para acessar oportunidades e trilhas de capacitação</p>

      <div id="register-alert"></div>

      <form id="register-person-form" class="card">
        <div class="form-group">
          <label for="reg-name" class="form-label">Nome completo</label>
          <input type="text" id="reg-name" class="form-input" placeholder="Seu nome completo" required />
        </div>
        <div class="form-group">
          <label for="reg-email" class="form-label">E-mail</label>
          <input type="email" id="reg-email" class="form-input" placeholder="seu@email.com" required />
        </div>
        <div class="form-group">
          <label for="reg-phone" class="form-label">Telefone</label>
          <input type="tel" id="reg-phone" class="form-input" placeholder="(11) 99999-0000" />
        </div>
        <div class="form-group">
          <label for="reg-password" class="form-label">Senha</label>
          <input type="password" id="reg-password" class="form-input" placeholder="Mínimo 6 caracteres" required minlength="6" />
        </div>
        <div class="form-group">
          <label for="reg-confirm" class="form-label">Confirmar senha</label>
          <input type="password" id="reg-confirm" class="form-input" placeholder="Repita a senha" required />
        </div>
        <div class="form-checkbox">
          <input type="checkbox" id="reg-terms" required />
          <label for="reg-terms">Aceito os termos de uso e política de privacidade</label>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%">Criar Conta</button>
      </form>

      <p class="text-center mt-md">
        É uma empresa? <a href="#/register/company">Cadastre sua empresa aqui</a>
      </p>
      <p class="text-center mt-sm">
        Já tem conta? <a href="#/login">Faça login</a>
      </p>
    </div>
  </div>
  `;
}

export function initRegisterPerson(): void {
  const form = document.getElementById('register-person-form') as HTMLFormElement;
  const alert = document.getElementById('register-alert');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = (document.getElementById('reg-name') as HTMLInputElement).value;
    const email = (document.getElementById('reg-email') as HTMLInputElement).value;
    const phone = (document.getElementById('reg-phone') as HTMLInputElement).value;
    const password = (document.getElementById('reg-password') as HTMLInputElement).value;
    const confirm = (document.getElementById('reg-confirm') as HTMLInputElement).value;

    if (password !== confirm) {
      if (alert) alert.innerHTML = '<div class="alert alert-error">As senhas não coincidem.</div>';
      return;
    }

    const res = await api.registerPerson({ name, email, phone, password });

    if (res.success) {
      await updateHeaderAuth();
      navigate('/courses');
    } else if (alert) {
      alert.innerHTML = `<div class="alert alert-error">${res.error || 'Erro ao criar conta.'}</div>`;
    }
  });
}
