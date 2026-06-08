'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

type Plan = {
  tag: string;
  name: string;
  lede: string;
  prices?: { monthly: string; yearly: string };
  customAmount?: string;
  cta: { label: string; href: string; variant: 'dark' | 'brand' };
  bullets: string[];
  note: string;
  featured?: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    tag: '01 · Para começar',
    name: 'Essencial',
    lede: 'Para empresas dando os primeiros passos na contratação remota de talento materno.',
    prices: { monthly: '199', yearly: '1.990' },
    cta: { label: 'Começar agora', href: '#/register/company', variant: 'dark' },
    bullets: [
      '1 vaga ativa por vez',
      'Acesso ao pool de talentos',
      'Matching curado pela LWS',
      'Selo Mãe-friendly',
      'Suporte por chat e e-mail',
    ],
    note: 'Sem fidelidade · cancele quando quiser.',
  },
  {
    tag: '02 · Recomendado',
    name: 'Crescimento',
    lede: 'Para quem contrata com frequência e quer escala com curadoria de verdade.',
    prices: { monthly: '499', yearly: '4.990' },
    cta: { label: 'Assinar Crescimento', href: '#/register/company', variant: 'brand' },
    bullets: [
      'Até 5 vagas ativas',
      'Tudo do Essencial',
      'Matching prioritário',
      'Relatórios de impacto ESG',
      'Gerente de conta dedicado',
      'Onboarding das profissionais',
    ],
    note: 'Ideal para squads em expansão.',
    featured: true,
    badge: 'Mais escolhido',
  },
  {
    tag: '03 · Empresas',
    name: 'Corporativo',
    lede: 'Para grandes operações com contratação contínua e necessidades de integração.',
    customAmount: 'Sob consulta',
    cta: { label: 'Falar com vendas', href: '#/about', variant: 'dark' },
    bullets: [
      'Vagas ilimitadas',
      'Dashboard corporativo + SSO',
      'Políticas de contratação customizadas',
      'SLA contratual',
      'Faturamento centralizado',
      'Parceria ESG / ODS',
    ],
    note: 'Para operações com 50+ contratações/ano.',
  },
];

export function PlansSection({ withIntro = true }: { withIntro?: boolean }) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className="bg-bone font-body text-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        {withIntro && (
          <div className="text-center">
            <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#9E1750]">Planos</p>
            <h2 className="mx-auto max-w-[16ch] font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              Um plano para cada empresa.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-base text-[#6B5E76] sm:text-lg">
              Comece com curadoria, escale com impacto. Sem fidelidade longa — só talento pronto para a sua operação remota.
            </p>

            <div role="radiogroup" aria-label="Periodicidade" className="mt-8 inline-flex items-center rounded-full bg-black/5 p-1">
              {(['monthly', 'yearly'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  role="radio"
                  aria-checked={billing === mode}
                  onClick={() => setBilling(mode)}
                  className={`cursor-pointer rounded-full border-0 px-5 py-2 text-[13px] font-medium transition-colors ${
                    billing === mode ? 'bg-white text-ink shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'bg-transparent text-[#6B5E76]'
                  }`}
                >
                  {mode === 'monthly' ? 'Mensal' : 'Anual'}
                </button>
              ))}
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#6B5E76]">
              Economize 2 meses no plano anual
            </p>
          </div>
        )}

        <div className="mx-auto mt-14 grid max-w-[560px] grid-cols-1 gap-5 lg:max-w-none lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} billing={billing} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, billing, index }: { plan: Plan; billing: 'monthly' | 'yearly'; index: number }) {
  const featured = !!plan.featured;
  const muted = featured ? 'text-cream/70' : 'text-[#6B5E76]';
  const base = featured ? 'text-cream' : 'text-ink';

  return (
    <motion.article
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col overflow-hidden rounded-[28px] p-8 sm:p-10 ${
        featured ? 'bg-ink shadow-[0_24px_60px_rgba(30,21,37,0.28)]' : 'border border-black/10 bg-white'
      }`}
    >
      {featured && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-primary to-transparent" />
      )}
      {plan.badge && (
        <span className="absolute right-6 top-6 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          {plan.badge}
        </span>
      )}

      <p className={`mb-4 font-mono text-[12px] uppercase tracking-[0.14em] ${muted}`}>{plan.tag}</p>
      <h3 className={`mb-2 font-display text-3xl font-semibold leading-tight ${base}`}>{plan.name}</h3>
      <p className={`mb-8 max-w-[34ch] text-[15px] leading-relaxed ${muted}`}>{plan.lede}</p>

      <div className="mb-6 flex items-baseline gap-1">
        {plan.prices ? (
          <>
            <span className={`font-display text-lg font-medium ${muted}`}>R$</span>
            <span className={`font-display text-6xl font-semibold tracking-tight ${base}`}>{plan.prices[billing]}</span>
            <span className={`self-end pb-2 font-mono text-[11px] uppercase tracking-[0.1em] ${muted}`}>
              / {billing === 'monthly' ? 'mês' : 'ano'}
            </span>
          </>
        ) : (
          <span className={`font-display text-4xl font-semibold tracking-tight ${base}`}>{plan.customAmount}</span>
        )}
      </div>

      <a
        href={plan.cta.href}
        className={`mb-6 inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-[15px] font-semibold no-underline transition-opacity hover:opacity-90 ${
          plan.cta.variant === 'brand'
            ? 'bg-primary text-white shadow-[0_12px_30px_rgba(232,51,109,0.4)]'
            : featured
              ? 'bg-cream text-ink'
              : 'bg-ink text-cream'
        }`}
      >
        {plan.cta.label}
      </a>

      <ul className="m-0 list-none p-0">
        {plan.bullets.map((b, i, arr) => (
          <li
            key={b + i}
            className={`relative border-t py-3 pl-6 text-[14px] leading-snug ${
              featured ? 'border-white/10 text-cream' : 'border-black/10 text-ink'
            } ${i === arr.length - 1 ? (featured ? 'border-b border-white/10' : 'border-b border-black/10') : ''}`}
          >
            <span className={`absolute left-0 ${featured ? 'text-primary' : 'text-[#9E1750]'}`}>—</span>
            {b}
          </li>
        ))}
      </ul>
      <p className={`mt-4 font-mono text-[11px] tracking-[0.08em] ${muted}`}>{plan.note}</p>
    </motion.article>
  );
}

export function mountPlans(container: HTMLElement) {
  createRoot(container).render(<PlansSection />);
}
