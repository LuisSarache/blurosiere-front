# 🚀 Guia de Deploy - BlueRosiere

Instruções completas para fazer deploy da aplicação em produção.

---

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta em serviço de hosting (Vercel, Netlify, AWS, etc.)
- Variáveis de ambiente configuradas

---

## 🔧 Preparação para Deploy

### 1. Verificar Variáveis de Ambiente

```bash
# Copiar template
cp .env.example .env.production

# Editar com valores de produção
nano .env.production
```

### 2. Executar Testes

```bash
# Lint
npm run lint

# Build
npm run build

# Preview
npm run preview
```

### 3. Verificar Performance

```bash
# Lighthouse
npm run build
# Abrir em navegador e rodar Lighthouse
```

---

## 🌐 Deploy em Vercel (Recomendado)

### 1. Conectar Repositório

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 2. Configurar Variáveis

No dashboard Vercel:
1. Ir para Settings → Environment Variables
2. Adicionar variáveis de `.env.production`

### 3. Deploy Automático

```bash
# Cada push para main faz deploy automático
git push origin main
```

---

## 🌐 Deploy em Netlify

### 1. Conectar Repositório

1. Ir para netlify.com
2. Conectar repositório GitHub
3. Configurar build settings

### 2. Build Settings

```
Build command: npm run build
Publish directory: dist
```

### 3. Variáveis de Ambiente

No dashboard Netlify:
1. Site settings → Build & deploy → Environment
2. Adicionar variáveis

---

## 🌐 Deploy em AWS

### 1. S3 + CloudFront

```bash
# Build
npm run build

# Upload para S3
aws s3 sync dist/ s3://seu-bucket/

# Invalidar CloudFront
aws cloudfront create-invalidation --distribution-id ID --paths "/*"
```

### 2. Amplify

```bash
# Instalar Amplify CLI
npm i -g @aws-amplify/cli

# Configurar
amplify init

# Deploy
amplify publish
```

---

## 📋 Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Lint passou sem erros
- [ ] Build executado com sucesso
- [ ] Testes passaram
- [ ] Performance verificada
- [ ] Segurança verificada
- [ ] SEO otimizado
- [ ] Certificado SSL ativo
- [ ] CORS configurado
- [ ] Rate limiting ativo

---

## 🔒 Segurança em Produção

### 1. Headers de Segurança

```javascript
// vercel.json ou netlify.toml
{
  "headers": [
    {
      "key": "X-Content-Type-Options",
      "value": "nosniff"
    },
    {
      "key": "X-Frame-Options",
      "value": "DENY"
    },
    {
      "key": "X-XSS-Protection",
      "value": "1; mode=block"
    }
  ]
}
```

### 2. HTTPS Obrigatório

```javascript
// Redirecionar HTTP para HTTPS
if (location.protocol !== 'https:') {
  location.protocol = 'https:';
}
```

### 3. CSP (Content Security Policy)

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'">
```

---

## 📊 Monitoramento

### 1. Sentry (Error Tracking)

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENVIRONMENT,
});
```

### 2. Google Analytics

```javascript
import { useEffect } from 'react';

useEffect(() => {
  window.gtag('config', 'GA_ID');
}, []);
```

### 3. Uptime Monitoring

Use serviços como:
- UptimeRobot
- Pingdom
- StatusPage

---

## 🔄 CI/CD com GitHub Actions

### 1. Criar Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run build
      - run: npm run test
      - name: Deploy
        run: npm run deploy
```

---

## 📈 Performance em Produção

### 1. Otimizações

- [x] Minificação de CSS/JS
- [x] Compressão de imagens
- [x] Lazy loading
- [x] Code splitting
- [x] Caching

### 2. Métricas

```
Lighthouse Score: > 90
Core Web Vitals: Green
Bundle Size: < 500KB
```

---

## 🆘 Troubleshooting

### Build falha

```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Variáveis não carregam

```bash
# Verificar variáveis
echo $VITE_API_BASE_URL

# Reconstruir
npm run build
```

### Performance lenta

```bash
# Analisar bundle
npm run build -- --analyze

# Otimizar
npm run build -- --minify
```

---

## 📞 Suporte

Para problemas:
1. Verificar logs do deploy
2. Consultar documentação do host
3. Abrir issue no GitHub

---

**Desenvolvido com ❤️ para facilitar o deploy**
