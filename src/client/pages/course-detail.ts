import { api } from '../api.js';

export async function renderCourseDetail(params: Record<string, string>): Promise<string> {
  return `
  <div class="page">
    <div class="container">
      <div id="course-detail-content">
        <p>Carregando curso...</p>
      </div>
    </div>
  </div>
  `;
}

export async function initCourseDetail(): Promise<void> {
  const container = document.getElementById('course-detail-content');
  if (!container) return;

  const hash = window.location.hash.slice(1);
  const match = hash.match(/^\/courses\/(.+)$/);
  const courseId = match?.[1];
  if (!courseId) return;

  const res = await api.getCourse(courseId);
  if (!res.success || !res.data) {
    container.innerHTML = '<h2>Curso não encontrado</h2><a href="#/courses" class="btn btn-outline mt-md">Voltar às trilhas</a>';
    return;
  }

  const course = res.data as Record<string, unknown>;
  const modules = course.modules as Array<{
    id: string;
    title: string;
    order: number;
    lessons: Array<{ id: string; title: string; duration: string; order: number }>;
  }>;

  container.innerHTML = `
    <a href="#/courses" class="back-link">&larr; Voltar às trilhas</a>

    <div class="course-detail-layout">
      <div class="course-detail-main">
        <h1>${course.title}</h1>
        <p class="text-muted mt-sm">Instrutora: <strong>${course.instructor}</strong></p>

        <div class="course-detail-badges mt-md mb-lg">
          <span class="badge badge-primary">${course.level}</span>
          <span class="text-muted">${course.duration}</span>
          ${course.isFree ? '<span class="badge badge-free">Gratuito</span>' : `<span class="badge badge-primary">R$ ${(course.price as number).toFixed(2)}</span>`}
        </div>

        <div class="course-description mb-lg">
          <h2>Sobre o Curso</h2>
          <p>${course.description}</p>
        </div>

        <div class="course-modules">
          <h2 class="mb-md">Módulos e Aulas</h2>
          ${modules
            .sort((a, b) => a.order - b.order)
            .map(
              (mod, i) => `
            <div class="accordion-item ${i === 0 ? 'open' : ''}">
              <button class="accordion-header" aria-expanded="${i === 0}" data-accordion>
                <span>Módulo ${mod.order}: ${mod.title}</span>
                <span class="accordion-arrow">▼</span>
              </button>
              <div class="accordion-content" ${i !== 0 ? 'style="display:none"' : ''}>
                <ul class="lesson-list">
                  ${mod.lessons
                    .sort((a, b) => a.order - b.order)
                    .map(
                      (les) => `
                    <li class="lesson-item">
                      <span class="lesson-icon">▶</span>
                      <span class="lesson-title">${les.title}</span>
                      <span class="lesson-duration text-muted">${les.duration}</span>
                    </li>
                  `
                    )
                    .join('')}
                </ul>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <aside class="course-detail-sidebar">
        <div class="card enrollment-card">
          <h3>Matricule-se</h3>
          <p class="text-muted mb-md">${course.isFree ? 'Este curso é 100% gratuito!' : `Investimento: R$ ${(course.price as number).toFixed(2)}`}</p>
          <p class="text-muted mb-md">${course.duration} de conteúdo</p>
          <p class="text-muted mb-md">${modules.length} módulos · ${modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas</p>
          <button class="btn btn-primary" style="width:100%" id="enroll-btn">
            ${course.isFree ? 'Começar Agora' : 'Matricular-se'}
          </button>
        </div>
      </aside>
    </div>
  `;

  // Accordion behavior
  document.querySelectorAll('[data-accordion]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const content = item?.querySelector('.accordion-content') as HTMLElement;
      const isOpen = item?.classList.contains('open');

      if (isOpen) {
        item?.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        if (content) content.style.display = 'none';
      } else {
        item?.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        if (content) content.style.display = 'block';
      }
    });
  });

  // Enroll button
  document.getElementById('enroll-btn')?.addEventListener('click', () => {
    alert('Matrícula realizada com sucesso! (Protótipo)');
  });
}
