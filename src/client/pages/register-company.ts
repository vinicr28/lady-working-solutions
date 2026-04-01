import { api } from '../api.js';
import { navigate } from '../router.js';
import { updateHeaderAuth } from '../components/header.js';

export function renderRegisterCompany(): string {
  return `
  <div class="page">
    <div class="container" style="max-width:500px">
      <h1 class="section-title">Cadastrar Empresa</h1>
      <p class="section-subtitle">Conecte-se a profissionais talentosas e qualificadas</p>

      <div id="register-company-alert"></div>

      <form id="register-company-form" class="card">
        <div class="form-group">
          <label for="comp-name" class="form-label">Nome da empresa</label>
          <input type="text" id="comp-name" class="form-input" placeholder="Nome da sua empresa" required />
        </div>
        <div class="form-group">
          <label for="comp-cnpj" class="form-label">CNPJ</label>
          <input type="text" id="comp-cnpj" class="form-input" placeholder="00.000.000/0000-00" />
        </div>
        <div class="form-group">
          <label for="comp-email" class="form-label">E-mail corporativo</label>
          <input type="email" id="comp-email" class="form-input" placeholder="contato@empresa.com" required />
        </div>
        <div class="form-group">
          <label for="comp-password" class="form-label">Senha</label>
          <input type="password" id="comp-password" class="form-input" placeholder="Mínimo 6 caracteres" required minlength="6" />
        </div>
        <div class="form-group">
          <label for="comp-confirm" class="form-label">Confirmar senha</label>
          <input type="password" id="comp-confirm" class="form-input" placeholder="Repita a senha" required />
        </div>
        <div class="form-group">
          <label for="comp-description" class="form-label">Descrição da empresa (opcional)</label>
          <textarea id="comp-description" class="form-input" placeholder="Conte um pouco sobre sua empresa..."></textarea>
        </div>
        <div class="form-checkbox">
          <input type="checkbox" id="comp-mother-friendly" />
          <label for="comp-mother-friendly">
            <span class="badge badge-mother-friendly">Empresa Amiga das Mães</span>
            — Oferecemos horários flexíveis e ambiente inclusivo para mães
          </label>
        </div>
        <div class="form-checkbox">
          <input type="checkbox" id="comp-terms" required />
          <label for="comp-terms">Aceito os termos de uso e política de privacidade</label>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%">Cadastrar Empresa</button>
      </form>

      <p class="text-center mt-md">
        É uma profissional? <a href="#/register">Crie sua conta aqui</a>
      </p>
      <p class="text-center mt-sm">
        Já tem conta? <a href="#/login">Faça login</a>
      </p>
    </div>
  </div>
  `;
}

export function initRegisterCompany(): void {
  const form = document.getElementById('register-company-form') as HTMLFormElement;
  const alert = document.getElementById('register-company-alert');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = (document.getElementById('comp-name') as HTMLInputElement).value;
    const cnpj = (document.getElementById('comp-cnpj') as HTMLInputElement).value;
    const email = (document.getElementById('comp-email') as HTMLInputElement).value;
    const password = (document.getElementById('comp-password') as HTMLInputElement).value;
    const confirm = (document.getElementById('comp-confirm') as HTMLInputElement).value;
    const description = (document.getElementById('comp-description') as HTMLTextAreaElement).value;
    const isMotherFriendly = (document.getElementById('comp-mother-friendly') as HTMLInputElement).checked;

    if (password !== confirm) {
      if (alert) alert.innerHTML = '<div class="alert alert-error">As senhas não coincidem.</div>';
      return;
    }

    const res = await api.registerCompany({ name, email, cnpj, password, description, isMotherFriendly });

    if (res.success) {
      await updateHeaderAuth();
      navigate('/jobs');
    } else if (alert) {
      alert.innerHTML = `<div class="alert alert-error">${res.error || 'Erro ao cadastrar empresa.'}</div>`;
    }
  });
}
