import type { StaticImageData } from "next/image";
import fotoSala from "@/assets/instagram/sala.jpg";
import fotoFacial from "@/assets/instagram/facial.jpg";
import fotoProdutos from "@/assets/instagram/produtos.jpg";
import fotoMassagem from "@/assets/instagram/massagem.jpg";
import fotoDrenagem from "@/assets/instagram/drenagem.jpg";

/**
 * Fotos reais do perfil da clínica (@espacocuide_se_bem).
 *
 * Import estático e não string em `public/`: o site vive sob `/<repo>/` no
 * GitHub Pages, e o `next/image` com `unoptimized` **não** acrescenta o
 * `basePath` a uma string — a foto quebraria só em produção. O import passa
 * pelo bundler, que já devolve o caminho certo.
 *
 * ponytail: recortadas de uma captura de tela do perfil (cerca de 180px de
 * origem, ampliadas). Servem no tamanho em que aparecem; trocar pelos arquivos
 * originais dos posts melhora a nitidez sem mexer em mais nada.
 */
export const PHOTOS = {
  sala: fotoSala,
  facial: fotoFacial,
  produtos: fotoProdutos,
  massagem: fotoMassagem,
  drenagem: fotoDrenagem,
} satisfies Record<string, StaticImageData>;

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
  /** Retrato real em `public/images/`. Vazio mostra o monograma no lugar. */
  image: string;
  procedures: string[];
}

export const TEAM: Professional[] = [
  {
    id: "adriana",
    name: "Dra. Adriana",
    role: "Massoterapeuta",
    credential: "Massoterapeuta certificada",
    bio: "Especialista em técnicas manuais e tecnológicas para drenar, modelar e relaxar o corpo.",
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
  },
];

// ===== Investimento =====
// Sem valores de propósito: preço varia por protocolo e sai na avaliação.
// As formas de pagamento abaixo vêm do FAQ da clínica.
export const PAYMENT = [
  { label: "PIX", note: "À vista, com confirmação na hora" },
  { label: "Cartão de crédito", note: "Até 10x sem juros, conforme o tratamento" },
  { label: "Cartão de débito", note: "Direto na maquininha" },
];

// ===== Fotos do espaço =====
// O que mais aparece nas avaliações do Google é o ambiente ("acolhedor, limpo
// e organizado") — por isso ele tem lugar próprio na seção "A Clínica".
// As fotos vêm de PHOTOS (topo do arquivo). `null` = espaço reservado.
export interface ClinicPhoto {
  label: string;
  src: StaticImageData | null;
}

export const CLINIC_PHOTOS: ClinicPhoto[] = [
  { label: "Sala de atendimento", src: PHOTOS.sala },
  { label: "Cabine de estética facial", src: PHOTOS.facial },
  { label: "Os produtos que usamos", src: PHOTOS.produtos },
];

// ===== Antes & Depois =====
// Para publicar um resultado, coloque as duas fotos em `public/images/` e
// preencha `before` e `after` (ex.: "/images/drenagem-antes.jpg").
// Enquanto os dois campos estiverem vazios, a seção mostra um espaço
// reservado no lugar — o comparador só aparece com as fotos reais.
export interface ResultPair {
  label: string;
  pro: string;
  before: string;
  after: string;
}

export const RESULTS: ResultPair[] = [
  { label: "Dreno Modeladora", pro: "Dra. Adriana", before: "", after: "" },
  { label: "Limpeza de Pele", pro: "Dra. Adrielhe", before: "", after: "" },
  { label: "Microagulhamento", pro: "Dra. Angélica", before: "", after: "" },
  { label: "Harmonização Facial", pro: "Dra. Shay", before: "", after: "" },
];

export interface Testimonial {
  name: string;
  treatment: string;
  text: string;
  initial: string;
}

// Avaliações REAIS do Google (transcritas dos prints do perfil da clínica).
// O campo "treatment" mostra o selo do avaliador (Local Guide) ou a origem.
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Clara Ilke Soares",
    treatment: "Local Guide · 26 avaliações",
    text: "Espaço acolhedor, limpo e organizado e atendimento de excelência tanto pela massoterapeuta Adriana quanto pela enfermeira esteta Angélica. Ambas são cuidadosas, pacíficas, oferecem serviços de ótima qualidade e preços acessíveis. O tratamento com a Adriana melhorou muito minhas dores nos ombros por tensão, e a consultoria de skin care, limpeza de pele e peeling da Angélica são incríveis. Recomendo para todos!",
    initial: "C",
  },
  {
    name: "Gessyane Martins",
    treatment: "Avaliação no Google",
    text: "Amei o espaço, sou muito bem recebida sempre, atendimento de qualidade e preço excelente. Espaço super limpo e organizado. Super recomendo!",
    initial: "G",
  },
  {
    name: "Arthur Wilkersson",
    treatment: "Local Guide · 21 avaliações",
    text: "Ótimo lugar, preços acessíveis e com um ótimo atendimento.",
    initial: "A",
  },
  {
    name: "Suelen Oliveira",
    treatment: "Avaliação no Google",
    text: "Espaço lindo, aconchegante, e ótimas profissionais. Super recomendo, nota mil! 😍",
    initial: "S",
  },
  {
    name: "Juliana Lima Vieira",
    treatment: "Avaliação no Google",
    text: "Excelente espaço! Sempre sou muito bem recebida!",
    initial: "J",
  },
  {
    name: "Alberto Monteiro",
    treatment: "Avaliação no Google",
    text: "Tem um ótimo serviço de pele, eu fiz, gostei e aprovo. 😊",
    initial: "A",
  },
  {
    name: "Jaqueline Albuquerque",
    treatment: "Local Guide · 5 avaliações",
    text: "Lugar muito bom, acolhedor. Aconselho demais, muito bom mesmo.",
    initial: "J",
  },
  {
    name: "Luiz Gabriel",
    treatment: "Local Guide · 35 avaliações",
    text: "São incríveis!",
    initial: "L",
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
  readTime: string;
  tips: string[];
  relatedPro: string;
}

export const BLOG: BlogPost[] = [
  {
    title: "Como a Drenagem Linfática acelera seu metabolismo",
    category: "Estética Corporal",
    excerpt: "Entenda por que a técnica manual da Dra. Adriana vai muito além de reduzir o inchaço, combatendo a retenção de líquidos e celulite.",
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
// Enquanto isso, as fotos abaixo são posts reais do perfil (ver PHOTOS).
export interface InstaPost {
  image: StaticImageData | null;
  caption: string;
}

export const INSTAGRAM_POSTS: InstaPost[] = [
  { image: PHOTOS.facial, caption: "Cuidado facial sob medida" },
  { image: PHOTOS.massagem, caption: "Massagem e liberação" },
  { image: PHOTOS.sala, caption: "Ambiente acolhedor" },
  { image: PHOTOS.drenagem, caption: "Drenagem modeladora" },
  { image: PHOTOS.produtos, caption: "Produtos profissionais" },
];

export const STATS = [
  { value: 12, suffix: "+", label: "Anos de experiência" },
  { value: 5000, suffix: "+", label: "Atendimentos realizados" },
  { value: 4, suffix: "", label: "Especialistas" },
  { value: 5, suffix: ",0", label: "Nota no Google" },
];
