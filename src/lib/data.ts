// ===== Dados centrais do Espaço Cuide-se Bem =====

export const CLINIC = {
  name: "Espaço Cuide-se Bem",
  phoneDisplay: "(61) 98171-0348",
  whatsapp: "5561981710348",
  email: "contato@clinicaadrianaestetica.com.br",
  address: "QNN 1, Conjunto D, Casa 11 — Ceilândia, Brasília - DF",
  instagram: "https://www.instagram.com/espacocuide_se_bem",
  instagramHandle: "@espacocuide_se_bem",
  // Cole aqui o "Place ID" do Google da clínica (formato ChIJ..., ver instruções).
  // Com ele, o botão "Avaliar no Google" abre DIRETO a janela de avaliação.
  googlePlaceId: "",
  // Página exata da clínica no Google (identificador único do perfil).
  // Usado como destino do botão de avaliação enquanto o Place ID não é preenchido.
  googleListing:
    "https://www.google.com/search?kgmid=/g/11v190jxx4&q=Espa%C3%A7o+Cuide-se+Bem",
  hours: "Seg. a Sáb. · 09h às 20h",
  mapsEmbed:
    "https://www.google.com/maps?q=QNN%201%20Conjunto%20D%20Ceil%C3%A2ndia%20DF&output=embed",
  rating: 5.0,
  reviews: 10,
};

export function waLink(message: string) {
  return `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Link para o cliente avaliar a clínica direto no Google.
// Com o Place ID preenchido, abre a janela de avaliação ("escrever avaliação").
// Sem ele, abre a busca da clínica no Google Maps como fallback.
export function googleReviewLink() {
  if (!CLINIC.googlePlaceId) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${CLINIC.name} ${CLINIC.address}`
    )}`;
  }
  if (CLINIC.googlePlaceId.startsWith("http://") || CLINIC.googlePlaceId.startsWith("https://")) {
    return CLINIC.googlePlaceId;
  }
  return `https://search.google.com/local/writereview?placeid=${CLINIC.googlePlaceId}`;
}

export type Category =
  | "Facial"
  | "Corporal"
  | "Estética Avançada"
  | "Massoterapia"
  | "Harmonização Facial";

export const CATEGORIES: Category[] = [
  "Facial",
  "Corporal",
  "Estética Avançada",
  "Massoterapia",
  "Harmonização Facial",
];

export interface Professional {
  id: string;
  name: string;
  role: string;
  credential: string; // formação/certificação — troque pelo registro real (ex.: "Esteticista · CRT 0000")
  bio: string;
  image: string;
  accent: string; // gradiente
  procedures: string[];
}

export const TEAM: Professional[] = [
  {
    id: "adriana",
    name: "Dra. Adriana",
    role: "Massoterapeuta",
    credential: "Massoterapeuta certificada",
    bio: "Especialista em técnicas manuais e tecnológicas para drenar, modelar e relaxar o corpo.",
    image:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=85",
    accent: "from-emerald-400/80 to-teal-600/80",
    procedures: [
      "Drenagem Linfática",
      "Dreno Modeladora",
      "Liberação Muscular",
      "Massagem Relaxante Terapêutica",
      "Pump-Up",
      "Corrente Russa",
    ],
  },
  {
    id: "adrielhe",
    name: "Dra. Adrielhe",
    role: "Esteticista Facial",
    credential: "Esteticista facial certificada",
    bio: "Protocolos de limpeza profunda e peelings para uma pele renovada e saudável.",
    image:
      "/images/blog-facial-cropped.jpg",
    accent: "from-rose-300/80 to-pink-600/80",
    procedures: [
      "Limpeza de Pele + Consultoria",
      "Limpeza de Pele + Peeling Químico + Consultoria",
      "Limpeza de Pele + Peeling de Diamante + Consultoria",
    ],
  },
  {
    id: "angelica",
    name: "Dra. Angélica",
    role: "Estética Avançada",
    credential: "Especialista em estética avançada",
    bio: "Procedimentos avançados para rejuvenescimento, tratamento de pele e remoção de sinais.",
    image:
      "https://images.unsplash.com/photo-1713085085470-fba013d67e65?auto=format&fit=crop&w=1400&q=85",
    accent: "from-violet-300/80 to-purple-700/80",
    procedures: [
      "Consultoria Online",
      "Microagulhamento",
      "Jato de Plasma",
      "Retirada de Sinais",
      "Blefaroplastia Sem Corte",
      "Tratamento de Estrias",
      "Microderme",
    ],
  },
  {
    id: "shay",
    name: "Dra. Shay",
    role: "Esteticista & Harmonização",
    credential: "Esteticista · harmonização facial",
    bio: "Realce da beleza natural com design de sobrancelhas, harmonização facial e tratamentos corporais.",
    image:
      "https://images.unsplash.com/photo-1731355771418-f10ab62c9f86?auto=format&fit=crop&w=1400&q=85",
    accent: "from-amber-300/80 to-yellow-700/80",
    procedures: [
      "Designer de Sobrancelhas Feminina",
      "Designer de Sobrancelhas Masculina",
      "Henna",
      "Sobrancelha Definitiva",
      "Plasma",
      "Harmonização Facial",
      "Botox",
      "Tratamento de Flacidez",
      "Tratamento de Estrias",
      "Lipo Enzimática",
      "Preenchimento Labial",
    ],
  },
];

export interface Procedure {
  id: string;
  name: string;
  category: Category;
  pro: string;
  description: string;
  benefits: string[];
  duration: string;
  indication: string;
  image: string;
}

export const PROCEDURES: Procedure[] = [
  // --- Dra. Adriana ---
  {
    id: "drenagem-linfatica",
    name: "Drenagem Linfática",
    category: "Massoterapia",
    pro: "Dra. Adriana",
    description: "Massagem suave que estimula o sistema linfático, eliminando líquidos e toxinas.",
    benefits: ["Reduz inchaço", "Melhora a circulação", "Sensação de leveza"],
    duration: "60 min",
    indication: "Retenção de líquidos e pós-operatório",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dreno-modeladora",
    name: "Dreno Modeladora",
    category: "Corporal",
    pro: "Dra. Adriana",
    description: "Combina drenagem e modelagem para contornar o corpo e reduzir gordura localizada.",
    benefits: ["Modela o contorno", "Combate a celulite", "Define silhueta"],
    duration: "60 min",
    indication: "Gordura localizada e celulite",
    image: "https://images.unsplash.com/photo-1741522509438-a120c0bb5e88?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "liberacao-muscular",
    name: "Liberação Muscular",
    category: "Massoterapia",
    pro: "Dra. Adriana",
    description: "Técnica manual que aplica pressão em pontos específicos para liberar fáscia e tensões musculares.",
    benefits: ["Alivia dores crônicas", "Melhora flexibilidade", "Libera pontos de gatilho"],
    duration: "50 min",
    indication: "Tensão muscular, fadiga e recuperação física",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "massagem-relaxante-terapeutica",
    name: "Massagem Relaxante Terapêutica",
    category: "Massoterapia",
    pro: "Dra. Adriana",
    description: "Alívio do estresse e das tensões musculares com toque terapêutico e óleos essenciais.",
    benefits: ["Alivia o estresse", "Relaxa músculos", "Bem-estar total"],
    duration: "60 min",
    indication: "Estresse e tensão muscular",
    image: "https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "pump-up",
    name: "Pump-Up",
    category: "Corporal",
    pro: "Dra. Adriana",
    description: "Tratamento estético com ventosas a vácuo para levantar, modelar e tonificar os glúteos.",
    benefits: ["Efeito lifting", "Estimula a circulação", "Melhora aspecto da celulite"],
    duration: "45 min",
    indication: "Flacidez nos glúteos e melhora de contorno",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "corrente-russa",
    name: "Corrente Russa",
    category: "Corporal",
    pro: "Dra. Adriana",
    description: "Eletroestimulação que tonifica e fortalece a musculatura como um treino intenso.",
    benefits: ["Tonifica músculos", "Define o corpo", "Sem esforço físico"],
    duration: "40 min",
    indication: "Flacidez muscular e definição",
    image: "https://images.unsplash.com/photo-1646909876562-9a00dab98e65?auto=format&fit=crop&w=800&q=80",
  },

  // --- Dra. Adrielhe ---
  {
    id: "limpeza-pele-consultoria",
    name: "Limpeza de Pele + Consultoria",
    category: "Facial",
    pro: "Dra. Adrielhe",
    description: "Higienização profunda com extração de cravos e impurezas, acompanhada de consultoria de rotina facial.",
    benefits: ["Remove cravos", "Controla a oleosidade", "Pele luminosa"],
    duration: "75 min",
    indication: "Acne, cravos e pele opaca",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "limpeza-pele-peeling-quimico-consultoria",
    name: "Limpeza de Pele + Peeling Químico + Consultoria",
    category: "Facial",
    pro: "Dra. Adrielhe",
    description: "Limpeza profunda combinada com aplicação de peeling químico para renovação celular e clareamento.",
    benefits: ["Uniformiza o tom da pele", "Estimula renovação celular", "Suaviza manchas e marcas"],
    duration: "90 min",
    indication: "Manchas, sequelas de acne e rejuvenescimento",
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "limpeza-pele-peeling-diamante-consultoria",
    name: "Limpeza de Pele + Peeling de Diamante + Consultoria",
    category: "Facial",
    pro: "Dra. Adrielhe",
    description: "Limpeza profunda associada à microdermoabrasão por diamante para uma pele extremamente macia.",
    benefits: ["Esfoliação profunda", "Suaviza linhas finas", "Pele macia e renovada"],
    duration: "80 min",
    indication: "Poros dilatados, textura irregular e cravos",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80",
  },

  // --- Dra. Angélica ---
  {
    id: "consultoria-online",
    name: "Consultoria Online",
    category: "Estética Avançada",
    pro: "Dra. Angélica",
    description: "Avaliação inicial e orientação de rotinas de tratamento facial ou corporal por videochamada.",
    benefits: ["Conforto de casa", "Acompanhamento dedicado", "Rotina Skincare personalizada"],
    duration: "40 min",
    indication: "Avaliação estética e rotina de autocuidado",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "microagulhamento",
    name: "Microagulhamento",
    category: "Estética Avançada",
    pro: "Dra. Angélica",
    description: "Indução percutânea de colágeno para rejuvenescer a pele e tratar marcas e cicatrizes.",
    benefits: ["Estimula colágeno", "Reduz cicatrizes", "Firmeza da pele"],
    duration: "60 min",
    indication: "Cicatrizes de acne, poros e rugas finas",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "jato-plasma",
    name: "Jato de Plasma",
    category: "Estética Avançada",
    pro: "Dra. Angélica",
    description: "Tecnologia de descarga de plasma para retração da pele, rejuvenescimento e efeito lifting.",
    benefits: ["Efeito lifting", "Retração de pálpebras", "Estimulação profunda"],
    duration: "45 min",
    indication: "Flacidez palpebral e linhas finas",
    image: "https://images.unsplash.com/photo-1740350631565-6a5081a2f841?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "retirada-sinais",
    name: "Retirada de Sinais",
    category: "Estética Avançada",
    pro: "Dra. Angélica",
    description: "Cauterização pontual e segura de verrugas, acrocórdons e pequenos sinais na pele.",
    benefits: ["Remoção rápida", "Cicatrização limpa", "Procedimento seguro"],
    duration: "30 min",
    indication: "Sinais elevados, verrugas e marcas benignas",
    image: "https://images.unsplash.com/photo-1740350631565-6a5081a2f841?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "blefaroplastia-sem-corte",
    name: "Blefaroplastia Sem Corte",
    category: "Estética Avançada",
    pro: "Dra. Angélica",
    description: "Tratamento de jato de plasma localizado nas pálpebras para reduzir flacidez e rejuvenescer o olhar.",
    benefits: ["Sem cortes ou pontos", "Efeito lifting imediato", "Estímulo de colágeno local"],
    duration: "45 min",
    indication: "Excesso de pele nas pálpebras e pálpebra caída",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tratamento-estrias-angelica",
    name: "Tratamento de Estrias",
    category: "Estética Avançada",
    pro: "Dra. Angélica",
    description: "Associação de técnicas regeneradoras para atenuar o aspecto de estrias vermelhas e brancas.",
    benefits: ["Melhora a textura", "Estimula colágeno e elastina", "Suaviza cicatrizes lineares"],
    duration: "50 min",
    indication: "Estrias no abdômen, coxas e glúteos",
    image: "https://images.unsplash.com/photo-1570454564834-efe597f09fe4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "microderme",
    name: "Microderme",
    category: "Estética Avançada",
    pro: "Dra. Angélica",
    description: "Esfoliação mecânica profunda por microdermoabrasão para remover a camada córnea e revelar brilho.",
    benefits: ["Renovação celular", "Brilho natural instantâneo", "Melhora textura da pele"],
    duration: "40 min",
    indication: "Pele opaca, textura áspera e cravos",
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80",
  },

  // --- Dra. Shay ---
  {
    id: "designer-sobrancelhas-feminina",
    name: "Designer de Sobrancelhas Feminina",
    category: "Facial",
    pro: "Dra. Shay",
    description: "Design personalizado seguindo as linhas do visagismo facial feminino.",
    benefits: ["Realça o olhar", "Simetria perfeita", "Acabamento impecável"],
    duration: "30 min",
    indication: "Definição do olhar feminino",
    image: "https://images.unsplash.com/photo-1620508467736-0140acd17ce4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "designer-sobrancelhas-masculina",
    name: "Designer de Sobrancelhas Masculina",
    category: "Facial",
    pro: "Dra. Shay",
    description: "Design e limpeza de sobrancelhas adaptados às características faciais masculinas.",
    benefits: ["Aparência limpa", "Naturalidade", "Harmonia facial"],
    duration: "30 min",
    indication: "Definição do olhar masculino",
    image: "https://images.unsplash.com/photo-1620508467736-0140acd17ce4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "henna",
    name: "Henna",
    category: "Facial",
    pro: "Dra. Shay",
    description: "Pigmentação temporária das sobrancelhas para preenchimento de falhas e realce do contorno.",
    benefits: ["Preenche falhas", "Praticidade diária", "Destaque no olhar"],
    duration: "40 min",
    indication: "Sobrancelhas claras ou com falhas",
    image: "https://images.unsplash.com/photo-1620508467736-0140acd17ce4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sobrancelha-definitiva",
    name: "Sobrancelha Definitiva",
    category: "Facial",
    pro: "Dra. Shay",
    description: "Micropigmentação duradoura de sobrancelhas com técnica fio a fio ou shadow para simetria ideal.",
    benefits: ["Alta durabilidade", "Resultado hiper-realista", "Fim do lápis de sobrancelha"],
    duration: "120 min",
    indication: "Falta de pelos ou falhas permanentes",
    image: "https://images.unsplash.com/photo-1620508467736-0140acd17ce4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "plasma-shay",
    name: "Plasma",
    category: "Estética Avançada",
    pro: "Dra. Shay",
    description: "Tratamento estético com plasma para estímulo de colágeno, renovação tecidual e rejuvenescimento.",
    benefits: ["Estimula colágeno", "Suaviza rugas finas", "Firmeza da pele"],
    duration: "45 min",
    indication: "Flacidez facial e rugas superficiais",
    image: "https://images.unsplash.com/photo-1740350631565-6a5081a2f841?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "harmonizacao-shay",
    name: "Harmonização Facial",
    category: "Harmonização Facial",
    pro: "Dra. Shay",
    description: "Equilíbrio das proporções faciais com preenchimentos estratégicos de ácido hialurônico e toxinas.",
    benefits: ["Realça a beleza natural", "Restaura volumes faciais", "Aparência descansada"],
    duration: "60 min",
    indication: "Assimetrias, perda de contorno e volume",
    image: "https://images.unsplash.com/photo-1737215398603-2ef701df8036?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "botox",
    name: "Botox",
    category: "Harmonização Facial",
    pro: "Dra. Shay",
    description: "Aplicação de toxina botulínica para suavizar e prevenir marcas e rugas de expressão.",
    benefits: ["Suaviza rugas na testa e olhos", "Efeito preventivo", "Aparência rejuvenescida"],
    duration: "30 min",
    indication: "Linhas de expressão e prevenção do envelhecimento",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tratamento-flacidez",
    name: "Tratamento de Flacidez",
    category: "Corporal",
    pro: "Dra. Shay",
    description: "Protocolo firmador corporal com radiofrequência ou ativos estéticos para aumentar a tonicidade cutânea.",
    benefits: ["Aumenta firmeza da pele", "Estimula elastina e colágeno", "Melhora o contorno corporal"],
    duration: "50 min",
    indication: "Flacidez tecidual no abdômen, coxas e braços",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tratamento-estrias-shay",
    name: "Tratamento de Estrias (Shay)",
    category: "Corporal",
    pro: "Dra. Shay",
    description: "Protocolo corporal focado na regeneração da pele com estrias através de microagulhamento ou peeling químico.",
    benefits: ["Atenua estrias", "Estimula circulação e colágeno", "Suaviza relevo da pele"],
    duration: "45 min",
    indication: "Estrias corporais avermelhadas ou esbranquiçadas",
    image: "https://images.unsplash.com/photo-1570454564834-efe597f09fe4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lipo-enzimatica-shay",
    name: "Lipo Enzimática",
    category: "Corporal",
    pro: "Dra. Shay",
    description: "Aplicação subcutânea de enzimas lipolíticas para dissolução da gordura localizada resistente.",
    benefits: ["Reduz gordura localizada", "Reduz medidas", "Sem repouso necessário"],
    duration: "50 min",
    indication: "Gordura na papada, abdômen, flancos e coxas",
    image: "https://images.unsplash.com/photo-1570454564834-efe597f09fe4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "preenchimento-labial-shay",
    name: "Preenchimento Labial",
    category: "Harmonização Facial",
    pro: "Dra. Shay",
    description: "Modelagem e volumização labial com ácido hialurônico para simetria, volume e contorno dos lábios.",
    benefits: ["Lábios desenhados e hidratados", "Volume controlado e natural", "Equilibra proporções da boca"],
    duration: "45 min",
    indication: "Lábios finos, assimétricos ou sem contorno definido",
    image: "https://images.unsplash.com/photo-1549153052-247abe00d6d9?auto=format&fit=crop&w=800&q=80",
  },
];

export interface Testimonial {
  name: string;
  treatment: string;
  text: string;
  initial: string;
  accent: string;
}

// Avaliações REAIS do Google (transcritas dos prints do perfil da clínica).
// O campo "treatment" mostra o selo do avaliador (Local Guide) ou a origem.
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Clara Ilke Soares",
    treatment: "Local Guide · 26 avaliações",
    text: "Espaço acolhedor, limpo e organizado e atendimento de excelência tanto pela massoterapeuta Adriana quanto pela enfermeira esteta Angélica. Ambas são cuidadosas, pacíficas, oferecem serviços de ótima qualidade e preços acessíveis. O tratamento com a Adriana melhorou muito minhas dores nos ombros por tensão, e a consultoria de skin care, limpeza de pele e peeling da Angélica são incríveis. Recomendo para todos!",
    initial: "C",
    accent: "from-emerald-400 to-teal-600",
  },
  {
    name: "Gessyane Martins",
    treatment: "Avaliação no Google",
    text: "Amei o espaço, sou muito bem recebida sempre, atendimento de qualidade e preço excelente. Espaço super limpo e organizado. Super recomendo!",
    initial: "G",
    accent: "from-rose-400 to-pink-600",
  },
  {
    name: "Arthur Wilkersson",
    treatment: "Local Guide · 21 avaliações",
    text: "Ótimo lugar, preços acessíveis e com um ótimo atendimento.",
    initial: "A",
    accent: "from-amber-400 to-yellow-600",
  },
  {
    name: "Suelen Oliveira",
    treatment: "Avaliação no Google",
    text: "Espaço lindo, aconchegante, e ótimas profissionais. Super recomendo, nota mil! 😍",
    initial: "S",
    accent: "from-violet-400 to-purple-600",
  },
  {
    name: "Juliana Lima Vieira",
    treatment: "Avaliação no Google",
    text: "Excelente espaço! Sempre sou muito bem recebida!",
    initial: "J",
    accent: "from-sky-400 to-blue-600",
  },
  {
    name: "Alberto Monteiro",
    treatment: "Avaliação no Google",
    text: "Tem um ótimo serviço de pele, eu fiz, gostei e aprovo. 😊",
    initial: "A",
    accent: "from-emerald-400 to-teal-600",
  },
  {
    name: "Jaqueline Albuquerque",
    treatment: "Local Guide · 5 avaliações",
    text: "Lugar muito bom, acolhedor. Aconselho demais, muito bom mesmo.",
    initial: "J",
    accent: "from-rose-400 to-pink-600",
  },
  {
    name: "Luiz Gabriel",
    treatment: "Local Guide · 35 avaliações",
    text: "São incríveis!",
    initial: "L",
    accent: "from-amber-400 to-yellow-600",
  },
];

export interface FAQItem {
  q: string;
  a: string;
  icon?: string;
}

export const FAQ: FAQItem[] = [
  {
    q: "Como faço para agendar uma consulta?",
    a: "Você pode agendar diretamente pelo nosso WhatsApp clicando no botão “Agendar” ou falando com a equipe no número (61) 98171-0348.",
    icon: "calendar",
  },
  {
    q: "Os procedimentos são seguros?",
    a: "Sim. Todos os tratamentos são realizados por profissionais certificadas, utilizando aparelhos de última geração e seguindo todas as normas de segurança.",
    icon: "shield",
  },
  {
    q: "Vocês oferecem consultoria online?",
    a: "Oferecemos. A Dra. Angélica realiza consultorias de estética personalizada e avaliações por videochamada no conforto da sua casa.",
    icon: "video",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "Aceitamos PIX, cartões de crédito e débito. Oferecemos parcelamento facilitado em até 10x sem juros dependendo do tratamento.",
    icon: "card",
  },
  {
    q: "Atendem o público masculino?",
    a: "Sim! Nosso espaço é preparado para atender a todos. Oferecemos limpeza de pele masculina, massagens relaxantes, drenagem e design de sobrancelhas personalizado.",
    icon: "users",
  },
  {
    q: "Preciso fazer avaliação prévia?",
    a: "Sim. A avaliação facial ou corporal com nossas especialistas é essencial para mapearmos suas necessidades, histórico de saúde e indicar o protocolo perfeito.",
    icon: "sparkles",
  },
  {
    q: "Quais os horários de atendimento?",
    a: "Funcionamos de Segunda a Sábado, das 09h às 20h, sempre com agendamento prévio para garantir total exclusividade no seu horário de atendimento.",
    icon: "clock",
  },
  {
    q: "Onde fica a clínica?",
    a: "Estamos na QNN 1, Conjunto D, Casa 11 — Ceilândia Norte. Nosso acesso é facilitado e contamos com estacionamento público na porta do local.",
    icon: "mapPin",
  },
];

export interface BlogPost {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  tips: string[];
  relatedPro: string;
}

export const BLOG: BlogPost[] = [
  {
    title: "Como a Drenagem Linfática acelera seu metabolismo",
    category: "Estética Corporal",
    excerpt: "Entenda por que a técnica manual da Dra. Adriana vai muito além de reduzir o inchaço, combatendo a retenção de líquidos e celulite.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
    readTime: "4 min",
    tips: [
      "Eliminação de toxinas e líquidos retidos",
      "Redução visível de medidas corporais",
      "Melhora na circulação e oxigenação"
    ],
    relatedPro: "Drenagem Linfática",
  },
  {
    title: "Limpeza de Pele Profunda vs. Cuidados de Casa",
    category: "Estética Facial",
    excerpt: "Sabia que a rotina diária não remove cravos profundos? Descubra como a extração profissional da Dra. Adrielhe purifica e renova a pele.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80",
    readTime: "5 min",
    tips: [
      "Remoção profunda de cravos e impurezas",
      "Esfoliação e renovação celular facial",
      "Consultoria personalizada de rotina"
    ],
    relatedPro: "Limpeza de Pele + Consultoria",
  },
  {
    title: "O Poder do Estímulo de Colágeno Natural",
    category: "Estética Avançada",
    excerpt: "Microagulhamento e Jato de Plasma: entenda como as técnicas da Dra. Angélica induzem a cicatrização para suavizar rugas e marcas.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    readTime: "6 min",
    tips: [
      "Indução potente de novo colágeno",
      "Suavização de cicatrizes e rugas",
      "Efeito lifting e firmeza cutânea"
    ],
    relatedPro: "Microagulhamento",
  },
  {
    title: "Harmonização Facial e Lábios: O Segredo",
    category: "Harmonização",
    excerpt: "Preenchimento labial e Botox com naturalidade. Veja como a Dra. Shay equilibra as proporções faciais realçando seus traços únicos.",
    image: "https://images.unsplash.com/photo-1737215398603-2ef701df8036?auto=format&fit=crop&w=800&q=80",
    readTime: "5 min",
    tips: [
      "Volumização e contorno labial natural",
      "Suavização de linhas de expressão",
      "Aplicação sob medida pelo visagismo"
    ],
    relatedPro: "Preenchimento Labial",
  },
];

// ===== Feed do Instagram =====
// Para um feed REAL e automático (atualiza sozinho ao postar), conecte um widget
// gratuito como SnapWidget, Behold.so ou Elfsight e cole o embed na seção InstagramFeed.
// Enquanto isso, troque as imagens abaixo pelas fotos reais dos posts da clínica.
export interface InstaPost {
  image: string;
  caption: string;
}

export const INSTAGRAM_POSTS: InstaPost[] = [
  { image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80", caption: "Cuidado facial sob medida" },
  { image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80", caption: "Pele renovada e saudável" },
  { image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80", caption: "Relaxamento e bem-estar" },
  { image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=600&q=80", caption: "Resultados que dão confiança" },
  { image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=600&q=80", caption: "Ambiente acolhedor" },
  { image: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?auto=format&fit=crop&w=600&q=80", caption: "Beleza natural realçada" },
];

export const STATS = [
  { value: 12, suffix: "+", label: "Anos de experiência" },
  { value: 5000, suffix: "+", label: "Atendimentos realizados" },
  { value: 4, suffix: "", label: "Especialistas" },
  { value: 5, suffix: ",0", label: "Nota no Google" },
];
