export function renderPlanos(): string {
  return `
  <div class="planos-page">
    <div id="planos-root"></div>
  </div>
  `;
}

export function initPlanos(): void {
  const el = document.getElementById('planos-root');
  if (el) {
    import('../components/sections/plans-section')
      .then(({ mountPlans }) => mountPlans(el))
      .catch((err) => console.error('Falha ao montar planos:', err));
  }
}
