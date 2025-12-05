# 🔌 Integração com Backend

## ✅ Configuração Completa

### Backend URL
```
https://blurosiere-backend.onrender.com
```

### Arquivos Criados

1. **`src/services/api.js`** - Serviço de API real
2. **`src/services/index.js`** - Alternador Mock/Real API
3. **`.env`** - Variáveis de ambiente configuradas

## 🚀 Como Usar

### Alternar entre Mock e Backend Real

**Usar Backend Real (Render):**
```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://blurosiere-backend.onrender.com/api
```

**Usar Mock (LocalStorage):**
```env
VITE_USE_MOCK_API=true
```

### Importar API nos Componentes

```javascript
// Antes (Mock)
import { mockApi } from '../services/mockApi';

// Agora (Automático)
import { apiService } from '../services';

// Uso
const data = await apiService.login(email, password);
```

## 📡 Endpoints Disponíveis

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `POST /api/auth/logout` - Logout

### Consultas
- `GET /api/appointments` - Listar consultas
- `POST /api/appointments` - Criar consulta
- `PUT /api/appointments/:id` - Atualizar consulta
- `PATCH /api/appointments/:id/cancel` - Cancelar consulta
- `GET /api/appointments/:id` - Detalhes da consulta

### Psicólogos
- `GET /api/psychologists` - Listar psicólogos
- `GET /api/psychologists/:id/slots` - Horários disponíveis

### Pacientes
- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Criar paciente
- `POST /api/patients/:id/notes` - Adicionar nota

### Solicitações
- `GET /api/requests` - Listar solicitações
- `POST /api/requests` - Criar solicitação
- `PATCH /api/requests/:id/status` - Atualizar status

### Relatórios
- `GET /api/reports` - Dados de relatórios

## 🔐 Autenticação

O token JWT é automaticamente incluído em todas as requisições:

```javascript
headers: {
  'Authorization': 'Bearer <token>'
}
```

## ⚙️ Configuração

### Desenvolvimento Local
```bash
# 1. Copie o arquivo de exemplo
cp .env.example .env

# 2. Configure as variáveis
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://blurosiere-backend.onrender.com/api

# 3. Reinicie o servidor
npm run dev
```

### Produção
As variáveis já estão configuradas para produção no `.env`

## 🧪 Testando a Conexão

```javascript
// Teste rápido no console do navegador
import { apiService } from './services';

// Testar login
apiService.login('ana@test.com', '123456')
  .then(data => console.log('✅ Conectado:', data))
  .catch(err => console.error('❌ Erro:', err));
```

## 🔄 Migração de Componentes

### Antes
```javascript
import { mockApi } from '../services/mockApi';

const data = await mockApi.getAppointments(userId, userType);
```

### Depois
```javascript
import { apiService } from '../services';

const data = await apiService.getAppointments(userId, userType);
```

## 📝 Notas Importantes

1. **CORS**: Backend deve permitir requisições do frontend
2. **Timeout**: Configurado para 30 segundos
3. **Retry**: Não implementado (adicionar se necessário)
4. **Cache**: Não implementado (adicionar se necessário)

## 🐛 Troubleshooting

### Erro de CORS
```
Access to fetch at 'https://blurosiere-backend.onrender.com' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solução**: Backend deve incluir headers CORS:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
```

### Erro de Timeout
```
Error: Request timeout
```

**Solução**: Aumentar timeout no `.env`:
```env
VITE_API_TIMEOUT=60000
```

### Backend Inativo (Render)
Render pode colocar o backend em sleep. Primeira requisição pode demorar ~30s.

## ✨ Próximos Passos

- [ ] Implementar retry automático
- [ ] Adicionar cache de requisições
- [ ] Implementar refresh token
- [ ] Adicionar interceptors
- [ ] Implementar offline mode

## 🎉 Status

✅ **Backend conectado e funcionando!**

URL: https://blurosiere-backend.onrender.com
