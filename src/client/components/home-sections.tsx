import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ShimmerText } from '@/components/ui/shimmer-text';
import { Component as RotatingText } from '@/components/ui/rotating-text';
import { PlansSection } from './sections/plans-section';

const EASE = [0.16, 1, 0.3, 1] as const;
const CREAM = '#F3EBDD';
const INK = '#1E1525';

const IMG = {
  cta: '/assets/images/sections/cta.jpg',
  depoimento: '/assets/images/sections/manifesto.jpg',
};

const VIDEO = {
  landscape: '/assets/video/landscape.mp4',
  landscapePoster: '/assets/images/sections/landscape-poster.jpg',
};

const TRACKS = ['Social Media', 'Vendas Online', 'Design', 'Atendimento', 'Assistência Virtual', 'Edição de Vídeo'];

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, onLight = false }: { children: ReactNode; onLight?: boolean }) {
  return (
    <p
      className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.25em]"
      style={{ color: onLight ? '#9E1750' : 'rgba(243,235,221,.65)' }}
    >
      {children}
    </p>
  );
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

/* Full-bleed background sections (mídia) — usadas só 3x no total */
function PhotoSection({
  img,
  children,
  minH = 'min-h-[90svh]',
  overlay = 'linear-gradient(to bottom, rgba(30,21,37,.82), rgba(30,21,37,.5) 45%, rgba(30,21,37,.9))',
}: {
  img: string;
  children: ReactNode;
  minH?: string;
  overlay?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  return (
    <section ref={ref} className={`relative ${minH} w-full overflow-hidden flex items-center`}>
      <div className="absolute inset-0 -z-10">
        <motion.img
          src={img}
          alt=""
          className="h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: inView ? 1 : 1.12 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
        <div className="absolute inset-0" style={{ background: overlay }} />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
      </div>
      <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-28" style={{ color: CREAM }}>
        {children}
      </div>
    </section>
  );
}

function VideoSection({
  src,
  poster,
  children,
  minH = 'min-h-[64svh]',
  overlay = 'linear-gradient(to bottom, rgba(30,21,37,.5), rgba(30,21,37,.7))',
}: {
  src: string;
  poster: string;
  children: ReactNode;
  minH?: string;
  overlay?: string;
}) {
  return (
    <section className={`relative ${minH} w-full overflow-hidden flex items-center`}>
      <div className="absolute inset-0 -z-10">
        <video autoPlay loop muted playsInline poster={poster} preload="metadata" className="h-full w-full object-cover">
          <source src={src} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: overlay }} />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
      </div>
      <div className="mx-auto w-full max-w-5xl px-6 py-20 text-center" style={{ color: CREAM }}>
        {children}
      </div>
    </section>
  );
}

function HomeSections() {
  return (
    <div className="font-body">
      {/* 1. MANIFESTO — claro (logo após o hero, sem foto) */}
      <section className="bg-bone text-ink">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
          <Eyebrow onLight>O cenário</Eyebrow>
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Talento não tira{' '}
              <span className="inline-block align-bottom text-primary">
                <RotatingText words={['licença', 'férias', 'pausa', 'recesso']} mode="slide" className="text-primary" />
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-[#6B5E76] sm:text-lg">
              11 milhões de brasileiras saíram do mercado pela economia do cuidado. A gente reconecta esse talento — remoto, qualificado e pronto.
            </p>
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { n: '11M', l: 'talentos fora do mercado' },
              { n: '2,5M', l: 'mães que pausaram a carreira' },
              { n: '60%', l: 'lutam para conciliar' },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.1}>
                <div className="font-display text-5xl font-semibold text-ink">{s.n}</div>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#6B5E76]">{s.l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. COMO FUNCIONA — claro com cards */}
      <section className="bg-white text-ink">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <div className="max-w-2xl">
            <Eyebrow onLight>Como funciona</Eyebrow>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Do talento à vaga, em 3 passos.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { n: '01', t: 'Busca', d: 'Mapeamos habilidades e experiência de cada profissional.' },
              { n: '02', t: 'Capacitação', d: 'Trilhas práticas em 6 áreas de alta demanda.' },
              { n: '03', t: 'Alocação', d: 'Conectamos talento pronto a empresas parceiras, em B2B.' },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-black/10 bg-bone p-8 shadow-[0_12px_34px_-20px_rgba(30,21,37,0.3)]">
                  <div className="font-display text-5xl font-semibold text-primary">{s.n}</div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{s.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6B5E76]">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <a
              href="#/about"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-cream no-underline transition-transform hover:-translate-y-0.5"
            >
              Conheça a metodologia →
            </a>
          </div>
        </div>
      </section>

      {/* 3. CAPACITAÇÃO — claro, com chips */}
      <section className="bg-bone text-ink">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-28">
          <Eyebrow onLight>Capacitação</Eyebrow>
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
              Trilhas em{' '}
              <span className="inline-block align-bottom text-primary">
                <RotatingText words={TRACKS} mode="blur" interval={2200} className="text-primary" />
              </span>
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {TRACKS.map((t, i) => (
              <Reveal key={t} delay={i * 0.05}>
                <span className="inline-block rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-ink">
                  {t}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <a
              href="#/courses"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white no-underline shadow-[0_12px_30px_rgba(232,51,109,0.4)] transition-transform hover:-translate-y-0.5"
            >
              Ver todas as trilhas →
            </a>
          </Reveal>
        </div>
      </section>

      {/* 4. IMPACTO sobre o vídeo de paisagem — VÍDEO do meio */}
      <VideoSection
        src={VIDEO.landscape}
        poster={VIDEO.landscapePoster}
        minH="min-h-[90svh]"
        overlay="linear-gradient(to bottom, rgba(30,21,37,.55), rgba(30,21,37,.45) 42%, rgba(30,21,37,.8))"
      >
        <Eyebrow>Sem fronteiras · nosso impacto</Eyebrow>
        <Reveal>
          <ShimmerText className="font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl">
            Talento brasileiro, alcance do mundo.
          </ShimmerText>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-4xl gap-10 sm:grid-cols-3">
          {[
            { to: 320, suf: '+', l: 'profissionais alocadas' },
            { to: 48, suf: '+', l: 'empresas parceiras' },
            { to: 6, suf: '', l: 'trilhas de capacitação' },
          ].map((m, i) => (
            <Reveal key={m.l} delay={i * 0.12}>
              <div className="font-display text-6xl font-semibold text-primary sm:text-7xl">
                <CountUp to={m.to} suffix={m.suf} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.2em]" style={{ color: 'rgba(243,235,221,.72)' }}>
                {m.l}
              </p>
            </Reveal>
          ))}
        </div>
      </VideoSection>

      {/* PARCEIROS — marquee (faixa sólida, sem foto) */}
      <div
        className="overflow-hidden whitespace-nowrap bg-ink py-7"
        style={{ borderTop: '1px solid rgba(243,235,221,.1)', borderBottom: '1px solid rgba(243,235,221,.1)' }}
      >
        <div className="lws-marquee">
          {[0, 1].map((k) => (
            <span key={k} className="inline-flex items-center gap-12 px-6 font-display text-2xl" style={{ color: 'rgba(243,235,221,.55)' }}>
              {['SEBRAE', 'SENAI', 'SENAC', 'Empresas B2B', 'ESG · ODS 5 · 8 · 10'].map((p) => (
                <span key={p} className="inline-flex items-center gap-12">
                  <span>{p}</span>
                  <span className="text-primary">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* 5. DEPOIMENTO — claro, foto emoldurada (não conta como fundo) */}
      <section className="bg-bone text-ink">
        <div className="mx-auto grid max-w-4xl items-center gap-10 px-6 py-24 sm:py-28 md:grid-cols-[200px_1fr]">
          <Reveal>
            <img
              src={IMG.depoimento}
              alt="Profissional da Lady Working Solutions"
              className="mx-auto h-48 w-48 rounded-[28px] object-cover shadow-[0_20px_50px_-20px_rgba(30,21,37,0.4)]"
            />
          </Reveal>
          <div>
            <Eyebrow onLight>Depoimento</Eyebrow>
            <Reveal>
              <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-4xl">
                “Voltei a trabalhar sem abrir mão de estar presente.”
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-[#6B5E76]">
                Marina · Assistente Virtual
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. PLANOS — claro com cards */}
      <PlansSection />

      {/* 7. CTA — FOTO estática (3 mulheres) */}
      <PhotoSection
        img={IMG.cta}
        minH="min-h-[82svh]"
        overlay="linear-gradient(to bottom, rgba(30,21,37,.5), rgba(30,21,37,.45) 40%, rgba(30,21,37,.82))"
      >
        <div className="text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold sm:text-6xl">Pronta para recomeçar?</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#/register"
                className="rounded-full px-7 py-3 font-semibold no-underline transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: CREAM, color: INK }}
              >
                Criar minha conta
              </a>
              <a
                href="#/register/company"
                className="rounded-full border px-7 py-3 font-semibold no-underline"
                style={{ borderColor: 'rgba(243,235,221,.6)', color: CREAM }}
              >
                Sou empresa
              </a>
            </div>
          </Reveal>
        </div>
      </PhotoSection>
    </div>
  );
}

export function mountHomeSections(container: HTMLElement) {
  createRoot(container).render(<HomeSections />);
}
