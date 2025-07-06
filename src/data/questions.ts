import { Question } from '../types/game';

export const waterAndEnergyQuestions: (Question & { explanation: string })[] = [
  {
    id: '101',
    question: 'Qual porcentagem da superfície da Terra é coberta por água?',
    options: ['50%', '71%', '85%', '60%'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'conservation',
    explanation: 'A superfície da Terra é 71% água, e 29% são continentes e ilhas.'
  },
  {
    id: '102',
    question: 'Quanto tempo podemos sobreviver sem água em comparação com a comida?',
    options: ['Várias semanas sem água', 'Apenas um dia sem água', 'Alguns dias sem água', 'Meses sem água'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'A água é essencial e a sobrevivência sem ela é muito mais curta.'
  },
  {
    id: '103',
    question: 'Cite uma forma de consumo direto de água.',
    options: ['Banho', 'Irrigação', 'Ingestão', 'Lavagem de roupas'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'conservation',
    explanation: 'O consumo direto envolve o uso da água para necessidades imediatas, como beber.'
  },
  {
    id: '104',
    question: 'Dê um exemplo de consumo indireto de água.',
    options: ['Lavar o carro', 'Escovar os dentes', 'Produção de alimentos', 'Beber água'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'conservation',
    explanation: 'O consumo indireto refere-se à água utilizada nos processos de produção de bens.'
  },
  {
    id: '105',
    question: 'Qual a porcentagem da água doce acessível nas reservas totais de água do planeta?',
    options: ['10%', '1%', '0,014%', '5%'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'conservation',
    explanation: 'Apesar da aparente abundância, apenas uma pequena fração da água está disponível como água doce acessível.'
  },
    {
    id: '106',
    question: 'Como é reciclada e purificada a água doce no planeta?',
    options: ['Por máquinas de tratamento', 'Por evaporação natural', 'Pelo Ciclo Hidrológico', 'Por rios subterrâneos'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'O Ciclo Hidrológico é um sistema natural de purificação e reciclagem da água.'
  },
  {
    id: '107',
    question: 'Qual a porcentagem de água doce nas calotas polares e geleiras?',
    options: ['5%', '1.984%', '10%', '50%'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'conservation',
    explanation: 'Grande parte da água doce está congelada.'
  },
  {
    id: '108',
    question: 'Quais são as duas condições para que o sistema de purificação e reciclagem da água funcione bem?',
    options: [
      'Alta temperatura e pouca chuva',
      'Poluição e retirada intensa de água',
      'Não haver sobrecarga com resíduos não degradáveis e a retirada de água não superar a reposição',
      'Uso industrial constante e irrigação eficiente'
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'conservation',
    explanation: 'O equilíbrio do sistema depende da não sobrecarga com poluentes e da gestão sustentável.'
  },
  {
    id: '109',
    question: 'O que é Água Superficial?',
    options: [
      'Água no subsolo',
      'Água que flui da terra para rios, córregos e lagos',
      'Água em forma de vapor',
      'Água que cai da chuva'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'É a água visível na superfície da Terra que não evapora ou penetra no solo.'
  },
  {
    id: '110',
    question: 'Onde é armazenada a Água Subterrânea?',
    options: [
      'Em rios profundos',
      'Na atmosfera',
      'Em espaços, poros, fendas e frestas do solo e de rochas',
      'Nos lagos'
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'A água subterrânea se infiltra no solo e é armazenada abaixo da superfície.'
  },
    {
    id: '111',
    question: 'O que é o Lençol Freático?',
    options: [
      'Um rio subterrâneo',
      'A parte superior da Zona de Saturação, onde o solo e as rochas estão saturados de água',
      'Um reservatório artificial',
      'Um tipo de aquífero profundo'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'O nível do lençol freático varia com o clima.'
  },
  {
    id: '112',
    question: 'O que são Aquíferos?',
    options: [
      'Camadas de gelo com água',
      'Rios subterrâneos que correm para os oceanos',
      'Camadas geológicas de areia, cascalho ou rochas porosas saturadas de água',
      'Águas que evaporam das nuvens'
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'Aquíferos são grandes reservatórios subterrâneos de água.'
  },
  {
    id: '113',
    question: 'Como ocorre a recarga ou abastecimento de aquíferos?',
    options: [
      'Com o uso de bombas hidráulicas',
      'Por infiltração da precipitação através do solo e rochas',
      'Por evaporação dos lagos',
      'Com o derretimento das geleiras'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'A água da chuva é fundamental para reabastecer os aquíferos.'
  },
  {
    id: '114',
    question: 'Qual a principal porcentagem do uso mundial de água doce?',
    options: ['10% para consumo humano', '70% para agricultura', '30% para indústria', '5% para recreação'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'conservation',
    explanation: 'A agricultura é a maior consumidora de água doce globalmente.'
  },
  {
    id: '115',
    question: 'Quanto de água é necessário para produzir 1Kg de carne de boi?',
    options: ['5.000 litros', '10.000 litros', '15.400 litros', '8.000 litros'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'conservation',
    explanation: 'A produção de carne de boi demanda uma quantidade muito alta de água.'
  },
    {
    id: '116',
    question: 'Cite um fator que causa escassez de água.',
    options: ['Poluição sonora', 'Clima seco', 'Baixa pressão atmosférica', 'Evaporação de rios'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'conservation',
    explanation: 'Períodos de pouca chuva contribuem para a escassez de água.'
  },
  {
    id: '117',
    question: 'Mencione uma forma de aumentar as reservas de água doce.',
    options: ['Perfuração de poços em áreas urbanas', 'Construir represas e reservatórios', 'Aumentar o uso agrícola', 'Reduzir o consumo doméstico'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'A criação de infraestrutura como represas pode ajudar a armazenar água.'
  },
  {
    id: '118',
    question: 'O que é dessalinização?',
    options: [
      'Filtrar água de poços',
      'Transformar água doce em salgada',
      'Transformar água salgada em água doce',
      'Remover bactérias da água potável'
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'A dessalinização é uma tecnologia para obter água potável de fontes salgadas.'
  },
  {
    id: '119',
    question: 'Qual desastre ambiental é citado como exemplo do desvio de água para irrigação de algodão e arroz?',
    options: ['Desastre do Chernobyl', 'Derretimento da Antártida', 'Desastre do Mar de Aral', 'Inundações no Brasil'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'conservation',
    explanation: 'O Mar de Aral encolheu drasticamente devido ao desvio de seus rios afluentes.'
  },
  {
    id: '120',
    question: 'Quais são as duas causas da poluição visível da água?',
    options: [
      'Radiação e metais pesados',
      'Microplásticos e fertilizantes',
      'Curto e longo prazo',
      'Vazamentos industriais e chuva ácida'
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'A poluição pode ter efeitos imediatos ou cumulativos ao longo do tempo.'
  },
  {
    id: '121',
    question: 'O que é energia renovável?',
    options: [
      'Energia gerada a partir de combustíveis fósseis',
      'Energia que pode ser reabastecida naturalmente',
      'Energia nuclear',
      'Energia gerada por usinas hidrelétricas'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'energy',
    explanation: 'Fontes renováveis incluem solar, eólica, hidroelétrica, biomassa e geotérmica.'
  },
  {
    id: '122',
    question: 'Qual é a principal fonte de energia renovável no mundo?',
    options: ['Solar', 'Eólica', 'Hidroelétrica', 'Geotérmica'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'energy',
    explanation: 'A energia hidrelétrica é a mais utilizada globalmente.'
  },
  {
    id: '123',
    question: 'Qual é a principal vantagem da energia solar?',
    options: ['É barata', 'É abundante e limpa', 'É fácil de armazenar', 'Não depende do clima'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'energy',
    explanation: 'A energia solar é abundante e não poluente.'
  },
  {
    id: '124',
    question: 'Qual é o maior desafio da energia eólica?',
    options: ['Produção constante', 'Armazenamento eficiente', 'Custo inicial alto', 'Poluição sonora'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'energy',
    explanation: 'A produção de energia eólica depende da intensidade do vento.'
  },
  {
    id: '125',
    question: 'O que é biomassa?',
    options: [
      'Energia gerada por usinas nucleares',
      'Matéria orgânica usada como fonte de energia',
      'Combustíveis fósseis como petróleo e gás natural',
      'Energia solar convertida em eletricidade'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'energy',
    explanation: 'Biomassa inclui madeira, resíduos agrícolas e outros materiais orgânicos.'
  },
    {
    id: '126',
    question: 'Qual é a principal fonte poluidora de água?',
    options: ['Atividades agrícolas', 'Águas residuais domésticas', 'Mineração', 'Indústrias químicas'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'conservation',
    explanation: 'Sedimentos, fertilizantes e pesticidas advindos da agricultura são os maiores poluentes.'
  },
  {
    id: '127',
    question: 'Cite um herbicida mencionado como poluente invisível e solúvel.',
    options: ['Atrazina', 'Ácido sulfúrico', 'Sódio', 'Cloro'],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'conservation',
    explanation: 'A atrazina (ou glifosato) é altamente solúvel e contamina a água.'
  },
  {
    id: '128',
    question: 'Quantos litros de água são necessários para produzir uma calça jeans?',
    options: ['5.000 litros', '8.000 litros', '10.000 litros', '15.000 litros'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'conservation',
    explanation: 'A indústria do vestuário tem uma alta pegada hídrica.'
  },
  {
    id: '129',
    question: 'Qual tecnologia é utilizada na agricultura para análise detalhada de plantações e auxiliar na irrigação?',
    options: ['Satélites e GPS', 'Tratores automatizados', 'Drones e sensores', 'Sensores de radiação'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'Drones e sensores otimizam o uso da água e insumos.'
  },
  {
    id: '130',
    question: 'O que são efluentes?',
    options: [
      'Vapores de fábricas',
      'Resíduos líquidos que podem ser um problema ou uma solução (se tratados)',
      'Águas pluviais',
      'Água utilizada em irrigação'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'conservation',
    explanation: 'Efluentes são descartes líquidos que requerem tratamento.'
  }
];
