# EcoTrivia - Jogo de Sustentabilidade Ambiental

Um jogo interativo de trivia sobre sustentabilidade ambiental com autenticação Firebase e banco de dados em tempo real.

## 🚀 Funcionalidades

### Autenticação
- **Login/Registro unificado**: Interface única para login e registro
- **Autenticação por RA**: Sistema baseado em Registro Acadêmico (6 dígitos)
- **Firebase Realtime DB**: Banco de dados NoSQL distribuído
- **Validação de RA único**: Impede cadastros duplicados

### Jogo
- **Múltiplas categorias**: Reciclagem, Biodiversidade, Energia, etc.
- **Diferentes dificuldades**: Fácil, Médio, Difícil
- **Sistema de pontuação**: Pontos baseados em acerto e velocidade
- **Salas multiplayer**: Jogue com amigos em tempo real
- **Persistência de dados**: Progresso salvo automaticamente

## 🛠️ Tecnologias

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Estado**: Zustand
- **Banco de Dados**: Firebase Realtime Database (usuários e perguntas)
- **Autenticação**: Firebase Auth (customizada)


## 📝 Sistema de Perguntas

### Estrutura no Firebase
As perguntas são armazenadas no Firebase Realtime Database com a seguinte estrutura:

```json
{
  "questions": {
    "question_id_1": {
      "id": "question_id_1",
      "question": "Qual gás é o principal contribuinte para o efeito estufa?",
      "options": ["Oxigênio", "Dióxido de Carbono", "Nitrogênio", "Metano"],
      "correctAnswer": 1,
      "difficulty": "easy",
      "category": "mudancas_climaticas",
      "explanation": "O dióxido de carbono (CO2) é o principal gás de efeito estufa...",
      "points": 100
    }
  }
}
```

### Inicialização Automática
- As perguntas são automaticamente carregadas no Firebase na primeira execução
- O sistema verifica se existem perguntas e faz o seed automaticamente
- Fallback para perguntas locais em caso de erro

## 🎮 Como Usar

### Registro
1. Acesse a página inicial
2. Clique em "Registro"
3. Digite seu nome de usuário
4. Digite seu RA (6 dígitos únicos)
5. Clique em "Registrar"

### Login
1. Acesse a página inicial
2. Digite seu RA cadastrado
3. Clique em "Entrar"

### Jogando
1. Após o login, acesse o dashboard
2. Clique em "Jogo Rápido" ou "Criar Sala"
3. Aguarde outros jogadores (se necessário)
4. Responda as perguntas dentro do tempo limite
5. Veja seus resultados e ranking

## 📊 Estrutura do Banco de Dados

```
users/
  {ra}/
    username: string
    ra: string (chave primária)
    score: number
    gamesPlayed: number

questions/
  {question_id}/
    id: string
    question: string
    options: string[]
    correctAnswer: number
    difficulty: 'easy' | 'medium' | 'hard'
    category: string
    explanation: string
    points: number
```

## 🔒 Validações

- **RA**: Deve conter exatamente 6 dígitos
- **Username**: Mínimo 2 caracteres (não precisa ser único)
- **RA único**: Cada RA só pode ser cadastrado uma vez
- **Autenticação**: Verificação em tempo real com Firebase

## 🌱 Sobre o Projeto

EcoTrivia foi desenvolvido para promover a educação ambiental de forma divertida e interativa. Cada pergunta respondida é um passo em direção a um futuro mais sustentável!
