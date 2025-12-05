# 🔧 Guia de Backend - BluRosiere

## 📋 Visão Geral

Este documento especifica **TODAS as funcionalidades** do frontend BluRosiere que precisam ser implementadas no backend, incluindo endpoints, modelos de dados, regras de negócio e integrações necessárias.

---

## 🗄️ Modelos de Dados

### User (Usuário)
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "type": "enum: ['psicologo', 'paciente']",
  "phone": "string",
  "avatar": "string (url)",
  "status": "enum: ['ativo', 'inativo', 'suspenso']",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  
  // Campos específicos para Psicólogo
  "crp": "string (opcional)",
  "specialty": "string (opcional)",
  "bio": "text (opcional)",
  "experience": "integer (opcional)",
  
  // Campos específicos para Paciente
  "birthDate": "date (opcional)",
  "age": "integer (calculado)",
  "emergencyContact": "string (opcional)",
  "medicalHistory": "text (opcional)"
}
```

### Patient (Paciente - Visão do Psicólogo)
```json
{
  "id": "uuid",
  "userId": "uuid (FK -> User)",
  "psychologistId": "uuid (FK -> User)",
  "status": "enum: ['ativo', 'inativo', 'alta', 'aguardando']",
  "riskLevel": "enum: ['baixo', 'medio', 'alto', 'critico']",
  "totalSessions": "integer",
  "lastSessionDate": "datetime",
  "nextSessionDate": "datetime",
  "notes": "text",
  "diagnosis": "text",
  "treatment": "text",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Appointment (Agendamento/Sessão)
```json
{
  "id": "uuid",
  "patientId": "uuid (FK -> User)",
  "psychologistId": "uuid (FK -> User)",
  "date": "date",
  "time": "time",
  "duration": "integer (minutos)",
  "status": "enum: ['agendado', 'confirmado', 'em_andamento', 'concluido', 'cancelado', 'faltou']",
  "type": "enum: ['primeira_consulta', 'retorno', 'emergencia', 'online', 'presencial']",
  "location": "string (opcional)",
  "meetingLink": "string (opcional)",
  "description": "text",
  "notes": "text",
  "fullReport": "text",
  "attachments": "array[string] (urls)",
  "cancelReason": "string (opcional)",
  "reminderSent": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Schedule (Agenda do Psicólogo)
```json
{
  "id": "uuid",
  "psychologistId": "uuid (FK -> User)",
  "dayOfWeek": "enum: [0-6]",
  "startTime": "time",
  "endTime": "time",
  "slotDuration": "integer (minutos)",
  "isActive": "boolean",
  "exceptions": "array[date]",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Report (Relatório)
```json
{
  "id": "uuid",
  "psychologistId": "uuid (FK -> User)",
  "patientId": "uuid (FK -> User, opcional)",
  "type": "enum: ['individual', 'geral', 'estatistico']",
  "title": "string",
  "content": "text",
  "data": "json",
  "period": {
    "startDate": "date",
    "endDate": "date"
  },
  "createdAt": "datetime"
}
```

### Notification (Notificação)
```json
{
  "id": "uuid",
  "userId": "uuid (FK -> User)",
  "type": "enum: ['lembrete', 'confirmacao', 'cancelamento', 'alerta', 'sistema']",
  "title": "string",
  "message": "text",
  "read": "boolean",
  "actionUrl": "string (opcional)",
  "createdAt": "datetime"
}
```

### ChatMessage (Mensagem do Chat IA)
```json
{
  "id": "uuid",
  "userId": "uuid (FK -> User)",
  "role": "enum: ['user', 'assistant']",
  "content": "text",
  "metadata": "json",
  "createdAt": "datetime"
}
```

### AuditLog (Log de Auditoria)
```json
{
  "id": "uuid",
  "userId": "uuid (FK -> User)",
  "action": "string",
  "entity": "string",
  "entityId": "uuid",
  "changes": "json",
  "ipAddress": "string",
  "userAgent": "string",
  "createdAt": "datetime"
}
```

---

## 🔐 Autenticação e Autorização

### Endpoints de Autenticação

#### POST /api/auth/register
```json
Request:
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "type": "psicologo | paciente",
  "phone": "string",
  "birthDate": "date (se paciente)",
  "crp": "string (se psicólogo)",
  "specialty": "string (se psicólogo)"
}

Response:
{
  "user": { User },
  "token": "jwt_token",
  "refreshToken": "refresh_token"
}
```

#### POST /api/auth/login
```json
Request:
{
  "email": "string",
  "password": "string"
}

Response:
{
  "user": { User },
  "token": "jwt_token",
  "refreshToken": "refresh_token"
}
```

#### POST /api/auth/refresh
```json
Request:
{
  "refreshToken": "string"
}

Response:
{
  "token": "jwt_token",
  "refreshToken": "refresh_token"
}
```

#### POST /api/auth/logout
```json
Request:
{
  "refreshToken": "string"
}

Response:
{
  "message": "Logout realizado com sucesso"
}
```

#### POST /api/auth/forgot-password
```json
Request:
{
  "email": "string"
}

Response:
{
  "message": "Email de recuperação enviado"
}
```

#### POST /api/auth/reset-password
```json
Request:
{
  "token": "string",
  "password": "string",
  "confirmPassword": "string"
}

Response:
{
  "message": "Senha alterada com sucesso"
}
```

---

## 👤 Usuários

### GET /api/users/me
```json
Response:
{
  "user": { User }
}
```

### PUT /api/users/me
```json
Request:
{
  "name": "string",
  "phone": "string",
  "avatar": "string",
  "bio": "string",
  // outros campos editáveis
}

Response:
{
  "user": { User }
}
```

### PUT /api/users/me/password
```json
Request:
{
  "currentPassword": "string",
  "newPassword": "string",
  "confirmPassword": "string"
}

Response:
{
  "message": "Senha alterada com sucesso"
}
```

### GET /api/users/psychologists
```json
Query Params:
- specialty: string
- available: boolean
- search: string

Response:
{
  "psychologists": [{ User }],
  "total": integer,
  "page": integer,
  "limit": integer
}
```

---

## 📅 Agendamentos

### GET /api/appointments
```json
Query Params:
- status: string
- startDate: date
- endDate: date
- patientId: uuid
- psychologistId: uuid
- page: integer
- limit: integer

Response:
{
  "appointments": [{ Appointment }],
  "total": integer,
  "page": integer,
  "limit": integer
}
```

### GET /api/appointments/:id
```json
Response:
{
  "appointment": { Appointment },
  "patient": { User },
  "psychologist": { User }
}
```

### POST /api/appointments
```json
Request:
{
  "patientId": "uuid",
  "psychologistId": "uuid",
  "date": "date",
  "time": "time",
  "duration": integer,
  "type": "string",
  "description": "string"
}

Response:
{
  "appointment": { Appointment }
}
```

### PUT /api/appointments/:id
```json
Request:
{
  "date": "date",
  "time": "time",
  "status": "string",
  "notes": "string",
  "fullReport": "string"
}

Response:
{
  "appointment": { Appointment }
}
```

### DELETE /api/appointments/:id
```json
Request:
{
  "cancelReason": "string"
}

Response:
{
  "message": "Agendamento cancelado com sucesso"
}
```

### GET /api/appointments/available-slots
```json
Query Params:
- psychologistId: uuid
- date: date

Response:
{
  "slots": [
    {
      "time": "time",
      "available": boolean
    }
  ]
}
```

---

## 👥 Pacientes (Psicólogo)

### GET /api/patients
```json
Query Params:
- status: string
- riskLevel: string
- search: string
- page: integer
- limit: integer

Response:
{
  "patients": [{ Patient + User }],
  "total": integer,
  "page": integer,
  "limit": integer
}
```

### GET /api/patients/:id
```json
Response:
{
  "patient": { Patient + User },
  "sessions": [{ Appointment }],
  "statistics": {
    "totalSessions": integer,
    "completedSessions": integer,
    "canceledSessions": integer,
    "attendanceRate": float
  }
}
```

### PUT /api/patients/:id
```json
Request:
{
  "status": "string",
  "riskLevel": "string",
  "notes": "string",
  "diagnosis": "string",
  "treatment": "string"
}

Response:
{
  "patient": { Patient }
}
```

---

## 📊 Dashboard e Estatísticas

### GET /api/dashboard/psychologist
```json
Response:
{
  "statistics": {
    "totalPatients": integer,
    "activePatients": integer,
    "totalSessions": integer,
    "upcomingSessions": integer,
    "completedThisMonth": integer,
    "canceledThisMonth": integer,
    "attendanceRate": float
  },
  "upcomingAppointments": [{ Appointment }],
  "recentPatients": [{ Patient }],
  "alerts": [
    {
      "type": "string",
      "message": "string",
      "patientId": "uuid"
    }
  ]
}
```

### GET /api/dashboard/patient
```json
Response:
{
  "statistics": {
    "totalSessions": integer,
    "completedSessions": integer,
    "upcomingSessions": integer,
    "lastSessionDate": "datetime"
  },
  "upcomingAppointments": [{ Appointment }],
  "psychologist": { User }
}
```

---

## 📈 Relatórios

### GET /api/reports
```json
Query Params:
- type: string
- startDate: date
- endDate: date
- patientId: uuid

Response:
{
  "reports": [{ Report }]
}
```

### POST /api/reports/generate
```json
Request:
{
  "type": "individual | geral | estatistico",
  "patientId": "uuid (opcional)",
  "startDate": "date",
  "endDate": "date",
  "includeCharts": boolean
}

Response:
{
  "report": { Report },
  "data": {
    "sessionsByStatus": [
      { "status": "string", "count": integer }
    ],
    "sessionsByMonth": [
      { "month": "string", "count": integer }
    ],
    "patientsByRiskLevel": [
      { "level": "string", "count": integer }
    ],
    "attendanceRate": float,
    "averageSessionDuration": integer
  }
}
```

### GET /api/reports/:id
```json
Response:
{
  "report": { Report }
}
```

### GET /api/reports/:id/export
```json
Query Params:
- format: pdf | excel | csv

Response:
Binary file download
```

---

## 🗓️ Agenda

### GET /api/schedule
```json
Query Params:
- psychologistId: uuid

Response:
{
  "schedule": [{ Schedule }]
}
```

### POST /api/schedule
```json
Request:
{
  "dayOfWeek": integer,
  "startTime": "time",
  "endTime": "time",
  "slotDuration": integer
}

Response:
{
  "schedule": { Schedule }
}
```

### PUT /api/schedule/:id
```json
Request:
{
  "startTime": "time",
  "endTime": "time",
  "isActive": boolean
}

Response:
{
  "schedule": { Schedule }
}
```

### DELETE /api/schedule/:id
```json
Response:
{
  "message": "Horário removido com sucesso"
}
```

### POST /api/schedule/exceptions
```json
Request:
{
  "scheduleId": "uuid",
  "date": "date",
  "reason": "string"
}

Response:
{
  "message": "Exceção adicionada com sucesso"
}
```

---

## 🔔 Notificações

### GET /api/notifications
```json
Query Params:
- read: boolean
- type: string
- page: integer
- limit: integer

Response:
{
  "notifications": [{ Notification }],
  "unreadCount": integer,
  "total": integer
}
```

### PUT /api/notifications/:id/read
```json
Response:
{
  "notification": { Notification }
}
```

### PUT /api/notifications/read-all
```json
Response:
{
  "message": "Todas notificações marcadas como lidas"
}
```

### DELETE /api/notifications/:id
```json
Response:
{
  "message": "Notificação removida"
}
```

---

## 🤖 Chat IA

### POST /api/chat/message
```json
Request:
{
  "message": "string",
  "context": "string (opcional)"
}

Response:
{
  "response": "string",
  "messageId": "uuid"
}
```

### GET /api/chat/history
```json
Query Params:
- limit: integer
- offset: integer

Response:
{
  "messages": [{ ChatMessage }],
  "total": integer
}
```

### DELETE /api/chat/history
```json
Response:
{
  "message": "Histórico limpo com sucesso"
}
```

---

## 📊 Analytics

### GET /api/analytics/overview
```json
Query Params:
- startDate: date
- endDate: date

Response:
{
  "totalSessions": integer,
  "totalPatients": integer,
  "averageSessionsPerPatient": float,
  "sessionsByStatus": [
    { "status": "string", "count": integer, "percentage": float }
  ],
  "sessionsByMonth": [
    { "month": "string", "count": integer }
  ],
  "patientsByRiskLevel": [
    { "level": "string", "count": integer }
  ],
  "topCancellationReasons": [
    { "reason": "string", "count": integer }
  ]
}
```

### GET /api/analytics/trends
```json
Query Params:
- metric: sessions | patients | attendance
- period: week | month | year

Response:
{
  "data": [
    { "date": "string", "value": number }
  ],
  "trend": "up | down | stable",
  "changePercentage": float
}
```

---

## 📤 Exportação de Dados

### GET /api/export/patients
```json
Query Params:
- format: csv | excel | pdf
- filters: json

Response:
Binary file download
```

### GET /api/export/appointments
```json
Query Params:
- format: csv | excel | pdf
- startDate: date
- endDate: date

Response:
Binary file download
```

---

## 🔍 Busca

### GET /api/search
```json
Query Params:
- q: string (query)
- type: patients | appointments | all
- limit: integer

Response:
{
  "results": {
    "patients": [{ Patient }],
    "appointments": [{ Appointment }]
  },
  "total": integer
}
```

---

## 📧 Email/Notificações

### POST /api/notifications/send
```json
Request:
{
  "userId": "uuid",
  "type": "email | sms | push",
  "template": "string",
  "data": "json"
}

Response:
{
  "message": "Notificação enviada com sucesso"
}
```

---

## 🔒 Regras de Negócio

### Autenticação
- JWT com expiração de 24h
- Refresh token com expiração de 7 dias
- Senha mínima: 8 caracteres
- Hash: bcrypt com salt rounds 10

### Agendamentos
- Duração padrão: 50 minutos
- Antecedência mínima: 24 horas
- Cancelamento: até 12 horas antes
- Confirmação automática: 24h antes
- Lembrete: 1 hora antes

### Pacientes
- Status inicial: "aguardando"
- Risco inicial: "baixo"
- Limite de sessões simultâneas: 1
- Histórico mínimo: 6 meses

### Relatórios
- Geração assíncrona para períodos > 3 meses
- Cache de 1 hora
- Exportação limitada a 10.000 registros

### Notificações
- Retenção: 30 dias
- Batch processing a cada 5 minutos
- Rate limit: 100 por usuário/dia

---

## 🔐 Segurança

### Headers Obrigatórios
```
Authorization: Bearer {token}
Content-Type: application/json
X-Request-ID: uuid
```

### Rate Limiting
- Autenticação: 5 req/min
- API Geral: 100 req/min
- Upload: 10 req/min

### Validações
- Sanitização de inputs
- Validação de tipos
- Proteção contra SQL Injection
- Proteção contra XSS
- CORS configurado

---

## 📊 Paginação Padrão

```json
Query Params:
- page: integer (default: 1)
- limit: integer (default: 10, max: 100)
- sort: string (default: createdAt)
- order: asc | desc (default: desc)

Response:
{
  "data": [],
  "pagination": {
    "page": integer,
    "limit": integer,
    "total": integer,
    "totalPages": integer,
    "hasNext": boolean,
    "hasPrev": boolean
  }
}
```

---

## 🚨 Códigos de Erro

```
200 - OK
201 - Created
204 - No Content
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
409 - Conflict
422 - Unprocessable Entity
429 - Too Many Requests
500 - Internal Server Error
503 - Service Unavailable
```

### Formato de Erro
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (opcional)",
    "timestamp": "datetime"
  }
}
```

---

## 🔄 WebSockets (Tempo Real)

### Eventos para Implementar

#### Notificações
```javascript
socket.on('notification:new', (data) => {
  // Nova notificação
})
```

#### Agendamentos
```javascript
socket.on('appointment:updated', (data) => {
  // Agendamento atualizado
})

socket.on('appointment:reminder', (data) => {
  // Lembrete de agendamento
})
```

#### Chat
```javascript
socket.on('chat:message', (data) => {
  // Nova mensagem do chat
})
```

---

## 📦 Integrações Necessárias

### Email
- Serviço: SendGrid / AWS SES / Mailgun
- Templates: Confirmação, Lembrete, Cancelamento, Recuperação de senha

### SMS (Opcional)
- Serviço: Twilio / AWS SNS
- Uso: Lembretes urgentes

### Storage
- Serviço: AWS S3 / Google Cloud Storage
- Uso: Avatares, anexos, relatórios

### IA
- Serviço: Hugging Face / OpenAI
- Uso: Chat assistente

### Analytics
- Serviço: Google Analytics / Mixpanel
- Uso: Métricas de uso

---

## 🧪 Testes Necessários

### Unitários
- Modelos
- Validações
- Regras de negócio
- Utilitários

### Integração
- Endpoints
- Autenticação
- Autorização
- Fluxos completos

### E2E
- Registro e login
- Agendamento completo
- Gestão de pacientes
- Geração de relatórios

---

## 📝 Documentação Adicional

### Swagger/OpenAPI
- Documentação interativa de todos os endpoints
- Exemplos de requisições
- Schemas de dados

### Postman Collection
- Collection completa
- Environments (dev, staging, prod)
- Testes automatizados

---

## 🚀 Deploy e Infraestrutura

### Requisitos Mínimos
- Node.js 18+ / Python 3.10+ / Java 17+
- PostgreSQL 14+ / MySQL 8+
- Redis 6+
- 2GB RAM
- 20GB Storage

### Recomendado
- Load Balancer
- CDN para assets
- Backup automático diário
- Monitoring (Datadog, New Relic)
- Logs centralizados (ELK Stack)

---

## 📞 Suporte

Para dúvidas sobre implementação:
- 📧 Email: dev@blurosiere.com
- 📖 Docs: [Documentação Frontend](./COMPONENT_LIBRARY.md)
- 🐛 Issues: GitHub Issues

---

**BluRosiere Backend Guide v2.0.0**  
Especificação completa para implementação do backend enterprise-grade