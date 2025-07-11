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
  },
  {
    id: '51',
    question: 'Qual é uma das principais causas da expansão urbana desordenada?',
    options: ['Aumento da tecnologia nas zonas rurais', 'Declínio da oferta de trabalho na agricultura', 'Aumento de florestas urbanas', 'Proibição do transporte público'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'urbanizacao',
    explanation: 'A migração para áreas urbanas é impulsionada por fatores como a pobreza nas zonas rurais e a diminuição de empregos agrícolas.',
    points: 100
  },
  {
    id: '52',
    question: 'O que representa a pegada ecológica?',
    options: ['Quantidade de energia elétrica consumida por pessoa', 'Número de automóveis em uma cidade', 'Medição do uso de recursos naturais por pessoa', 'Índice de qualidade da água'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'sustentabilidade',
    explanation: 'A pegada ecológica mede a quantidade de recursos naturais usados para sustentar um estilo de vida.',
    points: 200
  },
  {
    id: '53',
    question: 'Qual categoria de transporte urbano é mais eficiente em termos energéticos?',
    options: ['Automóveis particulares', 'Motocicletas', 'Trens de transporte coletivo', 'Aviões'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'urbanizacao',
    explanation: 'Trens consomem menos energia, ocupam menos espaço urbano e reduzem congestionamentos e poluição.',
    points: 100
  },
  {
    id: '54',
    question: 'Qual é uma das consequências sociais negativas da urbanização desordenada?',
    options: ['Diminuição da população rural', 'Redução de áreas de lazer', 'Aumento do desemprego e da desigualdade', 'Melhoria na coleta seletiva'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'urbanizacao',
    explanation: 'O crescimento urbano desorganizado leva à concentração de pobreza e exclusão social em centros urbanos.',
    points: 200
  },
  {
    id: '55',
    question: 'Qual é o principal objetivo da Análise do Ciclo de Vida (ACV)?',
    options: ['Reduzir o custo de produção', 'Controlar e reduzir impactos ambientais de um produto', 'Aumentar a durabilidade dos produtos', 'Melhorar a aparência estética dos produtos'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'consumo',
    explanation: 'A ACV visa mapear e reduzir os impactos ambientais durante todas as fases da vida de um produto.',
    points: 200
  },
  {
    id: '56',
    question: 'O que caracteriza uma fonte de energia renovável?',
    options: ['Recurso que pode se regenerar em escala humana', 'Fonte que exige uso de petróleo', 'Recurso que causa grande impacto ambiental', 'Energia gerada por combustíveis fósseis'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'energias_renovaveis',
    explanation: 'Fontes renováveis se regeneram naturalmente em curto prazo, como a energia solar e eólica.',
    points: 100
  },
  {
    id: '57',
    question: 'Por que o uso de sacolas plásticas é considerado problemático para o meio ambiente?',
    options: ['Porque são biodegradáveis', 'Porque são recicláveis', 'Porque são de uso único e causam poluição', 'Porque substituem as de papel'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'poluicao_plastica',
    explanation: 'Sacolas plásticas são de uso único e geram resíduos duradouros no ambiente.',
    points: 100
  },
  {
    id: '58',
    question: 'Segundo a Lei 11.445/07, o que compõe o saneamento básico?',
    options: ['Apenas abastecimento de água e esgoto', 'Limpeza urbana e coleta de lixo', 'Água, esgoto, resíduos e drenagem urbana', 'Serviços de iluminação pública'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'sustentabilidade',
    explanation: 'O saneamento básico inclui abastecimento de água, esgotamento sanitário, limpeza urbana, manejo de resíduos e drenagem pluvial.',
    points: 200
  },
  {
    id: '59',
    question: 'Qual é o impacto da urbanização na biodiversidade?',
    options: ['Proteção da fauna silvestre', 'Fragmentação de habitats e morte de animais em estradas', 'Aumento da vegetação', 'Melhoria da qualidade do ar'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'biodiversidade',
    explanation: 'A expansão urbana desorganizada destrói habitats naturais e aumenta os riscos para a fauna.',
    points: 200
  },
  {
    id: '60',
    question: 'Qual alternativa abaixo representa um princípio da Política Nacional de Resíduos Sólidos?',
    options: ['Descarte direto em rios', 'Queima de resíduos ao ar livre', 'Responsabilidade compartilhada pelo ciclo de vida dos produtos', 'Uso exclusivo de lixões'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'politica_ambiental',
    explanation: 'A política adota o princípio da responsabilidade compartilhada para garantir que todos os envolvidos cuidem adequadamente dos resíduos.',
    points: 300
  },
  {
  id: '61',
  question: 'Qual tipo de resíduo é classificado como Classe I segundo a legislação brasileira?',
  options: ['Resíduos orgânicos', 'Resíduos recicláveis', 'Resíduos perigosos', 'Resíduos de construção civil'],
  correctAnswer: 2,
  difficulty: 'medium',
  category: 'residuos',
  explanation: 'Classe I inclui resíduos que oferecem riscos à saúde pública e ao meio ambiente, como os químicos e infectantes.',
  points: 200
  },
  {
    id: '62',
    question: 'O que são fontes pontuais de poluição da água?',
    options: ['Fontes que não podem ser rastreadas', 'Poluição causada por escoamento de chuva', 'Fontes específicas como canos de esgoto', 'Fontes subterrâneas de água contaminada'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'poluicao_da_agua',
    explanation: 'Fontes pontuais são locais identificáveis de despejo de poluentes, como dutos industriais.',
    points: 200
  },
  {
    id: '63',
    question: 'Qual material reciclável deve ser descartado na lixeira vermelha, segundo a CONAMA?',
    options: ['Vidro', 'Papel', 'Metal', 'Plástico'],
    correctAnswer: 3,
    difficulty: 'easy',
    category: 'reciclagem',
    explanation: 'A cor vermelha é usada para a coleta seletiva de plásticos, conforme a Resolução CONAMA nº 275.',
    points: 100
  },
  {
    id: '64',
    question: 'O que é o conceito "do berço ao berço" no ecodesign?',
    options: ['Produção sem resíduos', 'Produção com foco na durabilidade', 'Sistema circular onde não existe lixo', 'Produção exclusiva de materiais biodegradáveis'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'consumo',
    explanation: 'O conceito “Cradle to Cradle” foca em produtos que voltam ao ciclo produtivo, eliminando o conceito de lixo.',
    points: 200
  },
  {
    id: '65',
    question: 'O que diferencia os polímeros termofixos dos termoplásticos?',
    options: ['Podem ser reciclados após moldagem', 'São flexíveis e transparentes', 'Não podem ser remodelados após endurecimento', 'São usados apenas em embalagens'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'residuos',
    explanation: 'Termofixos não podem ser remoldados após endurecimento, ao contrário dos termoplásticos.',
    points: 200
  },
  {
    id: '66',
    question: 'Qual das ações abaixo mais contribui para a redução da pegada hídrica individual?',
    options: ['Aumentar o uso de roupas novas', 'Consumir carne diariamente', 'Consumir alimentos locais e sazonais', 'Tomar banhos mais longos'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'consumo',
    explanation: 'Alimentos locais reduzem o uso indireto de água, diminuindo a pegada hídrica.',
    points: 200
  },
  {
    id: '67',
    question: 'Qual foi o impacto do desvio de água para irrigação no Mar de Aral?',
    options: ['Aumento da biodiversidade', 'Expansão agrícola sustentável', 'Redução de 83% do volume da área superficial', 'Melhoria do clima na Ásia Central'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'recursos_hidricos',
    explanation: 'O desvio de água causou a quase extinção do Mar de Aral, um dos piores desastres ambientais do século XX.',
    points: 300
  },
  {
    id: '68',
    question: 'O que é considerado consumo indireto de água?',
    options: ['Beber água', 'Tomar banho', 'Lavar roupas', 'Produzir alimentos e roupas'],
    correctAnswer: 3,
    difficulty: 'medium',
    category: 'recursos_hidricos',
    explanation: 'O consumo indireto de água está relacionado à produção de bens como carne, roupas e eletrônicos.',
    points: 200
  },
  {
    id: '69',
    question: 'O que a Agenda 2030 propõe em relação à água?',
    options: ['Privatização dos recursos hídricos', 'Uso exclusivo de águas subterrâneas', 'Acesso universal à água potável e saneamento', 'Aumento do uso de água engarrafada'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'politica_ambiental',
    explanation: 'A Agenda 2030 defende acesso equitativo à água potável e saneamento básico como um direito humano.',
    points: 200
  },
  {
    id: '70',
    question: 'Por que a energia hidrelétrica é amplamente utilizada no Brasil?',
    options: ['Baixo rendimento energético', 'Fácil construção de barragens', 'Grande disponibilidade hídrica e alto rendimento', 'Não possui impactos ambientais'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'energias_renovaveis',
    explanation: 'O Brasil tem grandes reservas de água e a energia hidrelétrica tem rendimento alto (96%), tornando-a economicamente viável.',
    points: 200
  },
  {
    id: '71',
    question: 'Qual medida urbana ajuda a mitigar enchentes e alagamentos?',
    options: ['Construção de grandes estacionamentos', 'Remoção de áreas verdes', 'Implantação de sistemas de drenagem urbana eficientes', 'Aumento de vias asfaltadas'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'urbanizacao',
    explanation: 'A drenagem urbana adequada evita acúmulo de água das chuvas, mitigando enchentes.',
    points: 200
  },
  {
    id: '72',
    question: 'O que define um resíduo como "infectante" na classificação da saúde?',
    options: ['Material com metais pesados', 'Resíduo com risco biológico de infecção', 'Objeto perfurante', 'Produto reciclável contaminado'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'residuos',
    explanation: 'Resíduos infectantes são os que possuem agentes biológicos com potencial de causar infecção.',
    points: 200
  },
  {
    id: '73',
    question: 'Qual dos seguintes gases não é considerado gás de efeito estufa?',
    options: ['CO₂', 'CH₄', 'N₂', 'N₂O'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'atmosfera',
    explanation: 'O nitrogênio (N₂), embora seja o gás mais abundante na atmosfera, não é um gás de efeito estufa.',
    points: 100
  },
  {
    id: '74',
    question: 'Qual categoria de resíduos é composta por materiais recicláveis e não recicláveis que não apresentam riscos?',
    options: ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D'],
    correctAnswer: 3,
    difficulty: 'medium',
    category: 'residuos',
    explanation: 'Grupo D engloba resíduos comuns sem risco biológico, químico ou radiológico, como papel e plástico.',
    points: 200
  },
  {
    id: '75',
    question: 'O que representa o conceito de "não geração" na gestão de resíduos?',
    options: ['A reciclagem total dos resíduos', 'A queima de resíduos perigosos', 'Evitar ao máximo a produção de resíduos desde a origem', 'Descarte em lixões com tratamento posterior'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'residuos',
    explanation: 'Não geração é a primeira e mais desejável etapa da hierarquia de resíduos, focada em evitar sua criação.',
    points: 200
  },
  {
    id: '76',
    question: 'Qual é a unidade usada para medir a pegada ecológica?',
    options: ['m³/ano', 'kg CO₂/dia', 'gha/pessoa/ano', 'Watt/hora'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'sustentabilidade',
    explanation: 'A unidade gha/pessoa/ano representa hectares globais utilizados por pessoa a cada ano.',
    points: 200
  },
  {
    id: '77',
    question: 'Qual das opções é uma desvantagem da energia solar?',
    options: ['Alto impacto ambiental', 'Baixa durabilidade das placas', 'Necessidade de baterias para armazenar energia', 'Geração contínua mesmo à noite'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'energias_renovaveis',
    explanation: 'A energia solar exige sistemas de armazenamento como baterias, já que não gera energia à noite.',
    points: 200
  },
  {
    id: '78',
    question: 'Qual fator torna a energia eólica uma fonte atraente?',
    options: ['Alta emissão de poluentes', 'Custo elevado de operação', 'Alta disponibilidade e baixo impacto ambiental', 'Necessidade de rios para geração'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'energias_renovaveis',
    explanation: 'A energia eólica é limpa, abundante e pode ser usada em diversos locais com vento adequado.',
    points: 100
  },
  {
    id: '79',
    question: 'Qual é a principal preocupação com os resíduos radioativos da energia nuclear?',
    options: ['Baixa toxicidade', 'Curto tempo de decomposição', 'Fácil incineração', 'Ausência de solução segura para armazenamento a longo prazo'],
    correctAnswer: 3,
    difficulty: 'hard',
    category: 'energia',
    explanation: 'Resíduos radioativos exigem armazenamento seguro por milhares de anos, sem soluções definitivas.',
    points: 300
  },
  {
    id: '80',
    question: 'Qual é o impacto do uso excessivo de veículos individuais nas cidades?',
    options: ['Redução do tempo de deslocamento', 'Aumento da biodiversidade urbana', 'Menor emissão de CO₂', 'Congestionamentos e aumento da poluição'],
    correctAnswer: 3,
    difficulty: 'easy',
    category: 'urbanizacao',
    explanation: 'O uso massivo de automóveis causa congestionamentos, poluição do ar e maior emissão de gases de efeito estufa.',
    points: 100
  },
  {
    id: '81',
    question: 'Qual é a principal vantagem do transporte coletivo sobre o individual?',
    options: ['Maior consumo de combustível', 'Menor eficiência energética', 'Menos poluição e uso de espaço urbano', 'Maior índice de acidentes'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'urbanizacao',
    explanation: 'Transporte coletivo é mais eficiente, gera menos poluição e reduz a necessidade de espaço urbano para veículos.',
    points: 100
  },
  {
    id: '82',
    question: 'O que caracteriza os resíduos do Grupo E?',
    options: ['São recicláveis', 'Contêm substâncias químicas', 'Podem perfurar ou cortar', 'São resíduos líquidos'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'residuos',
    explanation: 'Grupo E inclui materiais perfurocortantes, como agulhas e lâminas, com potencial risco físico.',
    points: 200
  },
  {
    id: '83',
    question: 'O que define os polímeros como plásticos termoplásticos?',
    options: ['São biodegradáveis', 'Podem ser moldados várias vezes com calor', 'São sempre transparentes', 'São usados apenas em brinquedos'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'residuos',
    explanation: 'Termoplásticos podem ser fundidos e remoldados diversas vezes, ao contrário dos termofixos.',
    points: 200
  },
  {
    id: '84',
    question: 'Por que o gás hidrogênio é considerado uma alternativa promissora aos combustíveis fósseis?',
    options: ['Produz CO₂ em abundância', 'Exige grandes usinas', 'Pode gerar vapor de água como único resíduo', 'Tem baixa eficiência energética'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'energia',
    explanation: 'Quando usado corretamente, o hidrogênio gera apenas vapor de água, sendo uma fonte limpa e promissora.',
    points: 300
  },
  {
    id: '85',
    question: 'O que caracteriza um aterro sanitário?',
    options: ['Descarte sem tratamento', 'Área improvisada para lixo', 'Local com estrutura segura para resíduos sólidos', 'Incinerador a céu aberto'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'residuos',
    explanation: 'Aterros sanitários possuem sistemas de impermeabilização e controle de chorume e gases.',
    points: 100
  },
  {
    id: '86',
    question: 'Qual é o principal objetivo do Ecodesign?',
    options: ['Reduzir o preço de produtos', 'Maximizar o uso de materiais não recicláveis', 'Minimizar os impactos ambientais durante todo o ciclo de vida do produto', 'Eliminar etapas de produção'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'consumo',
    explanation: 'O Ecodesign visa criar produtos com menor impacto ambiental desde a origem até o descarte.',
    points: 200
  },
  {
    id: '87',
    question: 'Por que o polietileno verde é considerado mais sustentável?',
    options: ['É feito de vidro reciclado', 'É produzido a partir de petróleo', 'É derivado da cana-de-açúcar e reduz emissões de CO₂', 'É composto de metais pesados'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'reciclagem',
    explanation: 'O polietileno verde é produzido a partir de fonte renovável e reduz a pegada de carbono em comparação ao plástico fóssil.',
    points: 200
  },
  {
    id: '88',
    question: 'Qual das ações abaixo mais contribui para a redução de resíduos em casa?',
    options: ['Comprar alimentos embalados', 'Usar produtos descartáveis', 'Separar recicláveis e fazer compostagem', 'Utilizar sacolas plásticas'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'residuos',
    explanation: 'A separação correta e o reaproveitamento orgânico via compostagem reduzem significativamente a geração de lixo.',
    points: 100
  },
  {
    id: '89',
    question: 'O que é "energia geotérmica"?',
    options: ['Energia solar concentrada no solo', 'Energia obtida do calor da Terra', 'Energia eólica subterrânea', 'Energia química das rochas'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'energias_renovaveis',
    explanation: 'A energia geotérmica é gerada pelo calor do interior da Terra, utilizada em regiões com atividade térmica intensa.',
    points: 200
  },
  {
    id: '90',
    question: 'Qual impacto negativo está associado à energia hidrelétrica?',
    options: ['Emissão intensa de CO₂', 'Baixa eficiência energética', 'Altos níveis de radiação', 'Destruição de ecossistemas durante a construção dos reservatórios'],
    correctAnswer: 3,
    difficulty: 'medium',
    category: 'energia',
    explanation: 'A construção de usinas hidrelétricas pode inundar áreas extensas e prejudicar ecossistemas locais.',
    points: 200
  },
  {
    id: '91',
    question: 'Qual é a cor do coletor seletivo indicado para resíduos de vidro?',
    options: ['Amarelo', 'Verde', 'Azul', 'Vermelho'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'reciclagem',
    explanation: 'Segundo o sistema de coleta seletiva, a cor verde é destinada ao vidro.',
    points: 100
  },
  {
    id: '92',
    question: 'O que é logística reversa?',
    options: ['Descarte direto em aterros', 'Transporte de resíduos perigosos', 'Retorno de produtos e embalagens ao fabricante para reaproveitamento ou descarte adequado', 'Exportação de resíduos'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'residuos',
    explanation: 'A logística reversa responsabiliza fabricantes e comerciantes pela destinação correta dos resíduos gerados pelos seus produtos.',
    points: 200
  },
  {
    id: '93',
    question: 'Qual prática agrícola contribui para o aumento da erosão do solo?',
    options: ['Plantio direto', 'Agrofloresta', 'Monocultura sem rotação', 'Compostagem'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'solo',
    explanation: 'A monocultura contínua, sem técnicas conservacionistas, empobrece o solo e acelera sua degradação.',
    points: 200
  },
  {
    id: '94',
    question: 'Qual o papel dos biocombustíveis na matriz energética sustentável?',
    options: ['Aumentam a dependência de petróleo', 'Reduzem as emissões de gases poluentes', 'Têm maior emissão de CO₂ que o carvão', 'São derivados de resíduos nucleares'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'energias_renovaveis',
    explanation: 'Biocombustíveis como etanol e biodiesel são alternativas mais limpas e renováveis aos combustíveis fósseis.',
    points: 200
  },
  {
    id: '95',
    question: 'O que é um produto “biodegradável”?',
    options: ['É reciclável', 'Decompõe-se por processos biológicos naturais', 'É feito de vidro', 'É incinerado facilmente'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'residuos',
    explanation: 'Produtos biodegradáveis são quebrados por microrganismos em substâncias simples e inofensivas.',
    points: 100
  },
  {
    id: '96',
    question: 'Qual é a principal finalidade da coleta seletiva?',
    options: ['Aumentar a quantidade de lixo acumulado', 'Facilitar a compostagem', 'Separar materiais recicláveis para reaproveitamento', 'Reduzir a necessidade de energia elétrica'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'reciclagem',
    explanation: 'A coleta seletiva visa separar resíduos recicláveis dos orgânicos e rejeitos, otimizando o reaproveitamento.',
    points: 100
  },
  {
    id: '97',
    question: 'O que diferencia o lixão do aterro sanitário?',
    options: ['O lixão é mais moderno', 'O lixão trata os resíduos antes do descarte', 'O aterro é planejado e impermeabilizado, o lixão é irregular e poluente', 'Ambos têm a mesma estrutura'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'residuos',
    explanation: 'Lixões são áreas irregulares, sem controle ambiental; aterros seguem critérios técnicos e ambientais.',
    points: 100
  },
  {
    id: '98',
    question: 'Qual das ações abaixo representa consumo consciente?',
    options: ['Comprar por impulso', 'Adquirir produtos locais e duráveis', 'Usar embalagens descartáveis sempre', 'Ignorar a origem dos produtos'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'consumo',
    explanation: 'O consumo consciente envolve escolhas que consideram o impacto ambiental, social e econômico.',
    points: 200
  },
  {
    id: '99',
    question: 'O que caracteriza uma cidade sustentável?',
    options: ['Alta emissão de CO₂', 'Políticas públicas voltadas à inclusão social, mobilidade e preservação ambiental', 'Desenvolvimento sem planejamento urbano', 'Uso exclusivo de veículos motorizados'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'sustentabilidade',
    explanation: 'Cidades sustentáveis priorizam a qualidade de vida, uso racional dos recursos e inclusão social.',
    points: 300
  },
  {
    id: '100',
    question: 'Qual dos seguintes materiais NÃO é reciclável?',
    options: ['Papelão', 'Vidro', 'Espelho', 'Lata de alumínio'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'reciclagem',
    explanation: 'Espelhos contêm revestimentos e metais que dificultam sua reciclagem convencional.',
    points: 200
  }
    ];
