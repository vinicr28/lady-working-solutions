import { api } from '../api.js';
import { getUser } from '../router.js';

export async function renderApply(params: Record<string, string>): Promise<string> {
  const user = getUser();
  return `
  <div class="page">
    <div class="container" style="max-width:600px">
      <a href="#/jobs/${params.id}" class="back-link">&larr; Voltar à vaga</a>
      <h1 class="mb-lg">Candidatar-se</h1>

      <div id="apply-alert"></div>

      <form id="apply-form">
        <div class="form-group">
          <label for="apply-name" class="form-label">Nome</label>
          <input type="text" id="apply-name" class="form-input" value="${user?.name || ''}" readonly />
        </div>
        <div class="form-group">
          <label for="apply-email" class="form-label">E-mail</label>
          <input type="email" id="apply-email" class="form-input" value="${user?.email || ''}" readonly />
        </div>
        <div class="form-group">
          <label for="apply-message" class="form-label">Por que você é a candidata ideal? (opcional)</label>
          <textarea id="apply-message" class="form-input" placeholder="Conte um pouco sobre sua experiência e motivação..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" style="width:100%">Enviar Candidatura</button>
      </form>
    </div>
  </div>
  `;
}

export function initApply(jobId?: string): void {
  const form = document.getElementById('apply-form') as HTMLFormElement;
  const alert = document.getElementById('apply-alert');

  // Get jobId from hash if not provided
  if (!jobId) {
    const match = window.location.hash.match(/\/apply\/(.+)/);
    jobId = match?.[1];
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!jobId) return;

    const message = (document.getElementById('apply-message') as HTMLTextAreaElement)?.value || '';

    const res = await api.applyToJob(jobId, message);

    if (alert) {
      if (res.success) {
        alert.innerHTML = '<div class="alert alert-success">Candidatura enviada com sucesso! Boa sorte!</div>';
        form.style.display = 'none';
      } else {
        alert.innerHTML = `<div class="alert alert-error">${res.error || 'Erro ao enviar candidatura.'}</div>`;
      }
    }
  });
}
