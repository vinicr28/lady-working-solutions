import { api } from '../api.js';

export async function renderCourses(): Promise<string> {
  return `
  <div class="page">
    <div class="container">
      <h1 class="section-title">Trilhas de Capacitação</h1>
      <p class="section-subtitle">Formações práticas para sua inserção no mercado de trabalho remoto</p>

      <div class="filters-bar">
        <select id="course-track-filter" class="filter-select" aria-label="Filtrar por trilha">
          <option value="all">Todas as trilhas</option>
          <option value="customer-service">Atendimento ao Cliente</option>
          <option value="social-media">Social Media</option>
          <option value="virtual-assistance">Assistência Virtual</option>
          <option value="online-sales">Vendas Online</option>
          <option value="basic-design">Design Básico</option>
          <option value="video-editing">Edição de Vídeo</option>
        </select>
        <select id="course-level-filter" class="filter-select" aria-label="Filtrar por nível">
          <option value="all">Todos os níveis</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
        <select id="course-price-filter" class="filter-select" aria-label="Filtrar por preço">
          <option value="all">Gratuitos e Pagos</option>
          <option value="true">Apenas Gratuitos</option>
          <option value="false">Apenas Pagos</option>
        </select>
      </div>

      <div class="grid grid-3" id="courses-grid">
        <div class="text-center" style="grid-column:1/-1"><p>Carregando cursos...</p></div>
      </div>
    </div>
  </div>
  `;
}

export function initCourses(): void {
  const trackFilter = document.getElementById('course-track-filter') as HTMLSelectElement;
  const levelFilter = document.getElementById('course-level-filter') as HTMLSelectElement;
  const priceFilter = document.getElementById('course-price-filter') as HTMLSelectElement;

  const loadCourses = async () => {
    const params: Record<string, string> = {};
    if (trackFilter?.value && trackFilter.value !== 'all') params.track = trackFilter.value;
    if (levelFilter?.value && levelFilter.value !== 'all') params.level = levelFilter.value;
    if (priceFilter?.value && priceFilter.value !== 'all') params.free = priceFilter.value;

    const res = await api.getCourses(params);
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    if (res.success && res.data) {
      const courses = res.data as Array<Record<string, unknown>>;
      if (courses.length === 0) {
        grid.innerHTML = '<div class="text-center" style="grid-column:1/-1"><p>Nenhum curso encontrado.</p></div>';
        return;
      }

      grid.innerHTML = courses
        .map(
          (c) => `
        <div class="card course-card">
          <div class="course-card-thumb">
            <img src="${getTrackImage(c.track as string)}" alt="${c.title}" class="course-thumb-img" />
          </div>
          <div class="course-card-body">
            <h3><a href="#/courses/${c.id}">${c.title}</a></h3>
            <p class="text-muted">${c.instructor}</p>
            <div class="course-card-meta">
              <span class="badge badge-primary">${c.level}</span>
              <span class="text-muted">${c.duration}</span>
              ${c.isFree ? '<span class="badge badge-free">Gratuito</span>' : `<span class="badge badge-primary">R$ ${(c.price as number).toFixed(2)}</span>`}
            </div>
            <p class="text-muted mt-sm">${c.moduleCount} módulos · ${c.lessonCount} aulas</p>
            <a href="#/courses/${c.id}" class="btn btn-outline btn-sm mt-md">Ver Trilha</a>
          </div>
        </div>
      `
        )
        .join('');
    }
  };

  trackFilter?.addEventListener('change', loadCourses);
  levelFilter?.addEventListener('change', loadCourses);
  priceFilter?.addEventListener('change', loadCourses);

  loadCourses();
}

function getTrackImage(track: string): string {
  const images: Record<string, string> = {
    'customer-service': '/assets/images/course-thumbs/customer-service.jpg',
    'social-media': '/assets/images/course-thumbs/social-media.jpg',
    'virtual-assistance': '/assets/images/course-thumbs/virtual-assistant.jpg',
    'online-sales': '/assets/images/course-thumbs/online-sales.jpg',
    'basic-design': '/assets/images/course-thumbs/design.jpg',
    'video-editing': '/assets/images/course-thumbs/video-editing.jpg',
  };
  return images[track] || '/assets/images/courses/courses-online-learning.jpg';
}
