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
<<<<<<< HEAD
- **Banco de Dados**: Firebase Realtime Database (usuários e perguntas)
=======
- **Banco de Dados**: Firebase Realtime Database
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
- **Autenticação**: Firebase Auth (customizada)

## 📋 Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative o Realtime Database
3. Configure as regras de segurança:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

4. Copie as configurações do projeto e atualize o arquivo `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com/",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
};
```

<<<<<<< HEAD
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

=======
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
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
<<<<<<< HEAD
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
=======
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
```

## 🔒 Validações

- **RA**: Deve conter exatamente 6 dígitos
- **Username**: Mínimo 2 caracteres (não precisa ser único)
- **RA único**: Cada RA só pode ser cadastrado uma vez
- **Autenticação**: Verificação em tempo real com Firebase

## 🎯 Funcionalidades Futuras

- [ ] Sistema de conquistas
- [ ] Ranking global
- [ ] Chat em tempo real nas salas
<<<<<<< HEAD
- [x] Sistema de perguntas no Firebase
- [ ] Interface para adicionar/editar perguntas
=======
- [ ] Mais categorias de perguntas
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
- [ ] Sistema de níveis avançado
- [ ] Estatísticas detalhadas

## 📱 Responsividade

O jogo é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Mobile

## 🌱 Sobre o Projeto

EcoTrivia foi desenvolvido para promover a educação ambiental de forma divertida e interativa. Cada pergunta respondida é um passo em direção a um futuro mais sustentável!