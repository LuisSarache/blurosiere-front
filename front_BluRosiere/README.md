# 🌌 BlueRosiere - Sistema de Agendamento Psicológico

Sistema web moderno para gestão de consultas psicológicas, desenvolvido com **React 19 + Vite**, focado em atendimentos voluntários em universidades, ONGs e projetos sociais.  
O **BlueRosiere** combina **design sofisticado**, **interface moderna** e **funcionalidades completas** para psicólogos e pacientes.

![BlueRosiere Logo](public/logo.png)

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](CHANGELOG.md)
[![React](https://img.shields.io/badge/React-19.1.1-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.0-646cff.svg)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1.11-38bdf8.svg)](https://tailwindcss.com/)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Modelo de Dados](#modelo-de-dados)
- [API Mock](#api-mock)
- [Chat com IA](#chat-com-ia)
- [Rotas](#rotas)
- [Design System](#design-system)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 🎯 Sobre o Projeto

O **BlueRosiere** é uma plataforma web desenvolvida para facilitar o **agendamento e gestão de consultas psicológicas** em ambientes de atendimento voluntário.  
O sistema oferece **interfaces diferenciadas para psicólogos e pacientes**, com foco em **experiência do usuário**, **eficiência operacional** e **design premium baseado em tons de azul sofisticado**.

### Objetivos

- Simplificar o agendamento de consultas  
- Facilitar a gestão de pacientes para psicólogos  
- Fornecer relatórios e analytics em tempo real  
- Manter histórico completo de sessões  
- Garantir interface moderna, responsiva e elegante  

---

## ✨ Funcionalidades

### 👨‍⚕️ Para Psicólogos

- **Dashboard Premium**: KPIs claros, próximos agendamentos e métricas de produtividade  
- **Gestão de Pacientes**: Lista completa com histórico e detalhes clínicos  
- **Detalhes do Paciente**: Histórico de sessões, anotações e relatórios  
- **Gestão de Sessões**: Edição de status, notas e relatórios clínicos  
- **Chat com IA**: Assistente especializada em psicologia clínica  
- **Relatórios e Analytics**: Gráficos interativos de frequência, status e alertas  
- **Agenda Individual**: Controle de disponibilidade por psicólogo  

### 👤 Para Pacientes

- **Dashboard Intuitivo**: Próximos agendamentos e informações importantes  
- **Agendamento Flexível**: Escolha de psicólogo, data e horário  
- **Seleção de Especialista**: Lista de psicólogos com especialidades  
- **Verificação de Disponibilidade**: Horários livres em tempo real  

### 🔐 Sistema de Autenticação

- Login seguro com validação  
- Diferenciação automática de perfis (psicólogo/paciente)  
- Registro de novos usuários com validação  
- Contexto global de autenticação  
- Proteção de rotas por perfil  

---

## 🛠 Tecnologias

### Frontend
- **React 19.1.1**  
- **Vite 7.1.0**  
- **React Router DOM 7.8.0**  
- **Tailwind CSS 4.1.11**  
- **Framer Motion 12.23.12**  
- **Lucide React 0.539.0**  
- **Recharts 3.1.2**  
- **Chart.js 4.5.0**  
- **React Hot Toast 2.5.2**  
- **@huggingface/inference 4.6.1**  

### Persistência
- **LocalStorage**  
- **Mock API**  

### Design
- **Glassmorphism**  
- **Design System**  
- **Responsivo** (Mobile-first)  

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+  
- npm ou yarn  

### Passos

## 🚀 Instalação e Uso

### 1. Clone o repositório
git clone https://github.com/seu-usuario/bluerosiere.git
cd bluerosiere

### 2. Instale as dependências
npm install
# ou
yarn install

### 3. Configure variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env e adicione seu token do Hugging Face

### 4. Execute o projeto
npm run dev
# ou
yarn dev

### 5. Acesse no navegador
http://localhost:5173

---

## 💻 Contas de Teste

### Psicólogos
- Dr. João Silva: psicologo@test.com / 123456
- Dra. Ana Costa: ana@test.com / 123456

### Paciente
- Maria Santos: paciente@test.com / 123456

---

## 📁 Estrutura do Projeto
src/
├── components/          # Componentes reutilizáveis
├── context/             # Contextos React
├── pages/               # Páginas principais
├── routes/              # Configuração de rotas
├── services/            # Serviços e APIs
├── App.jsx              # Componente principal
├── index.css            # Estilos globais
└── main.jsx             # Entry point

---

## 🗄 Modelo de Dados

### User (Usuário)
{
  id: number,
  name: string,
  email: string,
  password: string,
  type: 'psicologo' | 'paciente',
  specialty?: string,
  crp?: string
}

### Patient (Paciente)
{
  id: number,
  name: string,
  email: string,
  phone: string,
  birthDate: string,
  age: number,
  status: string,
  psychologistId: number,
  totalSessions?: number
}

### Appointment (Agendamento/Sessão)
{
  id: number,
  patientId: number,
  psychologistId: number,
  date: string,
  time: string,
  status: 'agendado' | 'concluido' | 'cancelado',
  description: string,
  duration: number,
  notes: string,
  fullReport: string
}

---

## 🔌 API Mock
- getAppointments(userId, userType)
- getPatients(psychologistId)
- createAppointment(data)
- updateAppointment(id, data)
- getAvailableSlots(date, psychologistId)
- getReportsData(psychologistId)

**Dados persistidos no localStorage.**

---

## 🤖 Chat com IA
- Assistente especializada em psicologia clínica
- Respostas em markdown
- Histórico de conversas preservado
- Tratamento de erros e timeout
- Modelo: zai-org/GLM-4.5 via Hugging Face

---

## 🎨 Design System

### Paleta de Cores
:root {
     dark: #1E3A5F;       /* Azul bem escuro */
     medium: #024873;     /* Azul médio */
     light: #3B82F6;      /* Azul claro */
      accent: #60A5FA;     /* Azul/acento esverdeado */
     background: #F2EFE9; /* Bege claro para fundo */
}

### Tipografia
- Primária: Inter
- Secundária: Nunito
- Monospace: Roboto Mono

---

## 🛣 Rotas

### Públicas
/, /about, /login, /register /contact

### Protegidas
/dashboard  
/agendamento  
/pacientes  
/pacientes/:id  
/sessao/:sessionId  
/chat-ia  
/relatorios

---

## 🔧 Scripts
npm run dev      # Desenvolvimento  
npm run build    # Build produção  
npm run preview  # Preview build  
npm run lint     # Lint do código  

---

## 🤝 Contribuição
1. Fork  
2. Branch (git checkout -b feature/NovaFeature)  
3. Commit (git commit -m 'Adiciona NovaFeature')  
4. Push (git push origin feature/NovaFeature)  
5. Pull Request  

---

## 📝 Licença
MIT License

---

## 👥 Equipe
- Desenvolvedor Principal: [Luis Sarache]  
- Design: [Luis Sarache]  
- Consultoria Psicológica: [Luis Sarache]  

<div align="center">
  <p>Desenvolvido com ❤️ para facilitar o acesso à saúde mental</p>
  <p><strong>BlueRosiere v1.0.0</strong></p>
</div>
 ```