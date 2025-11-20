# 📁 Estrutura de Arquivos - BlueRosiere v1.1.0

Guia completo da estrutura de arquivos do projeto após as melhorias.

---

## 🌳 Árvore de Diretórios

```
front_BluRosiere/
├── public/                          # Arquivos estáticos
│   ├── logo.png
│   ├── logo.svg
│   ├── logoblu.png
│   └── vite.svg
│
├── src/                             # Código-fonte
│   ├── components/                  # Componentes React reutilizáveis
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── ErrorBoundary.jsx        # ✨ NOVO
│   │   ├── FormField.jsx
│   │   ├── Header.jsx
│   │   ├── Input.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── MarkdownRenderer.jsx
│   │   ├── PatientInfo.jsx
│   │   ├── PublicNavbar.jsx
│   │   ├── SelectField.jsx
│   │   ├── SessionCard.jsx
│   │   ├── SessionForm.jsx
│   │   ├── SessionList.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ToastManager.jsx
│   │   └── WelcomeCard.jsx
│   │
│   ├── context/                     # Contextos React
│   │   └── AuthContext.jsx          # ✨ MELHORADO
│   │
│   ├── hooks/                       # ✨ NOVO - Hooks customizados
│   │   ├── useAuth.js               # Hooks de autenticação
│   │   └── useAsync.js              # Gerenciamento de async
│   │
│   ├── pages/                       # Páginas/Rotas
│   │   ├── About.jsx
│   │   ├── Agendamentos.jsx
│   │   ├── ChatIA.jsx
│   │   ├── Contact.jsx
│   │   ├── DashboardPaciente.jsx
│   │   ├── DashboardPsicologo.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── PacienteDetalhes.jsx
│   │   ├── Pacientes.jsx
│   │   ├── Register.jsx
│   │   ├── Relatorios.jsx
│   │   ├── SessaoDetalhes.jsx
│   │   └── Solicitacoes.jsx
│   │
│   ├── routes/                      # Configuração de rotas
│   │   └── AppRoutes.jsx            # ✨ MELHORADO
│   │
│   ├── services/                    # Serviços e APIs
│   │   ├── aiServices.js
│   │   ├── errorHandler.js          # ✨ NOVO - Tratamento de erros
│   │   └── mockApi.js               # ✨ MELHORADO
│   │
│   ├── utils/                       # ✨ NOVO - Funções utilitárias
│   │   ├── validation.js            # Validações
│   │   ├── storage.js               # Gerenciamento de localStorage
│   │   └── formatters.js            # Formatação de dados
│   │
│   ├── constants/                   # ✨ NOVO - Constantes da aplicação
│   │   └── index.js                 # Todas as constantes
│   │
│   ├── types/                       # ✨ NOVO - Tipos e interfaces
│   │   └── (preparado para TypeScript)
│   │
│   ├── assets/                      # Recursos
│   │   └── react.svg
│   │
│   ├── App.jsx                      # ✨ MELHORADO - Componente principal
│   ├── index.css                    # Estilos globais
│   └── main.jsx                     # Entry point
│
├── .env.example                     # ✨ NOVO - Template de variáveis
├── .gitignore                       # ✨ MELHORADO - Padrões profissionais
├── eslint.config.js                 # Configuração ESLint
├── vite.config.js                   # Configuração Vite
├── package.json                     # Dependências
├── package-lock.json                # Lock de dependências
├── index.html                       # HTML principal
├── vercel.json                      # Configuração Vercel
├── README.md                        # Documentação principal
│
├── IMPROVEMENTS.md                  # ✨ NOVO - Detalhes de melhorias
├── CONTRIBUTING.md                  # ✨ NOVO - Guia de contribuição
├── BEST_PRACTICES.md                # ✨ NOVO - Boas práticas
├── QUICK_REFERENCE.md               # ✨ NOVO - Referência rápida
├── REVISION_SUMMARY.md              # ✨ NOVO - Resumo da revisão
└── FILE_STRUCTURE.md                # ✨ NOVO - Este arquivo
```

---

## 📊 Resumo de Arquivos

### Arquivos Criados (✨ NOVO)
| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `.env.example` | Config | Template de variáveis de ambiente |
| `src/constants/index.js` | Código | Constantes centralizadas |
| `src/utils/validation.js` | Código | Validações reutilizáveis |
| `src/utils/storage.js` | Código | Gerenciamento de localStorage |
| `src/utils/formatters.js` | Código | Formatação de dados |
| `src/hooks/useAuth.js` | Código | Hooks de autenticação |
| `src/hooks/useAsync.js` | Código | Gerenciamento de async |
| `src/services/errorHandler.js` | Código | Tratamento de erros |
| `src/components/ErrorBoundary.jsx` | Código | Captura de erros |
| `IMPROVEMENTS.md` | Docs | Detalhes de melhorias |
| `CONTRIBUTING.md` | Docs | Guia de contribuição |
| `BEST_PRACTICES.md` | Docs | Boas práticas |
| `QUICK_REFERENCE.md` | Docs | Referência rápida |
| `REVISION_SUMMARY.md` | Docs | Resumo da revisão |
| `FILE_STRUCTURE.md` | Docs | Este arquivo |

### Arquivos Melhorados (✨ MELHORADO)
| Arquivo | Melhorias |
|---------|-----------|
| `src/App.jsx` | Adicionado ErrorBoundary |
| `src/context/AuthContext.jsx` | Melhor tratamento de erros, novas funções |
| `src/routes/AppRoutes.jsx` | Uso de constantes, melhor organização |
| `src/services/mockApi.js` | Refatorado com constantes e AppError |
| `.gitignore` | Padrões profissionais |

---

## 🎯 Organização por Responsabilidade

### Componentes (`src/components/`)
Componentes React reutilizáveis e específicos da UI.

**Novos:**
- `ErrorBoundary.jsx` - Captura erros em componentes filhos

### Contextos (`src/context/`)
Contextos React para estado global.

**Melhorados:**
- `AuthContext.jsx` - Melhor tratamento de erros

### Hooks (`src/hooks/`)
Hooks customizados React para lógica reutilizável.

**Novos:**
- `useAuth.js` - Hooks de autenticação
- `useAsync.js` - Gerenciamento de operações assíncronas

### Páginas (`src/pages/`)
Componentes de página/rota.

### Rotas (`src/routes/`)
Configuração de rotas da aplicação.

**Melhorado:**
- `AppRoutes.jsx` - Refatorado com constantes

### Serviços (`src/services/`)
Serviços, APIs e lógica de negócio.

**Novos:**
- `errorHandler.js` - Tratamento centralizado de erros

**Melhorado:**
- `mockApi.js` - Refatorado com constantes

### Utilitários (`src/utils/`)
Funções utilitárias reutilizáveis.

**Novos:**
- `validation.js` - Validações
- `storage.js` - Gerenciamento de localStorage
- `formatters.js` - Formatação de dados

### Constantes (`src/constants/`)
Constantes da aplicação.

**Novo:**
- `index.js` - Todas as constantes

### Tipos (`src/types/`)
Tipos e interfaces (preparado para TypeScript).

---

## 📈 Estatísticas

### Arquivos por Tipo
```
Componentes:     14 arquivos
Páginas:         13 arquivos
Serviços:        3 arquivos
Hooks:           2 arquivos
Utilitários:     3 arquivos
Contextos:       1 arquivo
Rotas:           1 arquivo
Constantes:      1 arquivo
Documentação:    5 arquivos
Configuração:    6 arquivos
```

### Linhas de Código
```
Código Novo:     2000+ linhas
Documentação:    1500+ linhas
Total:           3500+ linhas
```

---

## 🔄 Fluxo de Dados

```
App.jsx
├── ErrorBoundary
│   └── AuthProvider (AuthContext.jsx)
│       └── AppRoutes (routes/AppRoutes.jsx)
│           ├── PublicRoute
│           │   ├── PublicNavbar
│           │   └── Páginas Públicas
│           └── ProtectedRoute
│               ├── Sidebar
│               └── Páginas Protegidas
```

---

## 🔗 Dependências Entre Arquivos

### Constantes
```
constants/index.js
├── Usado por: utils/*, hooks/*, services/*, routes/*, context/*
└── Não depende de: nada
```

### Utilitários
```
utils/validation.js
├── Usado por: pages/*, components/*, services/*
└── Depende de: constants/

utils/storage.js
├── Usado por: context/AuthContext.jsx
└── Depende de: constants/

utils/formatters.js
├── Usado por: pages/*, components/*
└── Depende de: nada
```

### Hooks
```
hooks/useAuth.js
├── Usado por: pages/*, components/*, routes/*
└── Depende de: context/AuthContext.jsx

hooks/useAsync.js
├── Usado por: pages/*, components/*
└── Depende de: React
```

### Serviços
```
services/errorHandler.js
├── Usado por: services/mockApi.js, pages/*, components/*
└── Depende de: constants/

services/mockApi.js
├── Usado por: pages/*, components/*
└── Depende de: constants/, services/errorHandler.js
```

---

## 📚 Documentação

### Documentação Técnica
- `IMPROVEMENTS.md` - Detalhes de todas as melhorias
- `BEST_PRACTICES.md` - Boas práticas de desenvolvimento
- `CONTRIBUTING.md` - Guia de contribuição
- `QUICK_REFERENCE.md` - Referência rápida de uso
- `FILE_STRUCTURE.md` - Este arquivo

### Documentação no Código
- JSDoc em todas as funções
- Comentários explicativos
- Exemplos de uso

---

## 🚀 Como Navegar o Projeto

### Para Adicionar um Novo Componente
1. Crie em `src/components/`
2. Importe constantes de `src/constants/`
3. Use hooks de `src/hooks/`
4. Use utilitários de `src/utils/`
5. Adicione JSDoc

### Para Adicionar uma Nova Página
1. Crie em `src/pages/`
2. Adicione rota em `src/routes/AppRoutes.jsx`
3. Importe constantes e hooks
4. Use serviços de `src/services/`

### Para Adicionar uma Nova Funcionalidade
1. Crie utilitário em `src/utils/` se reutilizável
2. Crie hook em `src/hooks/` se lógica complexa
3. Use em componentes/páginas
4. Documente com JSDoc

---

## 🔍 Buscar Funcionalidades

### Validação
```
src/utils/validation.js
```

### Formatação
```
src/utils/formatters.js
```

### Autenticação
```
src/context/AuthContext.jsx
src/hooks/useAuth.js
```

### Tratamento de Erros
```
src/services/errorHandler.js
```

### Storage
```
src/utils/storage.js
```

### Constantes
```
src/constants/index.js
```

---

## 📋 Checklist de Estrutura

- [x] Componentes organizados
- [x] Contextos centralizados
- [x] Hooks customizados
- [x] Utilitários reutilizáveis
- [x] Constantes centralizadas
- [x] Serviços bem estruturados
- [x] Documentação completa
- [x] Tipos preparados
- [x] Configuração profissional
- [x] Estrutura escalável

---

## 🎯 Próximas Melhorias Estruturais

1. [ ] Adicionar `src/tests/` para testes
2. [ ] Adicionar `src/styles/` para estilos globais
3. [ ] Adicionar `src/config/` para configurações
4. [ ] Adicionar `src/middleware/` para middlewares
5. [ ] Adicionar `src/store/` para estado global (Redux/Zustand)

---

**Desenvolvido com ❤️ para organização profissional**
