import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { createRoot } from 'react-dom/client';

const CREAM = '#F3EBDD';
const MAGENTA = '#E8336D';
const INK = '#1E1525';

/* ---------------- WordsPullUp (letter cascade) ---------------- */
interface WordsPullUpProps {
  text: string;
  showAsterisk?: boolean;
}

export const WordsPullUp = ({ text, showAsterisk = false }: WordsPullUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const letters = [...text];

  return (
    <span ref={ref} className="inline-flex">
      {letters.map((ch, i) => {
        const isLast = i === letters.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 24, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
          >
            {ch}
            {showAsterisk && isLast && (
              <span
                className="absolute -right-[0.32em] top-[0.02em] text-[0.26em]"
                style={{ color: MAGENTA }}
              >
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </span>
  );
};

/* ---------------- Hero ---------------- */
export const PrismaHero = () => {
  return (
    <div className="px-3 md:px-4">
      <div className="relative h-[calc(100svh-76px)] min-h-[520px] w-full overflow-hidden rounded-2xl bg-ink md:rounded-[2rem]">
        {/* Background video — poster (warm photo) shows until your Envato video is added */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/images/hero/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          {/* 🎬 Coloque o vídeo gerado no Envato em: public/assets/video/hero-lws.mp4 */}
          <source src="/assets/video/hero-lws.mp4" type="video/mp4" />
        </video>

        {/* Brand gradient wash + noise + dark scrim */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(232,51,109,0.55) 0%, rgba(176,24,90,0.22) 45%, rgba(109,40,217,0.6) 100%)',
            mixBlendMode: 'soft-light',
          }}
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/75" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-display font-medium leading-[0.82] tracking-[-0.06em] text-[24vw] sm:text-[22vw] md:text-[20vw] lg:text-[18vw]"
                style={{ color: CREAM }}
                aria-label="Talento"
              >
                <WordsPullUp text="Talento" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-4 lg:col-span-4 lg:pb-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-body text-sm sm:text-base"
                style={{ color: 'rgba(243,235,221,0.82)', lineHeight: 1.4 }}
              >
                A Lady Working Solutions reconecta profissionais talentosas — mães,
                remotas, prontas — a empresas que precisam de gente boa. Sem pausa no
                talento.
              </motion.p>

              <motion.a
                href="#/jobs"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1 font-body text-sm font-semibold no-underline transition-all hover:gap-3 sm:text-base"
                style={{ backgroundColor: CREAM, color: INK }}
              >
                Encontrar oportunidades
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
                  style={{ backgroundColor: MAGENTA }}
                >
                  <ArrowRight className="h-4 w-4" style={{ color: CREAM }} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Mount helper for the vanilla-TS app (React island) */
export function mountPrismaHero(container: HTMLElement) {
  createRoot(container).render(<PrismaHero />);
}
