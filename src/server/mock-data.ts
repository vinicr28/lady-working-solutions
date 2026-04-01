// ============================================================================
// Lady Working Solutions — Mock Data (Single Source of Truth for Prototype)
// ============================================================================

export interface Company {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  password: string;
  description: string;
  logo: string;
  isMotherFriendly: boolean;
  createdAt: string;
}

export interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'FREELANCE' | 'INTERNSHIP';
export type AppStatus = 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  location: string;
  salary: string;
  type: JobType;
  remote: boolean;
  companyId: string;
  isActive: boolean;
  createdAt: string;
}

export interface Application {
  id: string;
  personId: string;
  jobId: string;
  message: string;
  status: AppStatus;
  createdAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  level: string;
  track: string;
  price: number;
  isFree: boolean;
  modules: CourseModule[];
  createdAt: string;
}

export interface Partnership {
  id: string;
  name: string;
  description: string;
  logo: string;
}

export interface ImpactMetrics {
  professionalsAllocated: number;
  partnerCompanies: number;
  trainingTracks: number;
  completionRate: number;
  satisfactionScore: number;
}

// --- Companies ---
export const companies: Company[] = [
  {
    id: 'comp-1',
    name: 'TechNova Soluções Digitais',
    email: 'rh@technova.com.br',
    cnpj: '12.345.678/0001-90',
    password: 'senha123',
    description: 'Empresa de tecnologia focada em transformação digital para PMEs brasileiras. Oferecemos ambiente flexível e inclusivo.',
    logo: '',
    isMotherFriendly: true,
    createdAt: '2025-06-15',
  },
  {
    id: 'comp-2',
    name: 'Grupo Estrela Consultoria',
    email: 'contato@grupoestrela.com.br',
    cnpj: '98.765.432/0001-10',
    password: 'senha123',
    description: 'Consultoria empresarial com mais de 15 anos de experiência no mercado. Valorizamos diversidade e inclusão.',
    logo: '',
    isMotherFriendly: false,
    createdAt: '2025-07-01',
  },
  {
    id: 'comp-3',
    name: 'Flora Comunicação & Marketing',
    email: 'vagas@floracom.com.br',
    cnpj: '45.678.901/0001-23',
    password: 'senha123',
    description: 'Agência de marketing digital que acredita no poder da diversidade criativa. Horários flexíveis e trabalho remoto.',
    logo: '',
    isMotherFriendly: true,
    createdAt: '2025-08-10',
  },
];

// --- Jobs ---
export const jobs: Job[] = [
  {
    id: 'job-1',
    title: 'Atendente de Suporte ao Cliente (Remoto)',
    description: 'Buscamos profissional para atendimento ao cliente via chat e e-mail. Horário flexível, ideal para quem precisa conciliar rotina familiar.\n\nResponsabilidades:\n- Atender clientes via chat, e-mail e telefone\n- Registrar e acompanhar chamados no sistema\n- Escalar problemas técnicos quando necessário\n- Manter a base de conhecimento atualizada',
    requirements: 'Boa comunicação escrita, experiência com atendimento, conhecimento em ferramentas de helpdesk.',
    benefits: 'Vale-refeição, plano de saúde, horário flexível, auxílio home-office.',
    location: 'Remoto — Brasil',
    salary: 'R$ 2.200 - R$ 2.800',
    type: 'FULL_TIME',
    remote: true,
    companyId: 'comp-1',
    isActive: true,
    createdAt: '2026-01-10',
  },
  {
    id: 'job-2',
    title: 'Social Media Manager (Meio Período)',
    description: 'Gerenciar redes sociais de 3 clientes da agência. Criar calendário editorial, produzir conteúdo e analisar métricas.\n\nResponsabilidades:\n- Planejamento de conteúdo mensal\n- Criação de posts e stories\n- Monitoramento de métricas e relatórios\n- Interação com seguidores',
    requirements: 'Experiência com Instagram, LinkedIn e TikTok. Conhecimento em Canva ou ferramentas de design.',
    benefits: 'Horário flexível (20h/semana), trabalho remoto, bônus por performance.',
    location: 'Remoto — Brasil',
    salary: 'R$ 1.800 - R$ 2.500',
    type: 'PART_TIME',
    remote: true,
    companyId: 'comp-3',
    isActive: true,
    createdAt: '2026-01-15',
  },
  {
    id: 'job-3',
    title: 'Assistente Virtual Administrativo',
    description: 'Suporte administrativo remoto para equipe de gestão. Organização de agenda, controle de documentos e comunicação interna.\n\nResponsabilidades:\n- Gerenciar agenda e compromissos\n- Organizar documentos e relatórios\n- Suporte em reuniões virtuais\n- Controle de despesas e orçamentos',
    requirements: 'Organização, proatividade, domínio de Google Workspace e Microsoft Office.',
    benefits: 'Trabalho 100% remoto, PLR, day off no aniversário.',
    location: 'Remoto — Brasil',
    salary: 'R$ 2.000 - R$ 2.600',
    type: 'FULL_TIME',
    remote: true,
    companyId: 'comp-2',
    isActive: true,
    createdAt: '2026-01-20',
  },
  {
    id: 'job-4',
    title: 'Freelancer de Design Gráfico',
    description: 'Projeto pontual para criação de identidade visual de um novo produto. Inclui logo, paleta de cores, e peças para redes sociais.\n\nEntregas:\n- Logotipo em variações\n- Manual de identidade visual\n- 10 templates para Instagram\n- Apresentação institucional',
    requirements: 'Portfólio em design gráfico, domínio de Adobe Creative Suite ou Figma.',
    benefits: 'Pagamento por projeto, possibilidade de continuidade.',
    location: 'Remoto — Brasil',
    salary: 'R$ 3.000 - R$ 5.000 (por projeto)',
    type: 'FREELANCE',
    remote: true,
    companyId: 'comp-3',
    isActive: true,
    createdAt: '2026-02-01',
  },
  {
    id: 'job-5',
    title: 'Estágio em Marketing Digital',
    description: 'Oportunidade para quem está retornando ao mercado ou iniciando carreira em marketing digital.\n\nAtividades:\n- Auxiliar na criação de campanhas\n- Pesquisa de tendências e concorrência\n- Suporte na produção de conteúdo\n- Análise de dados de campanhas',
    requirements: 'Cursando ou formada em Marketing, Comunicação ou áreas afins. Vontade de aprender.',
    benefits: 'Bolsa-estágio R$ 1.200, mentoria individual, horário flexível.',
    location: 'São Paulo — SP (Híbrido)',
    salary: 'R$ 1.200 (bolsa)',
    type: 'INTERNSHIP',
    remote: false,
    companyId: 'comp-3',
    isActive: true,
    createdAt: '2026-02-05',
  },
  {
    id: 'job-6',
    title: 'Vendedora Online — E-commerce',
    description: 'Atuar no atendimento e vendas da loja virtual. Responder dúvidas de clientes, processar pedidos e acompanhar entregas.\n\nResponsabilidades:\n- Atendimento ao cliente via WhatsApp e chat\n- Processamento de pedidos\n- Acompanhamento de entregas\n- Sugestões para melhorar a conversão',
    requirements: 'Experiência com vendas online, boa comunicação, organização.',
    benefits: 'Comissão sobre vendas, horário flexível, trabalho remoto.',
    location: 'Remoto — Brasil',
    salary: 'R$ 1.500 + comissão',
    type: 'FULL_TIME',
    remote: true,
    companyId: 'comp-1',
    isActive: true,
    createdAt: '2026-02-10',
  },
  {
    id: 'job-7',
    title: 'Editora de Vídeo (Freelance)',
    description: 'Edição de vídeos para canal no YouTube e conteúdo para redes sociais. Cortes, legendas, efeitos e thumbnails.\n\nEntregas:\n- 8 vídeos editados por mês (10-20 min)\n- 16 cortes curtos para reels/shorts\n- Thumbnails para cada vídeo',
    requirements: 'Experiência com Premiere Pro, DaVinci Resolve ou CapCut. Portfólio obrigatório.',
    benefits: 'Pagamento por vídeo, flexibilidade total de horários.',
    location: 'Remoto — Brasil',
    salary: 'R$ 150 - R$ 300 por vídeo',
    type: 'FREELANCE',
    remote: true,
    companyId: 'comp-1',
    isActive: true,
    createdAt: '2026-02-15',
  },
  {
    id: 'job-8',
    title: 'Analista de Dados Jr. (Part-Time)',
    description: 'Auxiliar na análise de dados de vendas e comportamento do consumidor. Criar dashboards e relatórios.\n\nResponsabilidades:\n- Coletar e organizar dados de múltiplas fontes\n- Criar dashboards no Google Data Studio\n- Gerar relatórios semanais\n- Identificar tendências e oportunidades',
    requirements: 'Conhecimento em Excel/Google Sheets avançado, SQL básico, desejável Power BI.',
    benefits: 'Horário flexível (25h/semana), trabalho remoto, curso de capacitação incluso.',
    location: 'Remoto — Brasil',
    salary: 'R$ 2.500 - R$ 3.200',
    type: 'PART_TIME',
    remote: true,
    companyId: 'comp-2',
    isActive: true,
    createdAt: '2026-02-20',
  },
  {
    id: 'job-9',
    title: 'Consultora de Processos (Presencial)',
    description: 'Mapear e otimizar processos internos da empresa. Levantar necessidades com as equipes e propor melhorias.\n\nResponsabilidades:\n- Mapeamento de processos atuais\n- Identificação de gargalos\n- Proposição de melhorias\n- Implementação de mudanças',
    requirements: 'Experiência em gestão de processos, comunicação clara, perfil analítico.',
    benefits: 'VR, VT, plano de saúde, PLR.',
    location: 'Rio de Janeiro — RJ',
    salary: 'R$ 4.500 - R$ 6.000',
    type: 'FULL_TIME',
    remote: false,
    companyId: 'comp-2',
    isActive: true,
    createdAt: '2026-03-01',
  },
  {
    id: 'job-10',
    title: 'Assistente de Conteúdo — Blog & Newsletter',
    description: 'Produção de conteúdo escrito para blog corporativo e newsletter semanal. Pesquisa, redação e revisão.\n\nResponsabilidades:\n- Escrever 4 artigos por mês (800-1200 palavras)\n- Montar newsletter semanal\n- Pesquisa de pautas e tendências\n- Revisão e SEO básico',
    requirements: 'Boa redação em português, conhecimento em SEO, experiência com WordPress é um plus.',
    benefits: 'Trabalho remoto, horário flexível, curso de copywriting incluso.',
    location: 'Remoto — Brasil',
    salary: 'R$ 1.800 - R$ 2.400',
    type: 'PART_TIME',
    remote: true,
    companyId: 'comp-1',
    isActive: true,
    createdAt: '2026-03-05',
  },
];

// --- Courses ---
export const courses: Course[] = [
  {
    id: 'course-1',
    title: 'Atendimento ao Cliente de Excelência',
    description: 'Domine as habilidades essenciais para oferecer um atendimento ao cliente excepcional em ambientes remotos. Aprenda técnicas de comunicação, resolução de conflitos e fidelização.',
    instructor: 'Mariana Costa',
    thumbnail: '',
    duration: '12 horas',
    level: 'Iniciante',
    track: 'customer-service',
    price: 0,
    isFree: true,
    modules: [
      {
        id: 'mod-1-1',
        title: 'Fundamentos do Atendimento',
        order: 1,
        lessons: [
          { id: 'les-1-1-1', title: 'O que é atendimento de excelência', duration: '15min', order: 1 },
          { id: 'les-1-1-2', title: 'Canais de atendimento modernos', duration: '20min', order: 2 },
          { id: 'les-1-1-3', title: 'Empatia e escuta ativa', duration: '18min', order: 3 },
        ],
      },
      {
        id: 'mod-1-2',
        title: 'Comunicação Eficaz',
        order: 2,
        lessons: [
          { id: 'les-1-2-1', title: 'Comunicação escrita profissional', duration: '22min', order: 1 },
          { id: 'les-1-2-2', title: 'Resolução de conflitos', duration: '25min', order: 2 },
        ],
      },
    ],
    createdAt: '2025-10-01',
  },
  {
    id: 'course-2',
    title: 'Social Media na Prática',
    description: 'Aprenda a criar, gerenciar e monetizar perfis profissionais nas principais redes sociais. Do planejamento de conteúdo à análise de métricas.',
    instructor: 'Camila Santos',
    thumbnail: '',
    duration: '16 horas',
    level: 'Iniciante',
    track: 'social-media',
    price: 0,
    isFree: true,
    modules: [
      {
        id: 'mod-2-1',
        title: 'Planejamento de Conteúdo',
        order: 1,
        lessons: [
          { id: 'les-2-1-1', title: 'Calendário editorial', duration: '20min', order: 1 },
          { id: 'les-2-1-2', title: 'Tipos de conteúdo por plataforma', duration: '25min', order: 2 },
        ],
      },
      {
        id: 'mod-2-2',
        title: 'Instagram para Negócios',
        order: 2,
        lessons: [
          { id: 'les-2-2-1', title: 'Perfil profissional otimizado', duration: '18min', order: 1 },
          { id: 'les-2-2-2', title: 'Reels e Stories que convertem', duration: '22min', order: 2 },
          { id: 'les-2-2-3', title: 'Métricas e insights', duration: '20min', order: 3 },
        ],
      },
    ],
    createdAt: '2025-10-15',
  },
  {
    id: 'course-3',
    title: 'Assistência Virtual Profissional',
    description: 'Torne-se uma assistente virtual completa. Aprenda gestão de agenda, organização de processos, ferramentas digitais e como conquistar seus primeiros clientes.',
    instructor: 'Fernanda Oliveira',
    thumbnail: '',
    duration: '20 horas',
    level: 'Intermediário',
    track: 'virtual-assistance',
    price: 49.90,
    isFree: false,
    modules: [
      {
        id: 'mod-3-1',
        title: 'Introdução à Assistência Virtual',
        order: 1,
        lessons: [
          { id: 'les-3-1-1', title: 'O mercado de assistência virtual', duration: '15min', order: 1 },
          { id: 'les-3-1-2', title: 'Ferramentas essenciais', duration: '25min', order: 2 },
        ],
      },
      {
        id: 'mod-3-2',
        title: 'Gestão e Organização',
        order: 2,
        lessons: [
          { id: 'les-3-2-1', title: 'Google Workspace avançado', duration: '30min', order: 1 },
          { id: 'les-3-2-2', title: 'Gestão de tarefas e projetos', duration: '25min', order: 2 },
          { id: 'les-3-2-3', title: 'Comunicação com clientes', duration: '20min', order: 3 },
        ],
      },
    ],
    createdAt: '2025-11-01',
  },
  {
    id: 'course-4',
    title: 'Vendas Online e E-commerce',
    description: 'Do zero à primeira venda: aprenda a criar e gerenciar sua loja online, estratégias de vendas em marketplaces e técnicas de conversão.',
    instructor: 'Ana Paula Lima',
    thumbnail: '',
    duration: '14 horas',
    level: 'Iniciante',
    track: 'online-sales',
    price: 0,
    isFree: true,
    modules: [
      {
        id: 'mod-4-1',
        title: 'Fundamentos de Vendas Online',
        order: 1,
        lessons: [
          { id: 'les-4-1-1', title: 'Panorama do e-commerce brasileiro', duration: '18min', order: 1 },
          { id: 'les-4-1-2', title: 'Escolhendo sua plataforma', duration: '22min', order: 2 },
        ],
      },
      {
        id: 'mod-4-2',
        title: 'Estratégias de Conversão',
        order: 2,
        lessons: [
          { id: 'les-4-2-1', title: 'Copywriting para vendas', duration: '20min', order: 1 },
          { id: 'les-4-2-2', title: 'Fotos e descrições que vendem', duration: '25min', order: 2 },
        ],
      },
    ],
    createdAt: '2025-11-15',
  },
  {
    id: 'course-5',
    title: 'Design Básico com Canva',
    description: 'Crie peças gráficas profissionais sem experiência prévia em design. Aprenda os princípios visuais e domine o Canva para produzir conteúdo para redes sociais e materiais corporativos.',
    instructor: 'Juliana Rodrigues',
    thumbnail: '',
    duration: '10 horas',
    level: 'Iniciante',
    track: 'basic-design',
    price: 0,
    isFree: true,
    modules: [
      {
        id: 'mod-5-1',
        title: 'Princípios de Design',
        order: 1,
        lessons: [
          { id: 'les-5-1-1', title: 'Cores, tipografia e composição', duration: '25min', order: 1 },
          { id: 'les-5-1-2', title: 'Hierarquia visual', duration: '20min', order: 2 },
        ],
      },
      {
        id: 'mod-5-2',
        title: 'Canva na Prática',
        order: 2,
        lessons: [
          { id: 'les-5-2-1', title: 'Navegando a plataforma', duration: '15min', order: 1 },
          { id: 'les-5-2-2', title: 'Criando posts para redes sociais', duration: '30min', order: 2 },
          { id: 'les-5-2-3', title: 'Apresentações profissionais', duration: '25min', order: 3 },
        ],
      },
    ],
    createdAt: '2025-12-01',
  },
  {
    id: 'course-6',
    title: 'Edição de Vídeo para Redes Sociais',
    description: 'Aprenda a editar vídeos profissionais para YouTube, Instagram e TikTok. Do corte básico aos efeitos avançados, usando ferramentas gratuitas e acessíveis.',
    instructor: 'Patricia Mendes',
    thumbnail: '',
    duration: '18 horas',
    level: 'Intermediário',
    track: 'video-editing',
    price: 59.90,
    isFree: false,
    modules: [
      {
        id: 'mod-6-1',
        title: 'Fundamentos de Edição',
        order: 1,
        lessons: [
          { id: 'les-6-1-1', title: 'Introdução ao CapCut e DaVinci', duration: '20min', order: 1 },
          { id: 'les-6-1-2', title: 'Cortes, transições e ritmo', duration: '25min', order: 2 },
        ],
      },
      {
        id: 'mod-6-2',
        title: 'Edição para Plataformas',
        order: 2,
        lessons: [
          { id: 'les-6-2-1', title: 'Reels e TikTok: formato vertical', duration: '22min', order: 1 },
          { id: 'les-6-2-2', title: 'YouTube: formato longo', duration: '28min', order: 2 },
          { id: 'les-6-2-3', title: 'Legendas e acessibilidade', duration: '18min', order: 3 },
        ],
      },
    ],
    createdAt: '2025-12-15',
  },
];

// --- Partnerships ---
export const partnerships: Partnership[] = [
  {
    id: 'partner-1',
    name: 'SEBRAE',
    description: 'Apoio ao empreendedorismo feminino e capacitação de pequenos negócios.',
    logo: '',
  },
  {
    id: 'partner-2',
    name: 'SENAI',
    description: 'Formação técnica e profissional para inserção no mercado de trabalho.',
    logo: '',
  },
  {
    id: 'partner-3',
    name: 'SENAC',
    description: 'Cursos de qualificação profissional em diversas áreas do conhecimento.',
    logo: '',
  },
];

// --- Impact Metrics ---
export const impactMetrics: ImpactMetrics = {
  professionalsAllocated: 847,
  partnerCompanies: 52,
  trainingTracks: 6,
  completionRate: 89,
  satisfactionScore: 97,
};

// --- Mock Users (for login testing) ---
export const mockUsers = {
  person: {
    id: 'user-person-1',
    type: 'person' as const,
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '(11) 99999-0001',
    password: 'senha123',
  },
  company: {
    id: 'comp-1',
    type: 'company' as const,
    name: 'TechNova Soluções Digitais',
    email: 'rh@technova.com.br',
    password: 'senha123',
  },
};

// --- In-memory session store ---
export const sessions: Map<string, { userId: string; type: 'person' | 'company' }> = new Map();
export const registeredPersons: Person[] = [
  {
    id: 'user-person-1',
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '(11) 99999-0001',
    password: 'senha123',
    createdAt: '2026-01-01',
  },
];
export const applications: Application[] = [];
