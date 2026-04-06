/* ============================================================
   QUEJINHO VEÍCULOS — Dados centralizados
   Carrega do Firebase Firestore. Fallback para dados locais.
   ============================================================ */

/* ---------- Firebase Config ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyD7ImWnSeSb3DTuyXTnS55gRsqkBZZv5q8",
  authDomain: "clientes-admin-a2258.firebaseapp.com",
  projectId: "clientes-admin-a2258",
  storageBucket: "clientes-admin-a2258.firebasestorage.app",
  messagingSenderId: "598293541730",
  appId: "1:598293541730:web:bdee1e314b46e5fa9ff23b"
};

/* Slug desta garagem no Firestore */
const GARAGEM_SLUG = 'quejinho-veiculos';

/* ---------- Dados fallback (usados se Firebase falhar) ---------- */

let businessInfo = {
  name: "Quejinho Veículos",
  city: "Taquaritinga - SP",
  slogan: "Confiança que te leva mais longe",
  tagline: "Compra, Venda, Troca e Financiamento de Veículos",
  whatsapp: "(16) 99635-5566",
  whatsappNumber: "5516996355566",
  phone: "(16) 99635-5566",
  address: "Rua a confirmar, 000",
  neighborhood: "Centro",
  cityState: "Taquaritinga - SP",
  cep: "15900-000",
  hours: {
    weekdays: "Segunda a Sexta: 08:30 às 18:00",
    saturday: "Sábado: 08:30 às 12:00"
  },
  instagram: "https://instagram.com/quejinhoveiculostaquaritinga",
  facebook: "https://facebook.com/quejinhoveiculos",
  googleMapsEmbed: "https://www.google.com/maps?q=Taquaritinga+SP&output=embed",
  googleMapsLink: "https://www.google.com/maps/search/Quejinho+Ve%C3%ADculos+Taquaritinga+SP"
};

/* ---------- Mensagens prontas WhatsApp ---------- */
const whatsappMessages = {
  general: "Olá! Vim pelo site e quero mais informações sobre os veículos da Quejinho Veículos.",
  interest: (carName) =>
    `Olá! Tenho interesse no ${carName} e gostaria de mais detalhes.`,
  trade: "Olá! Quero avaliar meu carro na troca.",
  finance: "Olá! Quero simular financiamento.",
  contact: "Olá! Quero falar com a Quejinho Veículos."
};

/* ---------- Veículos (fallback vazio — dados vêm do Firebase) ---------- */
let featuredCars = [];

/* ---------- Depoimentos ---------- */
/* NOTA: Estes são exemplos editáveis. Substitua pelos depoimentos reais. */
const testimonials = [
  {
    name: "Ricardo Mendes",
    city: "Taquaritinga - SP",
    text: "Comprei meu Corolla na Quejinho e o atendimento foi impecável. Desde a negociação até a entrega, tudo transparente e rápido. Recomendo de olhos fechados.",
    stars: 5
  },
  {
    name: "Camila Ferreira",
    city: "Monte Azul Paulista - SP",
    text: "Fiz a troca do meu carro e financiei um seminovo. O pessoal da Quejinho me ajudou em tudo, desde a avaliação até a aprovação do crédito. Muito satisfeita!",
    stars: 5
  },
  {
    name: "João Paulo Silva",
    city: "Taquaritinga - SP",
    text: "Já é o segundo carro que compro com eles. Confiança total na procedência dos veículos e no atendimento. A Quejinho é referência aqui na região.",
    stars: 5
  },
  {
    name: "Fernanda Oliveira",
    city: "Bebedouro - SP",
    text: "Encontrei o carro que queria pelo Instagram e fui até a loja. O atendimento presencial foi ainda melhor do que eu esperava. Saí de lá de carro novo no mesmo dia!",
    stars: 5
  }
];

/* ---------- Diferenciais / destaques ---------- */
const highlights = [
  {
    icon: "shield-check",
    title: "Procedência garantida",
    text: "Todos os veículos passam por verificação completa de histórico e documentação."
  },
  {
    icon: "handshake",
    title: "Atendimento transparente",
    text: "Negociação clara, sem surpresas. Você sabe exatamente o que está contratando."
  },
  {
    icon: "banknotes",
    title: "Financiamento facilitado",
    text: "Trabalhamos com os principais bancos para encontrar a melhor taxa para você."
  },
  {
    icon: "arrows-exchange",
    title: "Avaliação justa na troca",
    text: "Seu usado vale mais aqui. Avaliamos na hora e damos o melhor valor."
  },
  {
    icon: "clock",
    title: "Agilidade no processo",
    text: "Da escolha à entrega, fazemos tudo de forma rápida e sem burocracia."
  },
  {
    icon: "map-pin",
    title: "Referência em Taquaritinga",
    text: "Presença consolidada na região, com clientes que voltam e indicam."
  }
];

/* ---------- FAQ ---------- */
const faqItems = [
  {
    question: "Vocês financiam veículos?",
    answer: "Sim! Trabalhamos com os principais bancos e financeiras do mercado. Fazemos a simulação na hora e buscamos as melhores taxas e condições para o seu perfil."
  },
  {
    question: "Aceitam veículo na troca?",
    answer: "Com certeza. Avaliamos o seu veículo usado de forma justa e transparente, e o valor pode ser usado como entrada na compra do novo."
  },
  {
    question: "Posso falar direto no WhatsApp?",
    answer: "Sim! Nosso atendimento pelo WhatsApp é rápido e sem compromisso. Você pode tirar dúvidas, pedir fotos e até iniciar a negociação por lá."
  },
  {
    question: "Os veículos têm procedência verificada?",
    answer: "Todos os nossos veículos passam por verificação completa de documentação, histórico e condições mecânicas antes de serem disponibilizados para venda."
  },
  {
    question: "Qual o horário de atendimento?",
    answer: "Atendemos de segunda a sexta das 08:30 às 18:00 e aos sábados das 08:30 às 12:00. Pelo WhatsApp, você também pode enviar mensagem fora do horário."
  },
  {
    question: "Vocês atendem clientes de outras cidades?",
    answer: "Sim! Recebemos clientes de toda a região. Muitos dos nossos compradores vêm de cidades vizinhas como Bebedouro, Monte Azul Paulista, Jaboticabal e outras."
  }
];

/* ---------- Carregamento do Firebase ---------- */
const dataReady = (async function loadFromFirebase() {
  try {
    // Verificar se Firebase SDK está disponível
    if (typeof firebase === 'undefined' || !firebase.initializeApp) {
      console.warn('Firebase SDK não disponível, usando dados locais.');
      return;
    }

    firebase.initializeApp(firebaseConfig);
    const firestore = firebase.firestore();

    const [infoSnap, veiculosSnap] = await Promise.all([
      firestore.doc(`restaurants/${GARAGEM_SLUG}/data/businessInfo`).get(),
      firestore.doc(`restaurants/${GARAGEM_SLUG}/data/veiculos`).get()
    ]);

    if (infoSnap.exists && infoSnap.data().content) {
      businessInfo = { ...businessInfo, ...infoSnap.data().content };
    }

    if (veiculosSnap.exists && veiculosSnap.data().content) {
      // Normalizar imagens: no admin, cada imagem é {url, storagePath}
      // No site, precisamos de URLs simples ou objetos com .url
      const cars = veiculosSnap.data().content.map((car, i) => ({
        ...car,
        id: car.id || i + 1,
        images: (car.images || []).map(img =>
          typeof img === 'string' ? img : img.url
        ).filter(Boolean)
      }));
      if (cars.length > 0) {
        featuredCars = cars;
      }
    }

    console.log('Dados carregados do Firebase:', featuredCars.length, 'veículos');
  } catch (err) {
    console.warn('Falha ao carregar do Firebase, usando dados locais:', err.message);
  }
})();
