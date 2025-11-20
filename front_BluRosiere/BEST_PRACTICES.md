# 🏆 Boas Práticas - BlueRosiere

Guia de boas práticas para desenvolvimento no BlueRosiere, garantindo código de qualidade, segurança e manutenibilidade.

---

## 📋 Índice

- [Estrutura de Código](#estrutura-de-código)
- [Segurança](#segurança)
- [Performance](#performance)
- [Acessibilidade](#acessibilidade)
- [Testes](#testes)
- [Documentação](#documentação)
- [Git](#git)

---

## 🏗️ Estrutura de Código

### 1. Organização de Arquivos

```
✅ BOM:
src/
├── components/
│   ├── Button.jsx
│   ├── Button.test.jsx
│   └── Button.module.css
├── hooks/
│   ├── useAuth.js
│   └── useAsync.js
└── utils/
    ├── validation.js
    └── formatters.js

❌ RUIM:
src/
├── Button.jsx
├── Button.test.jsx
├── useAuth.js
├── validation.js
└── formatters.js
```

### 2. Componentes React

```javascript
// ✅ BOM: Componente bem estruturado
/**
 * Componente de botão reutilizável
 * @param {object} props - Props do componente
 * @param {string} props.label - Texto do botão
 * @param {Function} props.onClick - Callback ao clicar
 * @param {string} props.variant - Variante do botão (primary, secondary)
 * @returns {JSX.Element} Elemento do botão
 */
export const Button = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
      aria-label={label}
    >
      {label}
    </button>
  );
};

// ❌ RUIM: Sem documentação, sem props validation
export const Button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

### 3. Separação de Responsabilidades

```javascript
// ✅ BOM: Lógica separada da apresentação
// hooks/useUserData.js
export const useUserData = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);
  
  return { user, loading };
};

// components/UserProfile.jsx
export const UserProfile = ({ userId }) => {
  const { user, loading } = useUserData(userId);
  
  if (loading) return <LoadingSpinner />;
  return <div>{user.name}</div>;
};

// ❌ RUIM: Lógica misturada com apresentação
export const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);
  
  if (loading) return <div>Carregando...</div>;
  return <div>{user.name}</div>;
};
```

---

## 🔒 Segurança

### 1. Validação de Entrada

```javascript
// ✅ BOM: Valida antes de usar
import { validateLoginCredentials } from '../utils/validation';

const handleLogin = async (email, password) => {
  const validation = validateLoginCredentials({ email, password });
  
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }
  
  // Processa login
};

// ❌ RUIM: Sem validação
const handleLogin = async (email, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
};
```

### 2. Sanitização de Dados

```javascript
// ✅ BOM: Sanitiza dados do usuário
import { sanitizeString } from '../utils/validation';

const userInput = sanitizeString(userProvidedText);
setComment(userInput);

// ❌ RUIM: Usa dados sem sanitizar
setComment(userProvidedText);
```

### 3. Tratamento de Erros

```javascript
// ✅ BOM: Trata erros apropriadamente
import { handleError } from '../services/errorHandler';

try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  const { message } = handleError(error);
  toast.error(message);
}

// ❌ RUIM: Expõe detalhes de erro
try {
  const data = await fetchData();
} catch (error) {
  toast.error(error.message); // Pode expor informações sensíveis
}
```

### 4. Proteção de Rotas

```javascript
// ✅ BOM: Verifica autenticação
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

// ❌ RUIM: Sem proteção
const ProtectedRoute = ({ children }) => {
  return children;
};
```

---

## ⚡ Performance

### 1. Memoização

```javascript
// ✅ BOM: Usa React.memo para componentes puros
export const UserCard = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});

// ✅ BOM: Usa useMemo para cálculos pesados
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);

// ❌ RUIM: Recalcula a cada render
const UserCard = ({ user }) => {
  return <div>{user.name}</div>;
};
```

### 2. Lazy Loading

```javascript
// ✅ BOM: Carrega componentes sob demanda
const ChatIA = lazy(() => import('../pages/ChatIA'));

<Suspense fallback={<LoadingSpinner />}>
  <ChatIA />
</Suspense>

// ❌ RUIM: Carrega tudo de uma vez
import ChatIA from '../pages/ChatIA';
```

### 3. Otimização de Listas

```javascript
// ✅ BOM: Usa key única e estável
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>

// ❌ RUIM: Usa index como key
<ul>
  {items.map((item, index) => (
    <li key={index}>{item.name}</li>
  ))}
</ul>
```

### 4. Debounce/Throttle

```javascript
// ✅ BOM: Debounce em busca
const handleSearch = useMemo(
  () => debounce((query) => {
    searchUsers(query);
  }, 300),
  []
);

// ❌ RUIM: Faz requisição a cada keystroke
const handleSearch = (query) => {
  searchUsers(query);
};
```

---

## ♿ Acessibilidade

### 1. Atributos ARIA

```javascript
// ✅ BOM: Usa atributos ARIA
<button
  aria-label="Fechar modal"
  aria-pressed={isOpen}
  onClick={handleClose}
>
  ✕
</button>

// ❌ RUIM: Sem acessibilidade
<button onClick={handleClose}>✕</button>
```

### 2. Semântica HTML

```javascript
// ✅ BOM: Usa elementos semânticos
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">Sobre</a></li>
  </ul>
</nav>

// ❌ RUIM: Usa divs para tudo
<div>
  <div>
    <div><span onClick={() => navigate('/home')}>Home</span></div>
  </div>
</div>
```

### 3. Contraste de Cores

```css
/* ✅ BOM: Contraste suficiente (WCAG AA) */
.button {
  background-color: #1E3A5F; /* Azul escuro */
  color: #FFFFFF; /* Branco */
  /* Contraste: 8.5:1 */
}

/* ❌ RUIM: Contraste insuficiente */
.button {
  background-color: #E0E0E0; /* Cinza claro */
  color: #D0D0D0; /* Cinza mais claro */
  /* Contraste: 1.1:1 */
}
```

---

## 🧪 Testes

### 1. Testes Unitários

```javascript
// ✅ BOM: Testa função isoladamente
describe('calculateAge', () => {
  it('deve calcular idade corretamente', () => {
    const age = calculateAge('2000-01-15');
    expect(age).toBeGreaterThan(0);
  });

  it('deve retornar erro para data inválida', () => {
    expect(() => calculateAge('invalid')).toThrow();
  });
});

// ❌ RUIM: Testa múltiplas coisas
it('deve funcionar', () => {
  const age = calculateAge('2000-01-15');
  expect(age).toBeDefined();
});
```

### 2. Testes de Componentes

```javascript
// ✅ BOM: Testa comportamento do usuário
import { render, screen, fireEvent } from '@testing-library/react';

it('deve chamar onClick ao clicar', () => {
  const handleClick = jest.fn();
  render(<Button label="Clique" onClick={handleClick} />);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});

// ❌ RUIM: Testa implementação interna
it('deve renderizar', () => {
  const { container } = render(<Button label="Clique" />);
  expect(container.querySelector('button')).toBeTruthy();
});
```

---

## 📚 Documentação

### 1. JSDoc Completo

```javascript
// ✅ BOM: Documentação clara
/**
 * Valida credenciais de login
 * 
 * Verifica se email e senha são válidos de acordo com as regras de negócio.
 * 
 * @param {object} credentials - Objeto com credenciais
 * @param {string} credentials.email - Email do usuário
 * @param {string} credentials.password - Senha do usuário
 * @returns {object} Objeto com validação
 * @returns {boolean} returns.isValid - Se credenciais são válidas
 * @returns {object} returns.errors - Erros encontrados
 * @throws {TypeError} Se credenciais não for um objeto
 * 
 * @example
 * const result = validateLoginCredentials({
 *   email: 'user@example.com',
 *   password: 'password123'
 * });
 * if (result.isValid) {
 *   // Fazer login
 * }
 */
export const validateLoginCredentials = (credentials) => {
  // ...
};

// ❌ RUIM: Sem documentação
export const validateLoginCredentials = (credentials) => {
  // ...
};
```

### 2. README Atualizado

```markdown
# ✅ BOM: README completo

## Instalação
## Uso
## API
## Contribuição
## Licença

# ❌ RUIM: README vazio
# Projeto
```

---

## 🔀 Git

### 1. Commits Atômicos

```bash
# ✅ BOM: Commits pequenos e focados
git commit -m "feat(auth): adiciona validação de email"
git commit -m "fix(validation): corrige regex de email"
git commit -m "docs(readme): atualiza instruções"

# ❌ RUIM: Commits grandes e mistos
git commit -m "Vários ajustes e correções"
```

### 2. Branches Descritivas

```bash
# ✅ BOM: Nomes descritivos
git checkout -b feature/user-authentication
git checkout -b fix/email-validation-bug
git checkout -b docs/update-readme

# ❌ RUIM: Nomes genéricos
git checkout -b feature1
git checkout -b fix
git checkout -b update
```

### 3. Pull Requests

```markdown
# ✅ BOM: PR bem descrito

## Descrição
Adiciona validação de email no formulário de login

## Tipo de Mudança
- [x] Bug fix
- [ ] Nova feature
- [ ] Breaking change

## Como Testar
1. Abra a página de login
2. Digite um email inválido
3. Veja a mensagem de erro

## Checklist
- [x] Código segue os padrões
- [x] Testes passam
- [x] Documentação atualizada

# ❌ RUIM: PR vago
Atualizações
```

---

## 🎯 Checklist de Qualidade

Antes de fazer commit, verifique:

- [ ] Código segue os padrões do projeto
- [ ] Sem console.log em produção
- [ ] Sem valores mágicos (use constantes)
- [ ] Validação de entrada implementada
- [ ] Tratamento de erros implementado
- [ ] JSDoc em funções públicas
- [ ] Testes escritos e passando
- [ ] Sem duplicação de código
- [ ] Performance considerada
- [ ] Acessibilidade verificada
- [ ] Lint passa sem erros
- [ ] Commit message descritiva

---

## 📊 Métricas de Qualidade

Mantenha estas métricas:

| Métrica | Alvo | Ferramenta |
|---------|------|-----------|
| Cobertura de Testes | > 80% | Jest |
| Lint Score | 0 erros | ESLint |
| Performance | > 90 | Lighthouse |
| Acessibilidade | > 90 | Axe |
| Segurança | 0 vulnerabilidades | npm audit |

---

## 🚀 Deployment

### Antes de Deploy

```bash
# Testes
npm run test

# Lint
npm run lint

# Build
npm run build

# Preview
npm run preview
```

---

## 📞 Referências

- [React Best Practices](https://react.dev)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Desenvolvido com ❤️ para excelência em código**
