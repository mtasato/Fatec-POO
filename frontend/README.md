📝 Sobre o Projeto
Projeto desenvolvido como desafio técnico para testar e demonstrar conhecimentos em tecnologias modernas de desenvolvimento front-end. O sistema permite gerenciar tarefas de forma intuitiva, com funcionalidades de criação, listagem, filtros e alteração de status.
🎯 Objetivos do Projeto
Este projeto foi criado para explorar e demonstrar:

⚛️ React 19 - Últimas funcionalidades e hooks
🎨 Tailwind CSS v4 - Estilização moderna e responsiva
⚡ Vite - Build tool de alta performance
📘 TypeScript - Tipagem estática e segurança de código
✅ ESLint - Garantia de qualidade e padrões de código


🚀 Tecnologias Utilizadas
Core

React 19.1.1 - Biblioteca para construção de interfaces
TypeScript 5.9.3 - Superset JavaScript com tipagem estática
Vite 7.1.7 - Build tool extremamente rápida

Estilização

Tailwind CSS 4.1.16 - Framework CSS utility-first
@tailwindcss/vite - Plugin Vite para Tailwind

Qualidade de Código

ESLint 9.36.0 - Linter para identificar e corrigir problemas no código
TypeScript ESLint 8.45.0 - Regras ESLint específicas para TypeScript
eslint-plugin-react-hooks - Validação de regras dos Hooks do React
eslint-plugin-react-refresh - Suporte para Fast Refresh

UI/UX

Lucide React - Biblioteca de ícones moderna e leve


📦 Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:

Node.js (versão 18 ou superior)
Yarn (gerenciador de pacotes)

Para verificar se você tem o Node.js instalado:
bashnode --version
Para instalar o Yarn (caso não tenha):
bashnpm install -g yarn

🔧 Instalação e Configuração
1️⃣ Clone o repositório
bashgit clone https://github.com/seu-usuario/copastur-technical-challenge.git
cd copastur-technical-challenge
2️⃣ Instale as dependências
bashyarn

💡 Nota: Se a pasta node_modules não existir, execute yarn antes de qualquer comando.

3️⃣ Execute o projeto
bashyarn dev
O projeto estará rodando em: http://localhost:5173

📜 Scripts Disponíveis
bash# Inicia o servidor de desenvolvimento
yarn dev

# Cria build de produção
yarn build

# Visualiza o build de produção localmente
yarn preview

# Executa o linter para verificar problemas no código
yarn lint
```
🏗️ Estrutura do Projeto
copastur-technical-challenge/
├── public/  
├───logo/               # Arquivos estáticos
│   └── copastur-logo.svg  # Logo da aplicação
├── src/
│   ├── components/         # Componentes React
│   │   ├── layout/        # Componentes de layout
│   │   │   ├── Layout.tsx
│   │   │   └── Sidebar.tsx
│   │   └── Task/          # Componentes de tarefas
│   │   │   ├── TaskModal.tsx
│   │   │   ├── TaskRow.tsx
│   │   │   └── Pagination.tsx
│   │   └─── ui/           # Componentes de ui
│   │        └──CustomCheckbox.tsx
│   │   
│   ├── data/              # Dados mockados
│   │   └── mock-tasks.ts
│   ├── types/             # Definições TypeScript
│   │   └── task.ts
│   ├── styles/            # Estilos globais
│   │   └── global.css
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Entry point
├── .eslintrc.js           # Configuração ESLint
├── tailwind.config.js     # Configuração Tailwind
├── tsconfig.json          # Configuração TypeScript
├── vite.config.ts         # Configuração Vite
└── package.json           # Dependências do projeto
```
✨ Funcionalidades
✅ Gerenciamento de Tarefas

➕ Criar novas tarefas com título e descrição
📋 Listar todas as tarefas cadastradas
🔍 Pesquisar tarefas por título ou descrição
🏷️ Filtrar por status (Todas/Pendentes/Concluídas)
✏️ Alterar status (Pendente ↔️ Concluída)
🗑️ Excluir tarefas
📄 Paginação (8 itens por página)

🎨 Interface

📱 Design responsivo para mobile, tablet e desktop
🎭 Sidebar lateral com animação suave
🌙 Layout moderno com Tailwind CSS v4
⚡ Performance otimizada com Vite


🔍 Recursos do ESLint
O projeto utiliza ESLint para manter a qualidade e consistência do código:
Configurações Ativas

✅ Regras recomendadas do JavaScript/TypeScript
✅ Validação de Hooks do React
✅ Verificação de dependências não utilizadas
✅ Formatação e boas práticas
✅ Detecção de código morto

Executar Verificações
bash# Verificar problemas no código
yarn lint

# Verificar com detalhes
yarn lint --max-warnings 0

🎨 Tailwind CSS v4
O projeto utiliza a versão mais recente do Tailwind CSS com recursos avançados:

⚡ Build otimizado com @tailwindcss/vite
🎨 Cores personalizadas definidas no tema
📱 Breakpoints responsivos
🔧 Configuração modular

Cores do Tema
jsprimary: "#1C2456"  // Azul escuro principal

🚀 Build para Produção
Para criar uma versão otimizada para produção:
bashyarn build
Os arquivos otimizados serão gerados na pasta dist/.
Para testar o build localmente:
bashyarn preview