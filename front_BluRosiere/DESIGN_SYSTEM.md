# Sistema de Design - BluRosiere

## 📋 Visão Geral

O sistema de design do BluRosiere foi criado para garantir consistência visual, melhor experiência do usuário e facilitar o desenvolvimento e manutenção da aplicação.

## 🎨 Design Tokens

### Cores

```css
/* Primárias */
--color-primary-50: #eff6ff;
--color-primary-500: #3b82f6;
--color-primary-900: #1e3a8a;

/* Secundárias */
--color-secondary-500: #64748b;
--color-secondary-800: #1e293b;
--color-secondary-900: #0f172a;

/* Estados */
--color-success-500: #22c55e;
--color-warning-500: #f59e0b;
--color-error-500: #ef4444;
```

### Tipografia

```css
/* Famílias */
--font-family-primary: 'Inter', sans-serif;

/* Tamanhos */
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;

/* Pesos */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Espaçamento

```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
```

## 🧩 Componentes

### Layout

#### Container
```jsx
import { Container } from '@/components';

<Container size="default">
  {/* Conteúdo centralizado com padding responsivo */}
</Container>
```

#### Grid
```jsx
import { Grid } from '@/components';

<Grid cols={3} gap="lg">
  {/* Itens do grid */}
</Grid>
```

#### Stack & Flex
```jsx
import { Stack, Flex } from '@/components';

<Stack spacing="lg">
  {/* Itens empilhados verticalmente */}
</Stack>

<Flex justify="between" align="center">
  {/* Itens alinhados horizontalmente */}
</Flex>
```

### Tipografia

#### Headings
```jsx
import { H1, H2, H3 } from '@/components';

<H1 color="gradient">Título Principal</H1>
<H2 weight="semibold">Subtítulo</H2>
<H3 color="muted">Seção</H3>
```

#### Texto
```jsx
import { Paragraph, Lead, Text } from '@/components';

<Lead>Texto de destaque</Lead>
<Paragraph>Parágrafo normal</Paragraph>
<Text size="sm" color="muted">Texto pequeno</Text>
```

### Componentes Base

#### Button
```jsx
import { Button } from '@/components';

<Button variant="primary" size="lg" leftIcon={<Icon />}>
  Clique aqui
</Button>

// Variantes: primary, secondary, outline, ghost, danger
// Tamanhos: xs, sm, md, lg, xl
```

#### Input
```jsx
import { Input } from '@/components';

<Input
  label="E-mail"
  type="email"
  leftIcon={<Mail />}
  placeholder="seu@email.com"
  error="Campo obrigatório"
  helperText="Digite seu e-mail"
/>
```

#### Card
```jsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components';

<Card variant="elevated" hover>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo do card
  </CardContent>
</Card>
```

#### Badge
```jsx
import { Badge, StatusBadge } from '@/components';

<Badge variant="success">Ativo</Badge>
<StatusBadge status="online">Online</StatusBadge>
```

#### Avatar
```jsx
import { Avatar, AvatarGroup } from '@/components';

<Avatar 
  src="/avatar.jpg" 
  name="João Silva" 
  size="lg" 
  status="online" 
/>

<AvatarGroup max={3}>
  <Avatar name="User 1" />
  <Avatar name="User 2" />
  <Avatar name="User 3" />
</AvatarGroup>
```

### Feedback

#### Loading
```jsx
import { LoadingSpinner, PageLoader } from '@/components';

<LoadingSpinner variant="icon" size="lg" />
<PageLoader message="Carregando dados..." />
```

#### Tooltip
```jsx
import { Tooltip } from '@/components';

<Tooltip content="Informação adicional" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

## 🎯 Padrões de Uso

### Hierarquia Visual
1. **H1**: Título principal da página
2. **H2**: Seções principais
3. **H3**: Subseções
4. **Lead**: Texto de destaque/introdução
5. **Paragraph**: Texto do corpo

### Cores Semânticas
- **Primary**: Ações principais, links importantes
- **Success**: Confirmações, estados positivos
- **Warning**: Alertas, atenção necessária
- **Error**: Erros, estados negativos
- **Muted**: Texto secundário, informações auxiliares

### Espaçamento
- **xs**: Elementos muito próximos (2px)
- **sm**: Elementos relacionados (8px)
- **md**: Separação padrão (16px)
- **lg**: Seções relacionadas (24px)
- **xl**: Seções distintas (32px)

## 🚀 Animações

### Classes Utilitárias
```css
.animate-fade-in      /* Fade in suave */
.animate-slide-up     /* Desliza de baixo para cima */
.animate-scale-in     /* Escala de pequeno para normal */
.glass-effect         /* Efeito glassmorphism */
.text-gradient        /* Texto com gradiente */
```

### Framer Motion
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Conteúdo animado
</motion.div>
```

## 📱 Responsividade

### Breakpoints
- **sm**: 640px+
- **md**: 768px+
- **lg**: 1024px+
- **xl**: 1280px+

### Padrões
```jsx
// Grid responsivo
<Grid cols={1} className="md:grid-cols-2 lg:grid-cols-3">

// Texto responsivo
<H1 className="text-3xl md:text-4xl lg:text-5xl">

// Espaçamento responsivo
<Section spacing="default" className="py-8 md:py-16 lg:py-24">
```

## ✅ Boas Práticas

### Acessibilidade
- Sempre usar `alt` em imagens
- Fornecer `aria-label` quando necessário
- Manter contraste adequado
- Suporte a navegação por teclado

### Performance
- Usar `forwardRef` em componentes
- Lazy loading para componentes pesados
- Otimizar imagens e assets

### Manutenibilidade
- Componentes pequenos e focados
- Props bem documentadas
- Nomes descritivos
- Reutilização de design tokens

## 🔧 Customização

### Estendendo Componentes
```jsx
const CustomButton = forwardRef((props, ref) => (
  <Button 
    ref={ref}
    className="custom-styles"
    {...props}
  />
));
```

### Novos Design Tokens
```css
:root {
  --color-custom: #your-color;
}

.bg-custom {
  background-color: var(--color-custom);
}
```

## 📚 Recursos

- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [React Hot Toast](https://react-hot-toast.com/)