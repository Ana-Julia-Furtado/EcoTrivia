import { Question, QuestionCategory } from '../types/game';

export const questionCategories: Record<QuestionCategory, { name: string; icon: string; color: string }> = {
  'reciclagem': { name: 'Reciclagem', icon: '♻️', color: 'bg-primary-500' },
  'biodiversidade': { name: 'Biodiversidade', icon: '🌿', color: 'bg-primary-600' },
  'energia': { name: 'Energia', icon: '⚡', color: 'bg-earth-500' },
  'mudancas_climaticas': { name: 'Mudanças Climáticas', icon: '🌡️', color: 'bg-red-500' }, 
  'consumo': { name: 'Consumo', icon: '🛒', color: 'bg-secondary-500' },
  'poluicao': { name: 'Poluição', icon: '🏭', color: 'bg-gray-600' }, 
  'conservacao': { name: 'Conservação', icon: '🌍', color: 'bg-primary-700' }, 
  'sustentabilidade': { name: 'Sustentabilidade', icon: '🌱', color: 'bg-green-500' },
  'ecossistemas': { name: 'Ecossistemas', icon: '🌳', color: 'bg-teal-500' },
  'residuos': { name: 'Resíduos', icon: '🗑️', color: 'bg-yellow-600' }, 
  'recursos_hidricos': { name: 'Recursos Hídricos', icon: '💧', color: 'bg-blue-500' }, 
  'politica_ambiental': { name: 'Política Ambiental', icon: '🏛️', color: 'bg-purple-500' }, 
  'oceanos': { name: 'Oceanos', icon: '🌊', color: 'bg-indigo-500' },
  'solo': { name: 'Solo', icon: '🏜️', color: 'bg-amber-700' },
  'urbanizacao': { name: 'Urbanização', icon: '🏙️', color: 'bg-gray-500' },
  'conscientizacao': { name: 'Conscientização', icon: '📣', color: 'bg-pink-500' },
  'poluicao_da_agua': { name: 'Poluição da Água', icon: '🤢', color: 'bg-sky-700' },
  'alimentacao_sustentavel': { name: 'Alimentação Sustentável', icon: '🍎', color: 'bg-lime-600' },
  'atmosfera': { name: 'Atmosfera', icon: '🌬️', color: 'bg-cyan-500' },
  'poluicao_plastica': { name: 'Poluição Plástica', icon: '🦑', color: 'bg-fuchsia-700' },
  'poluicao_do_ar': { name: 'Poluição do Ar', icon: '💨', color: 'bg-slate-700' },
  'energias_renovaveis': { name: 'Energias Renováveis', icon: '☀️', color: 'bg-orange-500' },
};

export const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'Qual gás é o principal contribuinte para o efeito estufa e o aquecimento global?',
    options: ['Oxigênio', 'Dióxido de Carbono', 'Nitrogênio', 'Metano'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'mudancas_climaticas',
    explanation: 'O dióxido de carbono (CO2) é o principal gás de efeito estufa emitido pelas atividades humanas, como a queima de combustíveis fósseis.',
    points: 100
  },
  {
    id: '2',
    question: 'Qual é o termo para a perda de florestas, geralmente para agricultura ou urbanização?',
    options: ['Reflorestamento', 'Desertificação', 'Desmatamento', 'Urbanização'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'biodiversidade',
    explanation: 'Desmatamento é o processo de remoção de florestas ou matas nativas para outros usos, causando perda de biodiversidade e contribuição para o aquecimento global.',
    points: 100
  },
  {
    id: '3',
    question: 'Que tipo de energia é gerada a partir do movimento da água?',
    options: ['Energia Solar', 'Energia Eólica', 'Energia Hidrelétrica', 'Energia Geotérmica'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'energias_renovaveis', 
    explanation: 'A energia hidrelétrica utiliza a força da água em movimento, como rios ou quedas d\'água, para gerar eletricidade.',
    points: 100
  },
  {
    id: '4',
    question: 'Qual poluente do ar é conhecido por causar chuva ácida?',
    options: ['Ozônio', 'Dióxido de Enxofre', 'Monóxido de Carbono', 'Material Particulado'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'poluicao_do_ar', 
    explanation: 'O dióxido de enxofre e os óxidos de nitrogênio são os principais gases responsáveis pela chuva ácida.',
    points: 200
  },
  {
    id: '5',
    question: 'O que significa a sigla "ODS" no contexto ambiental?',
    options: ['Organizações de Desenvolvimento Sustentável', 'Objetivos de Desenvolvimento Sustentável', 'Obras de Despoluição Sustentável', 'Ordem de Descarte Sustentável'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'sustentabilidade', 
    explanation: 'ODS refere-se aos 17 Objetivos de Desenvolvimento Sustentável estabelecidos pela ONU para alcançar um futuro mais sustentável para todos.',
    points: 200
  },
  {
    id: '6',
    question: 'Qual é o nome do processo pelo qual as plantas convertem a luz solar em energia?',
    options: ['Respiração', 'Transpiração', 'Fotossíntese', 'Fermentação'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'ecossistemas', 
    explanation: 'A fotossíntese é o processo fundamental pelo qual as plantas produzem seu próprio alimento e liberam oxigênio.',
    points: 100
  },
  {
    id: '7',
    question: 'Que tipo de resíduo pode levar centenas de anos para se decompor em aterros sanitários?',
    options: ['Restos de comida', 'Papel', 'Plástico', 'Madeira'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'residuos', 
    explanation: 'O plástico é notoriamente resistente à decomposição, podendo levar dezenas a centenas de anos para se degradar completamente.',
    points: 100
  },
  {
    id: '8',
    question: 'Qual fenômeno natural é intensificado pelo aquecimento global, levando a eventos climáticos extremos?',
    options: ['El Niño', 'La Niña', 'Efeito Estufa', 'Derretimento das calotas polares'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'mudancas_climaticas', 
    explanation: 'O aquecimento global intensifica o efeito estufa natural, resultando em um aumento da temperatura média do planeta e eventos climáticos extremos.',
    points: 200
  },
  {
    id: '9',
    question: 'Qual é a principal causa da perda de biodiversidade no planeta?',
    options: ['Poluição do ar', 'Desmatamento e perda de habitat', 'Chuva ácida', 'Buraco na camada de ozônio'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'biodiversidade',
    explanation: 'A destruição e fragmentação de habitats naturais, principalmente devido ao desmatamento, são as maiores ameaças à biodiversidade.',
    points: 200
  },
  {
    id: '10',
    question: 'Que termo descreve a capacidade de um sistema de se manter ao longo do tempo sem esgotar seus recursos?',
    options: ['Eficiência', 'Sustentabilidade', 'Reciclagem', 'Conservação'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'sustentabilidade', 
    explanation: 'Sustentabilidade é a capacidade de atender às necessidades do presente sem comprometer a capacidade das futuras gerações de atenderem às suas próprias necessidades.',
    points: 100
  },
  {
    id: '11',
    question: 'Qual é a principal função da camada de ozônio?',
    options: ['Refletir o calor do sol', 'Proteger a Terra da radiação ultravioleta', 'Regular a temperatura global', 'Produzir oxigênio'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'atmosfera', 
    explanation: 'A camada de ozônio absorve a maior parte da radiação ultravioleta (UV) prejudicial do sol, protegendo a vida na Terra.',
    points: 200
  },
  {
    id: '12',
    question: 'Qual das seguintes opções é uma fonte de energia renovável?',
    options: ['Carvão', 'Gás natural', 'Energia solar', 'Petróleo'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'energias_renovaveis', 
    explanation: 'A energia solar é uma fonte de energia renovável, pois é derivada do sol e é inesgotável.',
    points: 100
  },
  {
    id: '13',
    question: 'Qual é o processo de transformar resíduos em novos materiais e objetos?',
    options: ['Compostagem', 'Incineracão', 'Aterro sanitário', 'Reciclagem'],
    correctAnswer: 3,
    difficulty: 'easy',
    category: 'residuos', 
    explanation: 'Reciclagem é o processo de coleta e processamento de materiais que seriam descartados como lixo e transformá-los em novos produtos.',
    points: 100
  },
  {
    id: '14',
    question: 'Que termo se refere à escassez de água potável em uma região?',
    options: ['Inundação', 'Seca', 'Desertificação', 'Crise hídrica'],
    correctAnswer: 3,
    difficulty: 'medium',
    category: 'recursos_hidricos',
    explanation: 'Crise hídrica descreve a situação de falta de água suficiente para atender às necessidades básicas de uma população.',
    points: 200
  },
  {
    id: '15',
    question: 'Qual é o nome do tratado internacional que visa reduzir as emissões de gases de efeito estufa?',
    options: ['Protocolo de Kyoto', 'Acordo de Paris', 'Protocolo de Montreal', 'Agenda 21'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'politica_ambiental', 
    explanation: 'O Acordo de Paris é um tratado internacional juridicamente vinculativo sobre as mudanças climáticas, adotado em 2015.',
    points: 300
  },
  {
    id: '16',
    question: 'O que é "pegada de carbono"?',
    options: ['A quantidade de carbono no solo', 'O impacto da poluição do ar na saúde', 'A quantidade total de gases de efeito estufa emitidos por uma entidade', 'O tamanho de uma floresta'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'mudancas_climaticas', 
    explanation: 'A pegada de carbono mede a quantidade total de gases de efeito estufa liberados direta ou indiretamente pelas atividades de uma pessoa, organização, evento ou produto.',
    points: 200
  },
  {
    id: '17',
    question: 'Qual é a maior ameaça aos recifes de coral no mundo?',
    options: ['Pesca excessiva', 'Poluição plástica', 'Acidificação dos oceanos e aumento da temperatura', 'Tsunami'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'oceanos', 
    explanation: 'A acidificação dos oceanos, causada pela absorção de CO2, e o aumento da temperatura da água levam ao branqueamento e morte dos corais.',
    points: 300
  },
  {
    id: '18',
    question: 'O que são "zonas mortas" nos oceanos?',
    options: ['Áreas com muita vida marinha', 'Áreas com baixa concentração de oxigênio que não sustentam a vida marinha', 'Áreas com alta concentração de sal', 'Áreas com correntes marítimas fortes'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'oceanos', 
    explanation: 'Zonas mortas são áreas dos oceanos onde os níveis de oxigênio são tão baixos que a maioria da vida marinha não consegue sobreviver, geralmente devido ao escoamento de nutrientes.',
    points: 300
  },
  {
    id: '19',
    question: 'Qual das seguintes é uma estratégia para mitigar o desmatamento?',
    options: ['Aumentar o consumo de carne', 'Promover a agricultura de monocultura', 'Incentivar o reflorestamento e o manejo florestal sustentável', 'Construir mais estradas em áreas florestais'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'biodiversidade',
    explanation: 'Reflorestamento e manejo florestal sustentável são cruciais para restaurar florestas e garantir sua preservação a longo prazo.',
    points: 200
  },
  {
    id: '20',
    question: 'O que é compostagem?',
    options: ['Queimar lixo para gerar energia', 'Enterrar lixo em aterros sanitários', 'Processo de decomposição de matéria orgânica para criar adubo', 'Descartar lixo no oceano'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'residuos', 
    explanation: 'Compostagem é a decomposição de materiais orgânicos, como restos de alimentos e folhas, para produzir adubo rico em nutrientes para o solo.',
    points: 100
  },
  {
    id: '21',
    question: 'Qual é a principal causa da desertificação?',
    options: ['Chuvas intensas', 'Aumento da umidade do ar', 'Atividades humanas como desmatamento e uso inadequado do solo', 'Vulcões'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'solo', 
    explanation: 'A desertificação é causada principalmente por atividades humanas que degradam o solo e a vegetação, como o desmatamento, a agricultura insustentável e o pastoreio excessivo.',
    points: 200
  },
  {
    id: '22',
    question: 'Qual é o nome do ciclo natural que descreve o movimento da água na Terra?',
    options: ['Ciclo do Carbono', 'Ciclo do Nitrogênio', 'Ciclo da Água (ou Hidrológico)', 'Ciclo do Oxigênio'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'ecossistemas', 
    explanation: 'O ciclo da água envolve a evaporação, condensação, precipitação e escoamento, garantindo a disponibilidade de água no planeta.',
    points: 100
  },
  {
    id: '23',
    question: 'O que é a "biomassa" como fonte de energia?',
    options: ['Energia gerada a partir do calor da Terra', 'Energia gerada a partir da matéria orgânica', 'Energia gerada a partir do vento', 'Energia gerada a partir da luz solar'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'energias_renovaveis', 
    explanation: 'Biomassa é a matéria orgânica de origem vegetal ou animal usada para produzir energia, como lenha, bagaço de cana ou biogás.',
    points: 200
  },
  {
    id: '24',
    question: 'Qual é o nome do processo de remoção de sal da água do mar para torná-la potável?',
    options: ['Filtração', 'Dessalinização', 'Purificação', 'Cloração'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'recursos_hidricos', 
    explanation: 'A dessalinização é um processo que remove o sal e outros minerais da água salgada para produzir água doce, mas é um processo caro e energeticamente intensivo.',
    points: 300
  },
  {
    id: '25',
    question: 'Qual das seguintes substâncias é um poluente orgânico persistente (POP)?',
    options: ['Água', 'DDT', 'Sal', 'Oxigênio'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'poluicao', 
    explanation: 'O DDT (diclorodifeniltricloroetano) é um exemplo de Poluente Orgânico Persistente, que se acumula no meio ambiente e na cadeia alimentar.',
    points: 300
  },
  {
    id: '26',
    question: 'O que é a "capacidade de carga" de um ecossistema?',
    options: ['A quantidade de água que um ecossistema pode conter', 'O número máximo de indivíduos de uma espécie que um ecossistema pode sustentar', 'A velocidade com que um ecossistema se recupera de um desastre', 'A quantidade de nutrientes em um ecossistema'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'ecossistemas', 
    explanation: 'A capacidade de carga refere-se ao número máximo de indivíduos de uma determinada espécie que um ambiente pode suportar indefinidamente, dada a disponibilidade de recursos.',
    points: 300
  },
  {
    id: '27',
    question: 'Qual das seguintes é uma consequência do aumento do nível do mar?',
    options: ['Aumento da área de terra arável', 'Submergência de áreas costeiras baixas', 'Diminuição da salinidade dos oceanos', 'Redução da frequência de tempestades'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'mudancas_climaticas', 
    explanation: 'O aumento do nível do mar, causado pelo derretimento das geleiras e expansão térmica da água, ameaça submeter áreas costeiras e ilhas.',
    points: 200
  },
  {
    id: '28',
    question: 'O que é o "efeito ilha de calor urbana"?',
    options: ['Um fenômeno de resfriamento em cidades', 'Cidades que têm muitos parques e áreas verdes', 'Temperaturas mais altas em áreas urbanas em comparação com as áreas rurais circundantes', 'Cidades localizadas em ilhas'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'urbanizacao', 
    explanation: 'O efeito ilha de calor urbana é um fenômeno onde as cidades são significativamente mais quentes que as áreas rurais vizinhas, devido à absorção de calor por materiais urbanos e falta de vegetação.',
    points: 200
  },
  {
    id: '29',
    question: 'Qual o papel das abelhas no meio ambiente?',
    options: ['Decompor matéria orgânica', 'Controlar pragas', 'Polinizar plantas', 'Purificar o ar'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'biodiversidade',
    explanation: 'As abelhas são polinizadores cruciais para a reprodução de muitas plantas, incluindo culturas agrícolas essenciais para a alimentação humana.',
    points: 100
  },
  {
    id: '30',
    question: 'Qual é o nome do movimento ambiental global que acontece anualmente, incentivando o desligamento de luzes por uma hora?',
    options: ['Dia da Terra', 'Hora do Planeta', 'Dia Mundial do Meio Ambiente', 'Semana Verde'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'conscientizacao', 
    explanation: 'A Hora do Planeta é um evento global organizado pela WWF, incentivando indivíduos, empresas e governos a desligarem as luzes por uma hora para conscientização sobre as mudanças climáticas.',
    points: 100
  },
  {
    id: '31',
    question: 'Qual é a principal função dos manguezais?',
    options: ['Produzir oxigênio para o planeta', 'Servir como berçário para diversas espécies marinhas e proteger a costa', 'Serem áreas de descarte de resíduos', 'Atrair turistas para a região costeira'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'ecossistemas', 
    explanation: 'Manguezais são ecossistemas costeiros vitais que servem como berçários para a vida marinha, protegem a costa da erosão e atuam como filtros naturais de poluentes.',
    points: 200
  },
  {
    id: '32',
    question: 'O que é "eutrofização" em corpos d\'água?',
    options: ['Aumento da biodiversidade aquática', 'Enriquecimento excessivo de nutrientes, levando ao crescimento de algas e depleção de oxigênio', 'Diminuição da temperatura da água', 'Aumento da clareza da água'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'poluicao_da_agua', 
    explanation: 'A eutrofização é o acúmulo excessivo de nutrientes, geralmente de esgoto e fertilizantes, em corpos d\'água, resultando em proliferação de algas e redução do oxigênio, prejudicando a vida aquática.',
    points: 300
  },
  {
    id: '33',
    question: 'Qual é o objetivo principal da economia circular?',
    options: ['Incentivar o consumo ilimitado de recursos', 'Criar um modelo de produção e consumo de "usar e descartar"', 'Minimizar o desperdício e maximizar o uso de recursos, mantendo-os em uso pelo maior tempo possível', 'Aumentar a extração de matérias-primas'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'sustentabilidade', 
    explanation: 'A economia circular busca reduzir o desperdício e a poluição, mantendo produtos e materiais em uso e regenerando sistemas naturais.',
    points: 200
  },
  {
    id: '34',
    question: 'Que tipo de poluição sonora é causada por aeronaves e veículos?',
    options: ['Poluição luminosa', 'Poluição térmica', 'Poluição atmosférica', 'Poluição acústica'],
    correctAnswer: 3,
    difficulty: 'easy',
    category: 'poluicao', 
    explanation: 'A poluição acústica, ou sonora, é o excesso de ruído que pode causar danos à saúde humana e animal.',
    points: 100
  },
  {
    id: '35',
    question: 'Qual é a principal fonte de energia para a Terra?',
    options: ['O interior da Terra', 'O sol', 'A lua', 'Os oceanos'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'energias_renovaveis', 
    explanation: 'O sol é a fonte primária de energia para a Terra, impulsionando a maioria dos processos biológicos e climáticos.',
    points: 100
  },
  {
    id: '36',
    question: 'O que é um "corredor ecológico"?',
    options: ['Uma estrada construída em uma floresta', 'Uma área de desmatamento intensivo', 'Uma faixa de vegetação que conecta fragmentos de habitat, permitindo o movimento de espécies', 'Um túnel para animais sob uma rodovia'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'biodiversidade',
    explanation: 'Corredores ecológicos são importantes para a conservação da biodiversidade, pois permitem que as espécies se movam entre habitats fragmentados, mantendo a variabilidade genética e a saúde das populações.',
    points: 300
  },
  {
    id: '37',
    question: 'Qual é o principal componente do "gás natural"?',
    options: ['Dióxido de carbono', 'Metano', 'Propano', 'Butano'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'energia',
    explanation: 'O metano (CH4) é o principal componente do gás natural, um combustível fóssil que também é um potente gás de efeito estufa.',
    points: 200
  },
  {
    id: '38',
    question: 'O que é um "aterro sanitário"?',
    options: ['Um local para reciclagem de lixo', 'Um local para compostagem de resíduos orgânicos', 'Um local projetado para o descarte seguro de resíduos sólidos', 'Um incinerador de lixo'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'residuos', 
    explanation: 'Aterros sanitários são instalações projetadas para descartar resíduos de forma segura, com sistemas para controle de gases e efluentes.',
    points: 100
  },
  {
    id: '39',
    question: 'Qual é a principal causa da destruição da camada de ozônio?',
    options: ['Dióxido de carbono', 'Clorofluorcarbonetos (CFCs)', 'Metano', 'Ozônio troposférico'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'atmosfera', 
    explanation: 'Os clorofluorcarbonetos (CFCs), substâncias químicas usadas em aerossóis e refrigeração, foram os principais responsáveis pela destruição da camada de ozônio.',
    points: 200
  },
  {
    id: '40',
    question: 'O que é "agricultura orgânica"?',
    options: ['Agricultura que utiliza muitos pesticidas e fertilizantes químicos', 'Agricultura que não utiliza pesticidas e fertilizantes químicos sintéticos, focando na saúde do solo', 'Agricultura que usa organismos geneticamente modificados', 'Agricultura em larga escala para exportação'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'alimentacao_sustentavel', 
    explanation: 'A agricultura orgânica busca produzir alimentos de forma sustentável, sem o uso de produtos químicos sintéticos, priorizando a saúde do solo e do meio ambiente.',
    points: 200
  },
  {
    id: '41',
    question: 'Qual o nome do fenômeno natural que leva ao aquecimento da atmosfera terrestre devido à presença de gases?',
    options: ['Era do Gelo', 'Efeito Estufa', 'Desertificação', 'El Niño'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'mudancas_climaticas', 
    explanation: 'O efeito estufa é um processo natural que retém parte do calor do sol na atmosfera, tornando a Terra habitável, mas que se intensificou com as emissões humanas.',
    points: 100
  },
  {
    id: '42',
    question: 'O que significa "biodegradável"?',
    options: ['Material que não se decompõe', 'Material que se decompõe rapidamente por ação de microrganismos', 'Material que é tóxico para o meio ambiente', 'Material que pode ser reciclado infinitamente'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'residuos', 
    explanation: 'Um material biodegradável pode ser decomposto por bactérias e outros organismos vivos em substâncias naturais e inofensivas ao meio ambiente.',
    points: 100
  },
  {
    id: '43',
    question: 'Qual é a fonte de energia renovável mais utilizada no Brasil?',
    options: ['Energia solar', 'Energia eólica', 'Biomassa', 'Energia hidrelétrica'],
    correctAnswer: 3,
    difficulty: 'medium',
    category: 'energias_renovaveis', 
    explanation: 'A energia hidrelétrica é a principal fonte de eletricidade no Brasil, aproveitando o grande potencial hídrico do país.',
    points: 200
  },
  {
    id: '44',
    question: 'O que é "água cinza"?',
    options: ['Água suja do esgoto doméstico e industrial', 'Água da chuva coletada', 'Água de lavagem, como chuveiro e pia, que pode ser reutilizada para fins não potáveis', 'Água do mar'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'recursos_hidricos', 
    explanation: 'Água cinza é a água residual de atividades domésticas, excluindo a água do vaso sanitário, que pode ser tratada e reutilizada para irrigação ou descarga de vasos sanitários.',
    points: 300
  },
  {
    id: '45',
    question: 'Que animal é frequentemente usado como símbolo da luta contra o aquecimento global, devido ao derretimento de seu habitat?',
    options: ['Panda', 'Elefante', 'Urso polar', 'Leão'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'biodiversidade',
    explanation: 'O urso polar é um ícone da crise climática, pois seu habitat, o gelo marinho do Ártico, está desaparecendo devido ao aquecimento global.',
    points: 100
  },
  {
    id: '46',
    question: 'Qual é a principal causa da acidificação dos oceanos?',
    options: ['Poluição plástica', 'Derramamento de petróleo', 'Absorção de dióxido de carbono da atmosfera', 'Pesca excessiva'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'oceanos', 
    explanation: 'A acidificação dos oceanos ocorre quando o oceano absorve o excesso de dióxido de carbono da atmosfera, alterando seu pH e impactando a vida marinha.',
    points: 300
  },
  {
    id: '47',
    question: 'O que é a "Agenda 21"?',
    options: ['Um plano de 21 pontos para o desenvolvimento econômico', 'Um documento da ONU para o desenvolvimento sustentável no século XXI', 'Um programa de reciclagem para 21 tipos de materiais', 'Uma lista de 21 espécies ameaçadas de extinção'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'politica_ambiental', 
    explanation: 'A Agenda 21 é um plano de ação global para o desenvolvimento sustentável do século XXI, resultado da Conferência Rio 92.',
    points: 300
  },
  {
    id: '48',
    question: 'Que termo descreve a variedade de vida na Terra, incluindo plantas, animais, fungos e microrganismos?',
    options: ['Ecologia', 'Biodiversidade', 'Botânica', 'Zoologia'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'biodiversidade',
    explanation: 'Biodiversidade refere-se à riqueza e variedade de vida em todos os seus níveis, desde genes até ecossistemas.',
    points: 100
  },
  {
    id: '49',
    question: 'Qual das seguintes é uma característica da energia eólica?',
    options: ['Emite muitos gases de efeito estufa', 'Depende do vento e é intermitente', 'É uma fonte de energia não renovável', 'Gera muita poluição sonora'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'energias_renovaveis', 
    explanation: 'A energia eólica é limpa e renovável, mas sua geração depende da disponibilidade do vento, o que a torna intermitente.',
    points: 200
  },
  {
    id: '50',
    question: 'O que são "microplásticos"?',
    options: ['Plásticos gigantes encontrados no oceano', 'Pequenos fragmentos de plástico menores que 5 mm', 'Plásticos que se decompõem rapidamente', 'Plásticos usados na microeletrônica'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'poluicao_plastica', 
    explanation: 'Microplásticos são minúsculos pedaços de plástico que representam uma crescente preocupação ambiental, pois são ingeridos por animais e entram na cadeia alimentar.',
    points: 200
  }
];
