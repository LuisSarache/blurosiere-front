# ⚡ Guia Rápido de Referência - BlueRosiere

Referência rápida das principais funcionalidades e como usá-las.

---

## 📚 Índice Rápido

- [Constantes](#constantes)
- [Validação](#validação)
- [Formatação](#formatação)
- [Storage](#storage)
- [Hooks](#hooks)
- [Tratamento de Erros](#tratamento-de-erros)
- [Componentes](#componentes)

---

## 🔧 Constantes

### Importar
```javascript
import { 
  ROUTES, 
  USER_TYPES, 
  APPOINTMENT_STATUS,
  ERROR_MESSAGES,
  STORAGE_KEYS 
} from '../constants';
```

### Usar
```javascript
// Rotas
navigate(ROUTES.DASHBOARD);
navigate(ROUTES.LOGIN);

// Tipos de usuário
if (user.type === USER_TYPES.PSYCHOLOGIST) { }
if (user.type === USER_TYPES.PATIENT) { }

// Status de agendamento
if (apt.status === APPOINTMENT_STATUS.SCHEDULED) { }
if (apt.status === APPOINTMENT_STATUS.COMPLETED) { }

// Mensagens de erro
toast.error(ERROR_MESSAGES.INVALID_CREDENTIALS);
```

---

## ✅ Validação

### Importar
```javascript
import {
  isValidEmail,
  validatePassword,
  validateLoginCredentials,
  validateRegisterData,
  isValidPhone,
  validateBirthDate
} from '../utils/validation';
```

### Usar
```javascript
// Email
if (!isValidEmail(email)) {
  setError('Email inválido');
}

// Senha
const pwdValidation = validatePassword(password);
if (!pwdValidation.isValid) {
  console.log(pwdValidation.errors);
}

// Login
const validation = validateLoginCredentials({ email, password });
if (!validation.isValid) {
  setErrors(validation.errors);
}

// Registro
const regValidation = validateRegisterData(userData);
if (!regValidation.isValid) {
  setErrors(regValidation.errors);
}

// Telefone
if (!isValidPhone(phone)) {
  setError('Telefone inválido');
}

// Data de nascimento
const birthValidation = validateBirthDate(birthDate);
if (!birthValidation.isValid) {
  setError(birthValidation.error);
}
```

---

## 🎨 Formatação

### Importar
```javascript
import {
  formatDate,
  formatDateTime,
  formatPhone,
  formatCurrency,
  formatStatus,
  calculateAge,
  truncateText
} from '../utils/formatters';
```

### Usar
```javascript
// Data
const date = formatDate('2024-01-15'); // 15/01/2024

// Data e hora
const dateTime = formatDateTime('2024-01-15T14:30:00'); // 15/01/2024 14:30

// Telefone
const phone = formatPhone('11999999999'); // (11) 99999-9999

// Moeda
const price = formatCurrency(1500); // R$ 1.500,00

// Status
const status = formatStatus('agendado'); // Agendado

// Idade
const age = calculateAge('2000-01-15'); // 24

// Truncar texto
const short = truncateText('Texto muito longo...', 20); // Texto muito lon...
```

---

## 💾 Storage

### Importar
```javascript
import {
  getUser,
  saveUser,
  getAuthToken,
  saveAuthToken,
  clearAuthData,
  hasActiveSession
} from '../utils/storage';
```

### Usar
```javascript
// Recuperar usuário
const user = getUser();

// Salvar usuário
saveUser({ ...user, name: 'Novo Nome' });

// Recuperar token
const token = getAuthToken();

// Salvar token
saveAuthToken(token);

// Verificar sessão ativa
if (hasActiveSession()) {
  // Usuário está logado
}

// Limpar dados de autenticação (logout)
clearAuthData();
```

---

## 🎣 Hooks

### useAuth
```javascript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, login, logout, loading, error } = useAuth();
  
  return (
    <div>
      {user && <p>Olá, {user.name}</p>}
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

### useIsPsychologist
```javascript
import { useIsPsychologist } from '../hooks/useAuth';

function MyComponent() {
  const isPsych = useIsPsychologist();
  
  return isPsych ? <PsychologistView /> : <PatientView />;
}
```

### useIsPatient
```javascript
import { useIsPatient } from '../hooks/useAuth';

function MyComponent() {
  const isPatient = useIsPatient();
  
  return isPatient ? <PatientView /> : <PsychologistView />;
}
```

### useAsync
```javascript
import { useAsync } from '../hooks/useAsync';

function MyComponent() {
  const { data, loading, error, execute } = useAsync(
    () => fetchUsers(),
    false // não executar imediatamente
  );
  
  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage error={error} />}
      {data && <UserList users={data} />}
      <button onClick={() => execute()}>Recarregar</button>
    </div>
  );
}
```

---

## 🚨 Tratamento de Erros

### Importar
```javascript
import {
  handleError,
  AppError,
  createValidationError,
  logError
} from '../services/errorHandler';
```

### Usar
```javascript
// Tratar erro
try {
  const data = await fetchData();
} catch (error) {
  const { message, code } = handleError(error);
  toast.error(message);
}

// Criar erro customizado
throw new AppError('Mensagem de erro', 'ERROR_CODE', 400);

// Erro de validação
const errors = { email: 'Email inválido', password: 'Senha fraca' };
throw createValidationError(errors);

// Log de erro
try {
  // algo
} catch (error) {
  logError(error, { context: 'user_login' });
}
```

---

## 🧩 Componentes

### ErrorBoundary
```javascript
import ErrorBoundary from '../components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}
```

### ProtectedRoute
```javascript
import { ProtectedRoute } from '../routes/AppRoutes';

<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## 🔐 Autenticação

### Login
```javascript
import { useAuth } from '../hooks/useAuth';
import { mockApi } from '../services/mockApi';

function LoginForm() {
  const { login } = useAuth();
  
  const handleLogin = async (email, password) => {
    try {
      const { user, token } = await mockApi.login(email, password);
      login(user, token);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };
}
```

### Logout
```javascript
import { useAuth } from '../hooks/useAuth';

function Header() {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
}
```

---

## 📱 Componentes Comuns

### Verificar Tipo de Usuário
```javascript
import { useIsPsychologist, useIsPatient } from '../hooks/useAuth';

function Dashboard() {
  const isPsych = useIsPsychologist();
  const isPatient = useIsPatient();
  
  if (isPsych) return <PsychologistDashboard />;
  if (isPatient) return <PatientDashboard />;
}
```

### Carregar Dados Assincronamente
```javascript
import { useAsyncEffect } from '../hooks/useAsync';

function UserList() {
  const { data: users, loading, error } = useAsyncEffect(
    () => mockApi.getPatients(psychologistId),
    [psychologistId]
  );
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

---

## 🎯 Padrões Comuns

### Validar e Enviar Formulário
```javascript
import { validateLoginCredentials } from '../utils/validation';
import { handleError } from '../services/errorHandler';

const handleSubmit = async (email, password) => {
  // 1. Validar
  const validation = validateLoginCredentials({ email, password });
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }
  
  // 2. Enviar
  try {
    const result = await mockApi.login(email, password);
    // 3. Sucesso
    login(result.user, result.token);
  } catch (error) {
    // 4. Erro
    const { message } = handleError(error);
    toast.error(message);
  }
};
```

### Formatar e Exibir Dados
```javascript
import { formatDate, formatPhone, formatStatus } from '../utils/formatters';

function AppointmentCard({ appointment }) {
  return (
    <div>
      <p>Data: {formatDate(appointment.date)}</p>
      <p>Telefone: {formatPhone(appointment.phone)}</p>
      <p>Status: {formatStatus(appointment.status)}</p>
    </div>
  );
}
```

### Proteger Rota
```javascript
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';

function ProtectedComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to={ROUTES.LOGIN} />;
  
  return <YourComponent />;
}
```

---

## 📋 Checklist de Desenvolvimento

Ao criar um novo componente/página:

- [ ] Importar constantes necessárias
- [ ] Usar hooks customizados
- [ ] Validar entrada de dados
- [ ] Tratar erros com handleError()
- [ ] Formatar dados para exibição
- [ ] Adicionar JSDoc
- [ ] Testar funcionalidade
- [ ] Verificar acessibilidade

---

## 🔗 Links Úteis

- [Constantes](./src/constants/index.js)
- [Validação](./src/utils/validation.js)
- [Formatação](./src/utils/formatters.js)
- [Storage](./src/utils/storage.js)
- [Hooks](./src/hooks/)
- [Tratamento de Erros](./src/services/errorHandler.js)
- [Boas Práticas](./BEST_PRACTICES.md)
- [Melhorias](./IMPROVEMENTS.md)

---

## 💡 Dicas Rápidas

1. **Sempre use constantes** em vez de strings
2. **Valide sempre** antes de processar dados
3. **Trate erros** com handleError()
4. **Use hooks** para lógica reutilizável
5. **Formate dados** antes de exibir
6. **Documente** com JSDoc
7. **Teste** antes de fazer commit

---

**Desenvolvido com ❤️ para facilitar o desenvolvimento**
