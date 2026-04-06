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

/* ---------- Veículos (fallback demo — substituídos pelo Firebase quando disponível) ---------- */
let featuredCars = [
  {
    id: 1, brand: "Toyota", name: "Toyota Corolla XEi 2.0", year: "2021/2022",
    fuel: "Flex", transmission: "Automático", km: "38.000 km", price: "R$ 129.900",
    images: [
      "https://www.autoo.com.br/fotos/2020/9/960_720/toyota_corolla_2021_1_25092020_35097_960_720.jpg",
      "https://www.autoo.com.br/fotos/2020/9/960_720/toyota_corolla_2021_1_25092020_35098_960_720.jpg",
      "https://www.autoo.com.br/fotos/2020/9/960_720/toyota_corolla_2021_1_25092020_35099_960_720.jpg"
    ], badge: "Destaque"
  },
  {
    id: 2, brand: "Jeep", name: "Jeep Compass Limited", year: "2022/2022",
    fuel: "Flex", transmission: "Automático", km: "27.000 km", price: "R$ 159.900",
    images: [
      "https://www.autoo.com.br/fotos/2021/11/960_720/jeep_compass_2022_1_19112021_67846_960_720.jpg",
      "https://www.autoo.com.br/fotos/2021/11/960_720/jeep_compass_2022_1_19112021_67847_960_720.jpg",
      "https://www.autoo.com.br/fotos/2022/6/960_720/jeep_compass_2022_1_03062022_71575_960_720.jpg"
    ], badge: "Seminovo"
  },
  {
    id: 3, brand: "Fiat", name: "Fiat Pulse Audace Turbo", year: "2023/2024",
    fuel: "Flex", transmission: "Automático", km: "8.500 km", price: "R$ 109.900",
    images: [
      "https://www.autoo.com.br/fotos/2022/11/960_720/fiat_pulse_2023_1_17112022_72593_960_720.jpg",
      "https://www.autoo.com.br/fotos/2022/11/960_720/fiat_pulse_2023_1_17112022_72594_960_720.jpg",
      "https://www.autoo.com.br/fotos/2022/11/960_720/fiat_pulse_2023_1_17112022_72595_960_720.jpg"
    ], badge: "Novo"
  }
];

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

/* ---------- Carregamento do Firebase (com timeout de 5s) ---------- */
function _withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise(function (_, reject) {
      setTimeout(function () { reject(new Error('Timeout: Firebase demorou mais de ' + ms + 'ms')); }, ms);
    })
  ]);
}

const dataReady = (async function loadFromFirebase() {
  try {
    if (typeof firebase === 'undefined' || !firebase.initializeApp) {
      console.warn('Firebase SDK não disponível, usando dados locais.');
      return;
    }

    firebase.initializeApp(firebaseConfig);
    const firestore = firebase.firestore();

    const [infoSnap, veiculosSnap] = await _withTimeout(
      Promise.all([
        firestore.doc('restaurants/' + GARAGEM_SLUG + '/data/businessInfo').get(),
        firestore.doc('restaurants/' + GARAGEM_SLUG + '/data/veiculos').get()
      ]),
      5000
    );

    if (infoSnap.exists && infoSnap.data().content) {
      businessInfo = Object.assign({}, businessInfo, infoSnap.data().content);
    }

    if (veiculosSnap.exists && veiculosSnap.data().content) {
      var cars = veiculosSnap.data().content.map(function (car, i) {
        return Object.assign({}, car, {
          id: car.id || i + 1,
          images: (car.images || []).map(function (img) {
            return typeof img === 'string' ? img : img.url;
          }).filter(Boolean)
        });
      });
      if (cars.length > 0) {
        featuredCars = cars;
      }
    }

    console.log('Firebase OK:', featuredCars.length, 'veículos carregados');
  } catch (err) {
    console.warn('Firebase falhou, usando dados locais:', err.message);
  }
})();
