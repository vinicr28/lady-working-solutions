export async function renderHome(): Promise<string> {
  return `
  <div class="home-page">
    <section id="hero-root"></section>
    <div id="home-sections-root"></div>
  </div>
  `;
}

export function initHome(): void {
  const heroRoot = document.getElementById('hero-root');
  if (heroRoot) {
    import('../components/ui/prisma-hero')
      .then(({ mountPrismaHero }) => mountPrismaHero(heroRoot))
      .catch((err) => console.error('Falha ao montar o hero:', err));
  }

  const sectionsRoot = document.getElementById('home-sections-root');
  if (sectionsRoot) {
    import('../components/home-sections')
      .then(({ mountHomeSections }) => mountHomeSections(sectionsRoot))
      .catch((err) => console.error('Falha ao montar as seções:', err));
  }
}
