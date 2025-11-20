# 🤝 Guia de Contribuição - BlueRosiere

Obrigado por considerar contribuir para o BlueRosiere! Este documento fornece diretrizes e instruções para contribuir com o projeto.

---

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Começar](#como-começar)
- [Padrões de Código](#padrões-de-código)
- [Processo de Contribuição](#processo-de-contribuição)
- [Convenções de Commit](#convenções-de-commit)
- [Testes](#testes)
- [Documentação](#documentação)

---

## 📜 Código de Conduta

- Seja respeitoso com outros contribuidores
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

---

## 🚀 Como Começar

### 1. Fork o Repositório
```bash
git clone https://github.com/seu-usuario/blurosiere.git
cd blurosiere
```

### 2. Crie uma Branch
```bash
git checkout -b feature/sua-feature
# ou
git checkout -b fix/seu-bug
```

### 3. Instale Dependências
```bash
npm install
```

### 4. Execute o Projeto
```bash
npm run dev
```

---

## 💻 Padrões de Código

### Estrutura de Arquivos

```
src/
├── components/      # Componentes React reutilizáveis
├── context/         # Contextos React
├── hooks/           # Hooks customizados
├── pages/           # Páginas/Rotas
├── services/        # Serviços e APIs
├── utils/           # Funções utilitárias
├── constants/       # Constantes da aplicação
├── types/           # Tipos e interfaces
├── App.jsx
├── main.jsx
└── index.css
```

### Nomenclatura

- **Componentes**: PascalCase (ex: `UserProfile.jsx`)
- **Funções/Variáveis**: camelCase (ex: `getUserData()`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `MAX_RETRIES`)
- **Arquivos**: kebab-case para utilitários (ex: `error-handler.js`)

### Estilo de Código

```javascript
// ✅ BOM: Comentário descritivo
/**
 * Calcula a idade do usuário
 * @param {string} birthDate - Data de nascimento (YYYY-MM-DD)
 * @returns {number} Idade em anos
 */
export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// ❌ RUIM: Sem documentação
const calcAge = (bd) => {
  const t = new Date();
  const b = new Date(bd);
  let a = t.getFullYear() - b.getFullYear();
  if (t.getMonth() - b.getMonth() < 0) a--;
  return a;
};
```

### Regras Importantes

1. **Use Constantes** - Não use valores mágicos
2. **Valide Entrada** - Sempre valide dados de entrada
3. **Trate Erros** - Use try-catch e handleError()
4. **Documente** - Adicione JSDoc em funções públicas
5. **Reutilize** - Use hooks e utilitários existentes
6. **Teste** - Escreva testes para novas funcionalidades

---

## 🔄 Processo de Contribuição

### 1. Crie uma Issue
Antes de começar, crie uma issue descrevendo:
- O problema ou feature
- Por que é importante
- Sua solução proposta

### 2. Desenvolva
```bash
# Crie sua branch
git checkout -b feature/minha-feature

# Faça commits pequenos e descritivos
git commit -m "feat: adiciona validação de email"

# Push para sua fork
git push origin feature/minha-feature
```

### 3. Abra um Pull Request
- Descreva as mudanças claramente
- Referencie a issue relacionada
- Adicione screenshots se relevante
- Certifique-se que o código passa no lint

### 4. Code Review
- Responda aos comentários
- Faça ajustes conforme necessário
- Aguarde aprovação

### 5. Merge
Após aprovação, sua contribuição será merged!

---

## 📝 Convenções de Commit

Use o padrão Conventional Commits:

```
<tipo>(<escopo>): <descrição>

<corpo>

<rodapé>
```

### Tipos
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (sem mudança de lógica)
- `refactor`: Refatoração de código
- `perf`: Melhoria de performance
- `test`: Testes
- `chore`: Tarefas de build, dependências

### Exemplos

```bash
# Feature
git commit -m "feat(auth): adiciona autenticação com Google"

# Bug fix
git commit -m "fix(validation): corrige validação de email"

# Documentação
git commit -m "docs(readme): atualiza instruções de instalação"

# Refatoração
git commit -m "refactor(api): simplifica tratamento de erros"
```

---

## 🧪 Testes

### Executar Testes
```bash
npm run test
```

### Escrever Testes
```javascript
// exemplo.test.js
import { calculateAge } from '../utils/formatters';

describe('calculateAge', () => {
  it('deve calcular idade corretamente', () => {
    const age = calculateAge('2000-01-15');
    expect(age).toBeGreaterThan(0);
  });

  it('deve retornar 0 para data futura', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const age = calculateAge(futureDate.toISOString().split('T')[0]);
    expect(age).toBeLessThan(0);
  });
});
```

---

## 📚 Documentação

### Adicionar Documentação

1. **JSDoc em Funções**
```javascript
/**
 * Descrição breve
 * 
 * Descrição longa se necessário
 * @param {type} paramName - Descrição do parâmetro
 * @returns {type} Descrição do retorno
 * @throws {Error} Quando algo dá errado
 */
```

2. **Comentários em Código Complexo**
```javascript
// Calcula idade considerando se já fez aniversário este ano
if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
  age--;
}
```

3. **README para Novas Features**
- Adicione seção no README.md
- Inclua exemplos de uso
- Documente configurações necessárias

---

## 🔍 Checklist Antes de Submeter

- [ ] Código segue os padrões do projeto
- [ ] Adicionei JSDoc em funções públicas
- [ ] Testes passam (`npm run test`)
- [ ] Lint passa (`npm run lint`)
- [ ] Sem console.log em produção
- [ ] Sem valores mágicos (use constantes)
- [ ] Tratamento de erros implementado
- [ ] Documentação atualizada
- [ ] Commits seguem convenção
- [ ] Branch está atualizada com main

---

## 🐛 Reportar Bugs

Ao reportar um bug, inclua:

1. **Descrição Clara** - O que esperava vs o que aconteceu
2. **Passos para Reproduzir** - Como reproduzir o bug
3. **Ambiente** - Browser, SO, versão do Node
4. **Screenshots** - Se aplicável
5. **Logs** - Console errors ou stack trace

---

## 💡 Sugestões de Features

Tem uma ideia? Abra uma issue com:

1. **Descrição** - O que você quer adicionar
2. **Motivação** - Por que seria útil
3. **Exemplos** - Como seria usado
4. **Alternativas** - Outras soluções consideradas

---

## 📞 Perguntas?

- Abra uma issue com a tag `question`
- Consulte a documentação existente
- Veja exemplos no código

---

## 🎉 Obrigado!

Sua contribuição ajuda a tornar o BlueRosiere melhor para todos!

---

**Desenvolvido com ❤️ pela comunidade**
